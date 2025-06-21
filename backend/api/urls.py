from django.urls import path
from .views import company_data

urlpatterns = [
    path('companies/', company_data, name='company_list'),
]
