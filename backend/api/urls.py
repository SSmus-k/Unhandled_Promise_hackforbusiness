from django.urls import path
from .views import dashboard_view, analyze_input, upload_csv, RegisterView

urlpatterns = [
<<<<<<< HEAD
    path('dashboard/', dashboard_view, name='dashboard'),
    path('analyze/', analyze_input, name='analyze_input'),
    path('upload_csv/', upload_csv, name='upload_csv'),
=======
<<<<<<< HEAD
    path('dashboard/', dashboard_view, name='dashboard'),
    path('analyze/', analyze_input, name='analyze_input'),
    path('upload_csv/', upload_csv, name='upload_csv'),
    path('signup', RegisterView.as_view()),
=======
    path('/api/dashboard/', dashboard_view, name='dashboard'),
    path('/api/analyze/', analyze_input, name='analyze_input'),
    path('/api/upload_csv/', upload_csv, name='upload_csv'),
>>>>>>> origin/pushkar
>>>>>>> origin/main
]
