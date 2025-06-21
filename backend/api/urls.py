from django.urls import path
from .views import company_data_json, company_data_view

urlpatterns = [
    path('company-data/', company_data_json, name='company-data-json'),
    path('companies/', company_data_view, name='company_data'),
]
