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
    model_path = os.path.join(BASE_DIR,  'api', 'ml', 'model.pkl')
    encoder_path = os.path.join(BASE_DIR,  'api', 'ml', 'sector_encoder.pkl')
    csv_path = os.path.join(BASE_DIR,  'api', 'ml', 'training_data.csv')

    model = joblib.load(model_path)
    le = joblib.load(encoder_path)

    df = pd.read_csv(csv_path)

    # Create a copy of the original sector column
    df['sector_original'] = df['sector']
    
    # Overwrite 'sector' with encoded values only for prediction
    df['sector'] = le.transform(df['sector'])

    X = df[['sector', 'employee_count', 'revenue', 'is_sustainable']]
    predictions = model.predict(X)

    for i, row in df.iterrows():
        CompanyData.objects.create(
            sector=row['sector_original'],  # Use original label here
            employee_count=row['employee_count'],
            revenue=row['revenue'],
            is_sustainable=bool(row['is_sustainable']),
            has_problem=bool(predictions[i]),
            waste_amount=row['waste_amount'],
            waste_type=row['waste_type']
        )

if __name__ == "__main__":
    run_model_and_save()
