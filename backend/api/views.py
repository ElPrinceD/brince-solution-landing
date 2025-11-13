from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import stripe
import json
import logging
from django.conf import settings
from .models import Lead, Payment
from .serializers import LeadSerializer, PaymentSerializer
from .utils import send_lead_notification_email, send_lead_confirmation_email, send_booking_confirmation_email

# Configure logging
logger = logging.getLogger(__name__)

# Initialize Stripe API key
if settings.STRIPE_SECRET_KEY:
    stripe.api_key = settings.STRIPE_SECRET_KEY
else:
    logger.warning("STRIPE_SECRET_KEY is not set in environment variables")


@api_view(['POST'])
def submit_lead(request):
    """Handle lead form submission"""
    logger.info(f"Received lead submission request: {request.data}")
    
    try:
        serializer = LeadSerializer(data=request.data)
        
        if serializer.is_valid():
            lead = serializer.save()
            logger.info(f"Lead created successfully: ID={lead.id}, Email={lead.email}")
            
            # Check if this is a booking (has "Booking:" in short_term_goals)
            is_booking = 'Booking:' in lead.short_term_goals or 'Appointment booking' in lead.additional_info
            
            if is_booking:
                # Extract appointment details from lead data
                appointment_title = lead.services_seeking or 'Appointment'
                appointment_duration = lead.additional_info.replace('Appointment booking - ', '') if 'Appointment booking' in lead.additional_info else 'N/A'
                appointment_price = 'Free' if 'Free' in lead.short_term_goals else 'N/A'
                
                appointment_details = {
                    'title': appointment_title,
                    'duration': appointment_duration,
                    'price': appointment_price
                }
                
                # Send booking confirmation emails
                try:
                    send_booking_confirmation_email(lead, appointment_details)
                    logger.info(f"Booking confirmation emails sent for lead ID={lead.id}")
                except Exception as e:
                    logger.error(f"Failed to send booking confirmation email for lead ID={lead.id}: {str(e)}")
            else:
                # Regular lead submission - send standard emails
                try:
                    send_lead_notification_email(lead)
                    logger.info(f"Notification email sent for lead ID={lead.id}")
                except Exception as e:
                    logger.error(f"Failed to send notification email for lead ID={lead.id}: {str(e)}")
                
                try:
                    send_lead_confirmation_email(lead)
                    logger.info(f"Confirmation email sent for lead ID={lead.id}")
                except Exception as e:
                    logger.error(f"Failed to send confirmation email for lead ID={lead.id}: {str(e)}")
            
            return Response({
                'success': True,
                'message': 'Lead submitted successfully',
                'lead_id': lead.id
            }, status=status.HTTP_201_CREATED)
        else:
            logger.warning(f"Lead submission validation failed: {serializer.errors}")
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error processing lead submission: {str(e)}", exc_info=True)
        return Response({
            'success': False,
            'error': 'An error occurred while processing your request'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_payment_intent(request):
    """Create a Stripe payment intent for one-time payments"""
    logger.info(f"Received payment intent request: amount={request.data.get('amount')}, email={request.data.get('customer_email')}")
    
    # Check if Stripe is configured
    if not settings.STRIPE_SECRET_KEY:
        logger.error("STRIPE_SECRET_KEY is not configured")
        return Response({
            'error': 'Payment processing is not configured. Please contact support.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        data = request.data
        amount = int(float(data.get('amount', 0)) * 100)  # Convert to cents
        currency = data.get('currency', 'gbp').lower()
        description = data.get('description', 'Service Payment')
        customer_email = data.get('customer_email', '')
        customer_name = data.get('customer_name', '')
        lead_id = data.get('lead_id')
        
        if amount <= 0:
            logger.warning(f"Invalid amount received: {amount}")
            return Response({
                'error': 'Invalid amount'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create payment intent
        logger.debug(f"Creating Stripe payment intent with amount={amount}, currency={currency}")
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            description=description,
            receipt_email=customer_email,
            metadata={
                'customer_name': customer_name,
                'lead_id': str(lead_id) if lead_id else '',
            }
        )
        
        # Save payment record
        payment = Payment.objects.create(
            stripe_payment_intent_id=intent.id,
            amount=amount / 100,  # Convert back to dollars
            currency=currency,
            description=description,
            customer_email=customer_email,
            customer_name=customer_name,
            lead_id=lead_id if lead_id else None,
        )
        
        logger.info(f"Payment intent created: ID={intent.id}, Payment ID={payment.id}")
        
        # If there's a lead associated, send booking confirmation
        if lead_id:
            try:
                lead = Lead.objects.get(id=lead_id)
                # Extract appointment details from description
                appointment_details = {
                    'title': description.split(' - ')[0] if ' - ' in description else description,
                    'duration': description.split(' - ')[1] if ' - ' in description else 'N/A',
                    'price': f'£{amount / 100:.2f}'
                }
                payment_details = {
                    'status': 'pending',
                    'payment_id': payment.id
                }
                send_booking_confirmation_email(lead, appointment_details, payment_details)
                logger.info(f"Booking confirmation email sent after payment intent creation for lead ID={lead_id}")
            except Lead.DoesNotExist:
                logger.warning(f"Lead ID={lead_id} not found when sending booking confirmation")
            except Exception as e:
                logger.error(f"Failed to send booking confirmation email: {str(e)}")
        
        return Response({
            'client_secret': intent.client_secret,
            'payment_id': payment.id
        }, status=status.HTTP_201_CREATED)
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error creating payment intent: {str(e)}")
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error creating payment intent: {str(e)}", exc_info=True)
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def stripe_webhook(request):
    """Handle Stripe webhook events"""
    if request.method != 'POST':
        logger.warning("Webhook received non-POST request")
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
        logger.info(f"Webhook event received: {event['type']}")
    except ValueError as e:
        logger.error(f"Invalid webhook payload: {str(e)}")
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Invalid webhook signature: {str(e)}")
        return JsonResponse({'error': 'Invalid signature'}, status=400)
    
    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        
        try:
            payment = Payment.objects.get(
                stripe_payment_intent_id=payment_intent['id']
            )
            payment.status = 'completed'
            payment.stripe_customer_id = payment_intent.get('customer', '')
            payment.save()
            logger.info(f"Payment marked as completed: ID={payment.id}")
            
            # Send booking confirmation email if there's an associated lead
            if payment.lead:
                try:
                    appointment_details = {
                        'title': payment.description.split(' - ')[0] if ' - ' in payment.description else payment.description,
                        'duration': payment.description.split(' - ')[1] if ' - ' in payment.description else 'N/A',
                        'price': f'£{payment.amount:.2f}'
                    }
                    payment_details = {
                        'status': 'completed',
                        'payment_id': payment.id
                    }
                    send_booking_confirmation_email(payment.lead, appointment_details, payment_details)
                    logger.info(f"Booking confirmation email sent after payment success for lead ID={payment.lead.id}")
                except Exception as e:
                    logger.error(f"Failed to send booking confirmation email after payment: {str(e)}")
        except Payment.DoesNotExist:
            logger.warning(f"Payment not found for intent: {payment_intent['id']}")
    
    elif event['type'] == 'payment_intent.payment_failed':
        payment_intent = event['data']['object']
        
        try:
            payment = Payment.objects.get(
                stripe_payment_intent_id=payment_intent['id']
            )
            payment.status = 'failed'
            payment.save()
            logger.info(f"Payment marked as failed: ID={payment.id}")
        except Payment.DoesNotExist:
            logger.warning(f"Payment not found for intent: {payment_intent['id']}")
    
    return JsonResponse({'status': 'success'})

