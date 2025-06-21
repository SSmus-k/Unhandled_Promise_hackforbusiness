from django.shortcuts import render
from django.http import JsonResponse
from .models import CompanyData
import pandas as pd
import joblib
import json
from django.core.serializers.json import DjangoJSONEncoder
from collections import defaultdict


def company_data(request):
    data = CompanyData.objects.all()
    return render(request, 'companies.html', {'data': data})


def analyze_input(request):
    if request.method == 'POST':
        sector = request.POST['sector']
        employee_count = int(request.POST['employee_count'])
        revenue = float(request.POST['revenue'])
        is_sustainable = request.POST['is_sustainable'] == 'true'
        waste_amount = float(request.POST['waste_amount'])
        waste_type = request.POST['waste_type']

        df = pd.DataFrame([{
            "sector": sector,
            "employee_count": employee_count,
            "revenue": revenue,
            "is_sustainable": is_sustainable
        }])

        le = joblib.load('backend/api/ml/sector_encoder.pkl')
        model = joblib.load('backend/api/ml/model.pkl')

        df['sector'] = le.transform(df['sector'])
        X = df[['sector', 'employee_count', 'revenue', 'is_sustainable']]
        prediction = model.predict(X)[0]

        CompanyData.objects.create(
            sector=sector,
            employee_count=employee_count,
            revenue=revenue,
            is_sustainable=is_sustainable,
            has_problem=bool(prediction),
            waste_amount=waste_amount,
            waste_type=waste_type
        )

        return JsonResponse({'prediction': bool(prediction)})


def company_data_json(request):
    data = list(CompanyData.objects.all().values())
    return JsonResponse(data, safe=False)


def company_data_view(request):
    companies = CompanyData.objects.all()
    return render(request, 'company_data.html', {'companies': companies})


def company_charts(request):
    data = CompanyData.objects.all()

    grouped = defaultdict(lambda: {
        "revenue": 0,
        "employees": 0,
        "waste_amount": 0
    })

    waste_type_count = defaultdict(int)

    for item in data:
        grouped[item.sector]["revenue"] += item.revenue
        grouped[item.sector]["employees"] += item.employee_count
        grouped[item.sector]["waste_amount"] += item.waste_amount
        waste_type_count[item.waste_type] += 1

    sectors = list(grouped.keys())
    revenues = [grouped[s]["revenue"] for s in sectors]
    employee_counts = [grouped[s]["employees"] for s in sectors]
    waste_amounts = [grouped[s]["waste_amount"] for s in sectors]
    waste_types = list(waste_type_count.keys())
    waste_counts = list(waste_type_count.values())

    context = {
        "sectors": json.dumps(sectors, cls=DjangoJSONEncoder),
        "revenues": json.dumps(revenues, cls=DjangoJSONEncoder),
        "employee_counts": json.dumps(employee_counts, cls=DjangoJSONEncoder),
        "waste_amounts": json.dumps(waste_amounts, cls=DjangoJSONEncoder),
        "waste_types": json.dumps(waste_types, cls=DjangoJSONEncoder),
        "waste_counts": json.dumps(waste_counts, cls=DjangoJSONEncoder)
    }
    return render(request, "charts.html", context)
