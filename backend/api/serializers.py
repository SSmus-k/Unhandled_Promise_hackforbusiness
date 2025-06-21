from rest_framework import serializers
from .models import CompanyData

class CompanyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyData
        fields = '__all__'
