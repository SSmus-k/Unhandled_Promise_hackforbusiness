from django.db import models
from django.contrib.auth.models import User

class CompanyData(models.Model):
    SECTOR_CHOICES = [
        ('Tech', 'Tech'),
        ('Finance', 'Finance'),
        ('Healthcare', 'Healthcare'),
        ('Manufacturing', 'Manufacturing'),
        ('Retail', 'Retail'),
        ('IT', 'IT'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='company_entries')
    name = models.CharField(max_length=200, help_text="Company name", default="Unknown")
    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    is_sustainable = models.BooleanField()
    has_problem = models.BooleanField(default=False)
    waste_type = models.CharField(max_length=100, null=True, blank=True)
    waste_amount = models.FloatField(null=True, blank=True)
    predicted_waste_next_year = models.FloatField(null=True, blank=True)
    yearly_produced_waste = models.FloatField(null=True, blank=True)
    reduced_waste_due_to_recommendation = models.FloatField(null=True, blank=True)
    date_recorded = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.sector})"
