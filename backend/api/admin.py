from django.contrib import admin
from .models import Lead, Payment


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['contact_person', 'business_name', 'email', 'created_at', 'is_contacted']
    list_filter = ['created_at', 'is_contacted', 'business_structure']
    search_fields = ['contact_person', 'email', 'business_name']
    readonly_fields = ['created_at']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['stripe_payment_intent_id', 'amount', 'currency', 'status', 'customer_email', 'created_at']
    list_filter = ['status', 'created_at', 'currency']
    search_fields = ['stripe_payment_intent_id', 'customer_email', 'customer_name']
    readonly_fields = ['created_at', 'updated_at']

