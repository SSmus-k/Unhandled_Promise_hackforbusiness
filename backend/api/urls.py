from django.urls import path
from .views import dashboard_view, analyze_input, upload_csv

urlpatterns = [
    path('dashboard/', dashboard_view, name='dashboard'),
    path('analyze/', analyze_input, name='analyze_input'),
    path('upload_csv/', upload_csv, name='upload_csv'),
]
