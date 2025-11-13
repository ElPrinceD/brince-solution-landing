from django.db import models
from django.utils import timezone


class Lead(models.Model):
    """Model for storing lead generation form submissions"""
    
    # Basic Information
    business_name = models.CharField(max_length=255, blank=True)
    contact_person = models.CharField(max_length=255)
    position = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    business_address = models.TextField(blank=True)
    
    # Business Details
    nature_of_business = models.CharField(max_length=255, blank=True)
    business_activities = models.TextField(blank=True)
    industry = models.CharField(max_length=255, blank=True)
    products_services = models.TextField(blank=True)
    target_market = models.CharField(max_length=255, blank=True)
    
    # Company Information
    years_operation = models.CharField(max_length=100)
    business_structure = models.CharField(max_length=100)
    employees = models.CharField(max_length=100)
    locations = models.TextField()
    
    # Goals and Challenges
    short_term_goals = models.TextField()
    long_term_goals = models.TextField()
    challenges = models.TextField()
    services_seeking = models.TextField()
    additional_info = models.TextField()
    
    # Lead Generation Fields
    company_size = models.CharField(max_length=50, blank=True)
    annual_revenue = models.CharField(max_length=50, blank=True)
    preferred_contact_method = models.CharField(max_length=50, blank=True)
    urgency_level = models.CharField(max_length=50, blank=True)
    budget_range = models.CharField(max_length=50, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    is_contacted = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.contact_person} - {self.business_name or self.email}"


class Payment(models.Model):
    """Model for storing payment information"""
    
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    stripe_payment_intent_id = models.CharField(max_length=255, unique=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='gbp')
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    description = models.CharField(max_length=255, blank=True)
    customer_email = models.EmailField()
    customer_name = models.CharField(max_length=255, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payment {self.stripe_payment_intent_id} - {self.amount} {self.currency.upper()}"

