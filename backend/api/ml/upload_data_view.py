import csv
from io import TextIOWrapper
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from api.models import CompanyData


print("Request received!")
print("Method:", request.method)
print("Files:", request.FILES)
print("POST data:", request.POST)


@csrf_exempt
def upload_csv(request):
    if request.method == 'POST':
        # Check if file exists in the request
        if not request.FILES.get('csv_file/'):
            return JsonResponse({'status': 'error', 'message': 'No file provided'}, status=400)

        csv_file = request.FILES['csv_file/']

        if not csv_file.name.endswith('.csv'):
            return JsonResponse({'status': 'error', 'message': 'Only CSV files are allowed.'}, status=400)

        try:
            # Read the file directly from memory without saving
            df = pd.read_csv(csv_file)
            
            # Convert empty strings to None/NaN
            df = df.replace(r'^\s*$', None, regex=True)
            
            required_columns = [
                'name', 'sector', 'is_sustainable', 'has_problem',
                'waste_type', 'waste_amount', 'predicted_waste_next_year',
                'yearly_produced_waste', 'reduced_waste_due_to_recommendation'
            ]
            
            # Create missing columns with None values
            for col in required_columns:
                if col not in df.columns:
                    df[col] = None

            # Convert data and create records
            records = []
            for _, row in df.iterrows():
                records.append(CompanyData(
                    name=row['name'] or "Unnamed Company",
                    sector=row['sector'],
                    is_sustainable=bool(int(row['is_sustainable'])) if pd.notna(row['is_sustainable']) else False,
                    has_problem=bool(int(row['has_problem'])) if pd.notna(row['has_problem']) else False,
                    waste_type=row['waste_type'],
                    waste_amount=float(row['waste_amount']) if pd.notna(row['waste_amount']) else 0,
                    predicted_waste_next_year=float(row['predicted_waste_next_year']) if pd.notna(row['predicted_waste_next_year']) else 0,
                    yearly_produced_waste=float(row['yearly_produced_waste']) if pd.notna(row['yearly_produced_waste']) else 0,
                    reduced_waste_due_to_recommendation=float(row['reduced_waste_due_to_recommendation']) if pd.notna(row['reduced_waste_due_to_recommendation']) else 0
                ))
            
            # Bulk create for better performance
            CompanyData.objects.bulk_create(records)
            
            return JsonResponse({
                'status': 'success', 
                'message': f'Successfully uploaded {len(records)} records'
            })

        except Exception as e:
            return JsonResponse({
                'status': 'error', 
                'message': str(e)
            }, status=500)

    return JsonResponse({
        'status': 'error',
        'message': 'Only POST requests allowed'
    }, status=405)