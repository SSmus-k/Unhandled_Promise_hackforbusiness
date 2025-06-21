from django.shortcuts import render
from .models import CompanyData
import joblib
from django.http import JsonResponse
import pandas as pd

def company_data(request):
    data = CompanyData.objects.all()
    return render(request, 'companies.html', {'data': data})
def analyze_input(request):
    if request.method == 'POST':
        sector = request.POST['sector']
        employee_count = int(request.POST['employee_count'])
        revenue = float(request.POST['revenue'])
        is_sustainable = request.POST['is_sustainable'] == 'true'

        df = pd.DataFrame([{
            "sector": sector,
            "employee_count": employee_count,
            "revenue": revenue,
            "is_sustainable": is_sustainable
        }])

        le = joblib.load('/ml/sector_encoder.pkl')
        model = joblib.load('ml/model.pkl')
        
        df['sector'] = le.transform(df['sector'])
        X = df[['sector', 'employee_count', 'revenue', 'is_sustainable']]
        prediction = model.predict(X)[0]

        # Save to DB
        CompanyData.objects.create(
            sector=sector,
            employee_count=employee_count,
            revenue=revenue,
            is_sustainable=is_sustainable,
            has_problem=bool(prediction)
        )

        return JsonResponse({'prediction': bool(prediction)})

def company_data_json(request):
    data = list(CompanyData.objects.all().values())
    return JsonResponse(data, safe=False)
from django.shortcuts import render
from .models import CompanyData

def company_data_view(request):
    companies = CompanyData.objects.all()
    return render(request, 'company_data.html', {'companies': companies})
