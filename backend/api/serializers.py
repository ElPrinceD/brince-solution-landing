from rest_framework import serializers
from .models import Lead, Payment


class LeadSerializer(serializers.ModelSerializer):
    # Allow camelCase field names from frontend
    contactPerson = serializers.CharField(source='contact_person', required=True)
    businessName = serializers.CharField(source='business_name', required=False, allow_blank=True)
    businessAddress = serializers.CharField(source='business_address', required=False, allow_blank=True)
    natureOfBusiness = serializers.CharField(source='nature_of_business', required=False, allow_blank=True)
    businessActivities = serializers.CharField(source='business_activities', required=False, allow_blank=True)
    productsServices = serializers.CharField(source='products_services', required=False, allow_blank=True)
    targetMarket = serializers.CharField(source='target_market', required=False, allow_blank=True)
    yearsOperation = serializers.CharField(source='years_operation', required=True)
    businessStructure = serializers.CharField(source='business_structure', required=True)
    shortTermGoals = serializers.CharField(source='short_term_goals', required=True)
    longTermGoals = serializers.CharField(source='long_term_goals', required=True)
    servicesSeeking = serializers.CharField(source='services_seeking', required=True)
    additionalInfo = serializers.CharField(source='additional_info', required=True)
    companySize = serializers.CharField(source='company_size', required=False, allow_blank=True)
    annualRevenue = serializers.CharField(source='annual_revenue', required=False, allow_blank=True)
    preferredContactMethod = serializers.CharField(source='preferred_contact_method', required=False, allow_blank=True)
    urgencyLevel = serializers.CharField(source='urgency_level', required=False, allow_blank=True)
    budgetRange = serializers.CharField(source='budget_range', required=False, allow_blank=True)
    
    class Meta:
        model = Lead
        fields = [
            'contactPerson', 'businessName', 'position', 'email', 'phone', 'businessAddress',
            'natureOfBusiness', 'businessActivities', 'industry', 'productsServices', 'targetMarket',
            'yearsOperation', 'businessStructure', 'employees', 'locations',
            'shortTermGoals', 'longTermGoals', 'challenges', 'servicesSeeking', 'additionalInfo',
            'companySize', 'annualRevenue', 'preferredContactMethod', 'urgencyLevel', 'budgetRange'
        ]
        read_only_fields = ['created_at', 'is_contacted']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'status']

