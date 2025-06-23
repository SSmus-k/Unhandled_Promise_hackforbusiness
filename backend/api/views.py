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
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny


def analyze_input(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            sector = request.POST.get('sector')
            is_sustainable = request.POST.get('is_sustainable') == 'true'
            waste_amount = float(request.POST.get('waste_amount'))
            waste_type = request.POST.get('waste_type')

            df = pd.DataFrame([{
                "sector": sector,
                "is_sustainable": is_sustainable,
                "waste_amount": waste_amount
            }])

            le = joblib.load('backend/api/ml/sector_encoder.pkl')
            model = joblib.load('backend/api/ml/problem_classifier.pkl')

            df['sector_encoded'] = le.transform(df['sector'])
            X = df[['sector_encoded', 'is_sustainable', 'waste_amount']]
            prediction = model.predict(X)[0]

            CompanyData.objects.create(
                user=request.user if request.user.is_authenticated else None,
                name=name,
                sector=sector,
                is_sustainable=is_sustainable,
                has_problem=bool(prediction),
                waste_amount=waste_amount,
                waste_type=waste_type
            )

            return JsonResponse({'prediction': bool(prediction)})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)


def dashboard_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    data = CompanyData.objects.filter(user=request.user)

    grouped = defaultdict(lambda: {
        "waste_amount": 0,
        "predicted": 0,
        "reduced": 0
    })
    waste_type_count = defaultdict(float)
    yearly_waste = defaultdict(float)

    for item in data:
        grouped[item.sector]["waste_amount"] += item.waste_amount or 0
        grouped[item.sector]["predicted"] += item.predicted_waste_next_year or 0
        grouped[item.sector]["reduced"] += item.reduced_waste_due_to_recommendation or 0
        waste_type_count[item.waste_type] += item.waste_amount or 0
        if item.date_recorded:
            yearly_waste[item.date_recorded.year] += (
                item.yearly_produced_waste or item.waste_amount or 0
            )

    context = {
        "companies": data,
        "sectors": json.dumps(list(grouped.keys()), cls=DjangoJSONEncoder),
        "waste_amounts": json.dumps([grouped[s]["waste_amount"] for s in grouped], cls=DjangoJSONEncoder),
        "predicted_by_sector": json.dumps([grouped[s]["predicted"] for s in grouped], cls=DjangoJSONEncoder),
        "reduced_by_sector": json.dumps([grouped[s]["reduced"] for s in grouped], cls=DjangoJSONEncoder),
        "waste_types": json.dumps(list(waste_type_count.keys()), cls=DjangoJSONEncoder),
        "waste_counts": json.dumps(list(waste_type_count.values()), cls=DjangoJSONEncoder),
        "years": json.dumps(sorted(yearly_waste.keys()), cls=DjangoJSONEncoder),
        "waste_by_year": json.dumps([yearly_waste[y] for y in sorted(yearly_waste.keys())], cls=DjangoJSONEncoder),
    }

    return render(request, "dashboard.html", context)


@csrf_exempt
def upload_csv(request):
    if request.method != 'POST' or not request.FILES.get('csv_file'):
        return JsonResponse({'error': 'Only POST requests with CSV file allowed'}, status=400)

    csv_file = request.FILES.get('csv_file')

    if not csv_file.name.lower().endswith('.csv'):
        return JsonResponse({'error': 'Only CSV files are allowed'}, status=400)

    try:
        df = pd.read_csv(csv_file)
        df = df.replace(r'^\s*$', None, regex=True)

        required_columns = [
            'name', 'sector', 'is_sustainable', 'has_problem',
            'waste_type', 'waste_amount', 'predicted_waste_next_year',
            'yearly_produced_waste', 'reduced_waste_due_to_recommendation'
        ]

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
        traceback.print_exc()
        return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        name = request.data.get('name', '')

        if not username or not password:
            return Response({"error": "Username and password required"}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        user.first_name = name
        user.save()
        return Response({"message": "User created"}, status=201)
