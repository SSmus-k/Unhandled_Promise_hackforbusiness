from django.urls import path
from .views import dashboard_view, analyze_input, upload_csv

urlpatterns = [
    path('/api/dashboard/', dashboard_view, name='dashboard'),
    path('/api/analyze/', analyze_input, name='analyze_input'),
    path('/api/upload_csv/', upload_csv, name='upload_csv'),
]
