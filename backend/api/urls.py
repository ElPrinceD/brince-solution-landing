from django.urls import path
from . import views

urlpatterns = [
    path('leads/', views.submit_lead, name='submit_lead'),
    path('payments/create-intent/', views.create_payment_intent, name='create_payment_intent'),
    path('payments/webhook/', views.stripe_webhook, name='stripe_webhook'),
    path('google-reviews/', views.get_google_reviews, name='get_google_reviews'),
    path('job-application/', views.submit_job_application, name='submit_job_application'),
    path('training-inquiry/', views.submit_training_inquiry, name='submit_training_inquiry'),
]

