from django.shortcuts import render
from django.http import JsonResponse
from .models import CompanyData
from django.core.serializers.json import DjangoJSONEncoder
from collections import defaultdict
import pandas as pd
import joblib
import json
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def upload_csv(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

    if not request.FILES:
        return JsonResponse({'error': 'No files uploaded'}, status=400)

    csv_file = request.FILES.get('csv_file')
    if not csv_file:
        return JsonResponse({'error': 'No CSV file provided'}, status=400)

    # Validate file extension
    if not csv_file.name.lower().endswith('.csv'):
        return JsonResponse({'error': 'Only CSV files are allowed'}, status=400)

    try:
        # Read CSV directly from memory without saving
        df = pd.read_csv(csv_file)
        
        # Convert empty strings to None
        df = df.replace(r'^\s*$', None, regex=True)
        
        # Prepare required columns
        required_columns = [
            'name', 'sector', 'is_sustainable', 'has_problem',
            'waste_type', 'waste_amount', 'predicted_waste_next_year',
            'yearly_produced_waste', 'reduced_waste_due_to_recommendation'
        ]
        
        # Create records list for bulk_create
        records = []
        for _, row in df.iterrows():
            records.append(CompanyData(
                name=row.get('name', 'Unnamed Company'),
                sector=row.get('sector'),
                is_sustainable=bool(int(row['is_sustainable'])) if pd.notna(row.get('is_sustainable')) else False,
                has_problem=bool(int(row['has_problem'])) if pd.notna(row.get('has_problem')) else False,
                waste_type=row.get('waste_type'),
                waste_amount=float(row['waste_amount']) if pd.notna(row.get('waste_amount')) else 0,
                predicted_waste_next_year=float(row['predicted_waste_next_year']) if pd.notna(row.get('predicted_waste_next_year')) else 0,
                yearly_produced_waste=float(row['yearly_produced_waste']) if pd.notna(row.get('yearly_produced_waste')) else 0,
                reduced_waste_due_to_recommendation=float(row['reduced_waste_due_to_recommendation']) if pd.notna(row.get('reduced_waste_due_to_recommendation')) else 0
            ))
        
        # Use bulk_create for better performance
        CompanyData.objects.bulk_create(records)
        
        return JsonResponse({
            'status': 'success',
            'message': f'Successfully uploaded {len(records)} records',
            'count': len(records)
        })

    except pd.errors.EmptyDataError:
        return JsonResponse({'error': 'The CSV file is empty'}, status=400)
    except pd.errors.ParserError:
        return JsonResponse({'error': 'Invalid CSV format'}, status=400)
    except ValueError as e:
        return JsonResponse({'error': f'Data conversion error: {str(e)}'}, status=400)
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print full traceback to console
        return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)