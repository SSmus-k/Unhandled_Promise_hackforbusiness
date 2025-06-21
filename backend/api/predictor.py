import os
import django
import pandas as pd
import joblib
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hariyobase.settings')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

django.setup()

from api.models import CompanyData

def run_model_and_save():
    model = joblib.load(os.path.join(BASE_DIR, 'api', 'ml', 'model.pkl'))

    le = joblib.load('ml/sector_encoder.pkl')
    df = pd.DataFrame([
        {"sector": "Tech", "employee_count": 100, "revenue": 500000, "is_sustainable": True},
        {"sector": "Finance", "employee_count": 50, "revenue": 300000, "is_sustainable": False}
    ])

    predictions = model.predict(df[["employee_count", "revenue", "is_sustainable"]])

    for i, row in df.iterrows():
        CompanyData.objects.create(
            sector=row["sector"],
            employee_count=row["employee_count"],
            revenue=row["revenue"],
            is_sustainable=row["is_sustainable"],
            has_problem=bool(predictions[i]),
            waste_amount=row['waste_amount'],
            waste_type=row['waste_type']
        )

if __name__ == "__main__":
    run_model_and_save()
