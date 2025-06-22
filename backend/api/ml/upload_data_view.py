import csv
from io import TextIOWrapper
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.contrib import messages
from django.http import JsonResponse
from api.models import CompanyData  # FIXED: Correct import

@csrf_exempt
def upload_csv_view(request):
    if request.method == 'POST' and request.FILES.get('csv_file'):
        csv_file = request.FILES['csv_file']
        try:
            decoded_file = TextIOWrapper(csv_file, encoding='utf-8')
            reader = csv.DictReader(decoded_file)

            for row in reader:
                CompanyData.objects.create(
                    name=row.get('name', 'Unknown'),
                    sector=row.get('sector', 'Unknown'),
                    is_sustainable=row.get('is_sustainable', '').lower() in ['1', 'true'],
                    has_problem=row.get('has_problem', '').lower() in ['1', 'true'],
                    waste_type=row.get('waste_type', ''),
                    waste_amount=float(row.get('waste_amount') or 0),
                    predicted_waste_next_year=float(row.get('predicted_waste_next_year') or 0),
                    yearly_produced_waste=float(row.get('yearly_produced_waste') or 0),
                    reduced_waste_due_to_recommendation=float(row.get('reduced_waste_due_to_recommendation') or 0),
                )

            messages.success(request, "CSV uploaded and data saved successfully.")
            return redirect('dashboard')

        except Exception as e:
            return JsonResponse({'error': f"Failed to process CSV: {str(e)}"}, status=400)

    return JsonResponse({'error': 'No file uploaded or wrong method'}, status=400)
