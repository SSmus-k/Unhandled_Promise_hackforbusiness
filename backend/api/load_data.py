import os
import django
import pandas as pd

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hariyobase.settings')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(BASE_DIR)
django.setup()

from api.models import CompanyData

def load_csv_to_db():
    file_path = os.path.join(BASE_DIR,   'ml', 'training_data.csv')
    df = pd.read_csv(file_path)

    for _, row in df.iterrows():
        CompanyData.objects.create(
            sector=row['sector'],
            is_sustainable=bool(row['is_sustainable']),
            has_problem=bool(row['has_problem']),
            waste_amount=row['waste_amount'],
            waste_type=row['waste_type']
        )

if __name__ == "__main__":
    load_csv_to_db()
    print("✅ Data loaded successfully.")
