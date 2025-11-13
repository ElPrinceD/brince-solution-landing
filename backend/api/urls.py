from django.urls import path
from . import views

urlpatterns = [
    path('leads/', views.submit_lead, name='submit_lead'),
    path('payments/create-intent/', views.create_payment_intent, name='create_payment_intent'),
    path('payments/webhook/', views.stripe_webhook, name='stripe_webhook'),
]

