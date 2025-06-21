from django.shortcuts import render
from .models import CompanyData

def company_data(request):
    data = CompanyData.objects.all()
    return render(request, 'companies.html', {'data': data})
