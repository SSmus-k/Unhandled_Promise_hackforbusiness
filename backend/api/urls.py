from django.urls import path
from .views import company_data_json, company_data_view
from . import views
urlpatterns = [
    path('company-data/', company_data_json, name='company-data-json'),
    path('companies/', company_data_view, name='company_data'),
    path('charts/', views.company_charts, name='company_charts'),

]
