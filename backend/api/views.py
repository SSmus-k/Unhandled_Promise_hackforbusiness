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
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny


def analyze_input(request):
    if request.method == 'POST':
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

    sectors = list(grouped.keys())
    waste_amounts = [grouped[s]["waste_amount"] for s in sectors]
    predicted_by_sector = [grouped[s]["predicted"] for s in sectors]
    reduced_by_sector = [grouped[s]["reduced"] for s in sectors]
    waste_types = list(waste_type_count.keys())
    waste_counts = list(waste_type_count.values())
    years = sorted(yearly_waste.keys())
    waste_by_year = [yearly_waste[year] for year in years]

    context = {
        "companies": data,
        "sectors": json.dumps(sectors, cls=DjangoJSONEncoder),
        "waste_amounts": json.dumps(waste_amounts, cls=DjangoJSONEncoder),
        "waste_types": json.dumps(waste_types, cls=DjangoJSONEncoder),
        "waste_counts": json.dumps(waste_counts, cls=DjangoJSONEncoder),
        "years": json.dumps(years, cls=DjangoJSONEncoder),
        "waste_by_year": json.dumps(waste_by_year, cls=DjangoJSONEncoder),
        "predicted_by_sector": json.dumps(predicted_by_sector, cls=DjangoJSONEncoder),
        "reduced_by_sector": json.dumps(reduced_by_sector, cls=DjangoJSONEncoder),
    }

    return render(request, "dashboard.html", context)


def upload_csv(request):
    if request.method == 'POST' and request.FILES.get('csv_file'):
        csv_file = request.FILES['csv_file']
        fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'uploads'))
        filename = fs.save(csv_file.name, csv_file)
        uploaded_file_path = fs.path(filename)

        try:
            df = pd.read_csv(uploaded_file_path)

            required_columns = [
                'name', 'sector', 'is_sustainable', 'has_problem',
                'waste_type', 'waste_amount', 'predicted_waste_next_year',
                'yearly_produced_waste', 'reduced_waste_due_to_recommendation'
            ]
            for col in required_columns:
                if col not in df.columns:
                    df[col] = None

            for _, row in df.iterrows():
                CompanyData.objects.create(
                    user=request.user if request.user.is_authenticated else None,
                    name=row['name'] or "Unnamed Company",
                    sector=row['sector'],
                    is_sustainable=bool(int(row['is_sustainable'])),
                    has_problem=bool(int(row['has_problem'])),
                    waste_type=row['waste_type'],
                    waste_amount=row['waste_amount'] or 0,
                    predicted_waste_next_year=row['predicted_waste_next_year'] or 0,
                    yearly_produced_waste=row['yearly_produced_waste'] or 0,
                    reduced_waste_due_to_recommendation=row['reduced_waste_due_to_recommendation'] or 0
                )

            return JsonResponse({'status': 'success', 'message': 'CSV uploaded and data saved.'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return render(request, 'upload_csv.html')


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
