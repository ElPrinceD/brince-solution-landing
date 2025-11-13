from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings


def send_lead_notification_email(lead):
    """Send email notification when a new lead is submitted"""
    subject = f'New Lead: {lead.contact_person} - {lead.business_name or "No Business Name"}'
    
    # Create email body
    message = f"""
New Lead Submission Received

Contact Information:
- Name: {lead.contact_person}
- Position: {lead.position or "Not provided"}
- Email: {lead.email}
- Phone: {lead.phone or "Not provided"}

Business Information:
- Business Name: {lead.business_name or "Not provided"}
- Industry: {lead.industry or "Not provided"}
- Business Structure: {lead.business_structure}
- Years in Operation: {lead.years_operation}
- Employees: {lead.employees}

Goals:
- Short-term: {lead.short_term_goals}
- Long-term: {lead.long_term_goals}

Challenges: {lead.challenges}

Services Seeking: {lead.services_seeking}

Additional Information: {lead.additional_info}

Submitted at: {lead.created_at}
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,  # Use EMAIL_HOST_USER as from_email for Office365
            recipient_list=['admin@brincesolutions.com'],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        import traceback
        traceback.print_exc()
        return False


def send_lead_confirmation_email(lead):
    """Send confirmation email to the lead"""
    subject = 'Thank You for Contacting Brince Solutions'
    
    message = f"""
Dear {lead.contact_person},

Thank you for reaching out to Brince Solutions! We have received your business information and our team will review it carefully.

We'll get back to you within 24 hours to discuss how we can help grow your business.

Best regards,
Brince Solutions Team
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,  # Use EMAIL_HOST_USER as from_email for Office365
            recipient_list=[lead.email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Error sending confirmation email: {e}")
        import traceback
        traceback.print_exc()
        return False


def send_booking_confirmation_email(lead, appointment_details=None, payment_details=None):
    """Send booking confirmation email to admin and customer"""
    # Email to admin
    admin_subject = f'New Booking: {lead.contact_person} - {appointment_details.get("title", "Appointment") if appointment_details else "Appointment"}'
    
    admin_message = f"""
New Booking Received

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Name: {lead.contact_person}
- Position: {lead.position or "Not provided"}
- Email: {lead.email}
- Phone: {lead.phone or "Not provided"}
- Business Name: {lead.business_name or "Not provided"}
- Business Address: {lead.business_address or "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

APPOINTMENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Service: {appointment_details.get("title", "N/A") if appointment_details else "N/A"}
- Duration: {appointment_details.get("duration", "N/A") if appointment_details else "N/A"}
- Price: {appointment_details.get("price", "N/A") if appointment_details else "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAYMENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{f"- Payment Status: {payment_details.get('status', 'N/A')}" if payment_details else "- Payment: Not applicable"}
{f"- Payment ID: {payment_details.get('payment_id', 'N/A')}" if payment_details and payment_details.get('payment_id') else ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Industry: {lead.industry or "Not provided"}
- Nature of Business: {lead.nature_of_business or "Not provided"}
- Business Structure: {lead.business_structure or "Not provided"}
- Years in Operation: {lead.years_operation or "Not provided"}
- Number of Employees: {lead.employees or "Not provided"}
- Locations: {lead.locations or "Not provided"}
- Services Seeking: {lead.services_seeking or "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADDITIONAL INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{lead.additional_info or "None provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Booking created at: {lead.created_at}
Lead ID: {lead.id}
"""
    
    # Email to customer
    customer_subject = 'Booking Confirmation - Brince Solutions'
    
    customer_message = f"""
Dear {lead.contact_person},

Thank you for booking with Brince Solutions!

Your booking has been confirmed:

Service: {appointment_details.get("title", "Appointment") if appointment_details else "Appointment"}
Duration: {appointment_details.get("duration", "N/A") if appointment_details else "N/A"}
{f"Amount Paid: {appointment_details.get('price', 'N/A')}" if appointment_details and appointment_details.get('price') != 'Free' else "This is a free consultation"}

Our team will contact you shortly to finalize the details and schedule your appointment.

If you have any questions, please don't hesitate to contact us.

Best regards,
Brince Solutions Team
"""
    
    try:
        # Send to admin and office
        send_mail(
            subject=admin_subject,
            message=admin_message,
            from_email=settings.EMAIL_HOST_USER,  # Use EMAIL_HOST_USER as from_email for Office365
            recipient_list=['admin@brincesolutions.com', 'office@brincesolutions.com'],
            fail_silently=False,
        )
        
        # Send to customer
        send_mail(
            subject=customer_subject,
            message=customer_message,
            from_email=settings.EMAIL_HOST_USER,  # Use EMAIL_HOST_USER as from_email for Office365
            recipient_list=[lead.email],
            fail_silently=False,
        )
        
        return True
    except Exception as e:
        print(f"Error sending booking confirmation email: {e}")
        import traceback
        traceback.print_exc()
        return False

