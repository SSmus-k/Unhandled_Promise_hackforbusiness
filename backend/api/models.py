from django.db import models

class CompanyData(models.Model):
    SECTOR_CHOICES = [
        ('Tech', 'Tech'),
        ('Finance', 'Finance'),
        ('Healthcare', 'Healthcare'),
        ('Manufacturing', 'Manufacturing'),
        ('Retail', 'Retail'),
        ('IT', 'IT'),
    ]

    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    employee_count = models.IntegerField()
    revenue = models.FloatField(help_text="Annual revenue in local currency")
    is_sustainable = models.BooleanField()
    has_problem = models.BooleanField(default=False)
    waste_amount = models.FloatField(help_text="Waste produced per year (kg)", null=True, blank=True)
    waste_type = models.CharField(max_length=100, help_text="E.g. Plastic, Organic, Electronic", null=True, blank=True)

    def __str__(self):
        return f"{self.sector} - {self.revenue}"
