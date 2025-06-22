import csv
from api.models import CompanyData

def import_data_from_csv(file_path):
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Convert string "1"/"0" to bool for boolean fields
            is_sustainable = bool(int(row['is_sustainable']))
            has_problem = bool(int(row['has_problem']))

            # Create a model instance and save
            company = CompanyData(
                sector=row['sector'],
                is_sustainable=is_sustainable,
                has_problem=has_problem,
            )
            company.save()

# Call the function with your CSV path
import_data_from_csv('./api/training_data.csv')
