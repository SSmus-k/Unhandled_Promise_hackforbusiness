import os
import django
import pandas as pd
import joblib

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hariyobase.settings')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.sys.path.append(BASE_DIR)

django.setup()

from api.models import CompanyData

def run_model_and_save():
    model = joblib.load(os.path.join(BASE_DIR, 'api', 'ml', 'model.pkl'))
    le = joblib.load(os.path.join(BASE_DIR, 'api', 'ml', 'sector_encoder.pkl'))

    df = pd.DataFrame([
        {"sector": "Tech", "employee_count": 100, "revenue": 500000, "is_sustainable": True},
        {"sector": "Finance", "employee_count": 50, "revenue": 300000, "is_sustainable": False}
    ])

    df['sector'] = le.transform(df['sector'])
    X = df[['sector', 'employee_count', 'revenue', 'is_sustainable']]
    predictions = model.predict(X)

    for i, row in df.iterrows():
        CompanyData.objects.create(
            sector=le.inverse_transform([row['sector']])[0],
            employee_count=row['employee_count'],
            revenue=row['revenue'],
            is_sustainable=row['is_sustainable'],
            has_problem=bool(predictions[i])
        )

if __name__ == "__main__":
    run_model_and_save()
