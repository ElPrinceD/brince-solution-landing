from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings


def send_lead_notification_email(lead):
    """Send email notification when a new lead is submitted"""
    subject = f'New Lead: {lead.contact_person} - {lead.business_name or "No Business Name"}'
    
    # Create professional email body
    message = f"""Dear Sales Team,

A new lead submission has been received through our website.

CONTACT INFORMATION
Name: {lead.contact_person}
Position: {lead.position or "Not provided"}
Email: {lead.email}
Phone: {lead.phone or "Not provided"}

BUSINESS INFORMATION
Business Name: {lead.business_name or "Not provided"}
Industry: {lead.industry or "Not provided"}
Business Structure: {lead.business_structure}
Years in Operation: {lead.years_operation}
Number of Employees: {lead.employees}

GOALS
Short-term Goals: {lead.short_term_goals}
Long-term Goals: {lead.long_term_goals}

CHALLENGES
{lead.challenges}

SERVICES SEEKING
{lead.services_seeking}

ADDITIONAL INFORMATION
{lead.additional_info}

Submitted: {lead.created_at}
Lead ID: {lead.id}

Best regards,
Brince Solutions System
"""
    
    try:
        # For lead generation inquiries, send to both sales and admin
        recipients = ['admin@brincesolutions.com', 'sales@brincesolutions.com']
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=recipients,
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
    
    message = f"""Dear {lead.contact_person},

Thank you for reaching out to Brince Solutions. We have received your business information and our team will review it carefully.

We will get back to you within 24 hours to discuss how we can help grow your business.

If you have any immediate questions, please do not hesitate to contact us at sales@brincesolutions.com or call us at 02034111756.

Best regards,
Brince Solutions Team
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
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
    """Send booking confirmation email to sales and customer"""
    # Email to sales team
    sales_subject = f'New Booking: {lead.contact_person} - {appointment_details.get("title", "Appointment") if appointment_details else "Appointment"}'
    
    payment_info = ""
    if payment_details:
        payment_info = f"""PAYMENT INFORMATION
Payment Status: {payment_details.get('status', 'N/A').title()}
Payment ID: {payment_details.get('payment_id', 'N/A')}
Amount: {payment_details.get('amount', 'N/A')}

"""
    elif appointment_details and appointment_details.get('price'):
        payment_info = f"""PAYMENT INFORMATION
Price: {appointment_details.get('price', 'N/A')}

"""
    
    sales_message = f"""Dear Sales Team,

A new booking has been received through our website.

CUSTOMER INFORMATION
Name: {lead.contact_person}
Position: {lead.position or "Not provided"}
Email: {lead.email}
Phone: {lead.phone or "Not provided"}
Business Name: {lead.business_name or "Not provided"}
Business Address: {lead.business_address or "Not provided"}

APPOINTMENT DETAILS
Service: {appointment_details.get("title", "N/A") if appointment_details else "N/A"}
Duration: {appointment_details.get("duration", "N/A") if appointment_details else "N/A"}
Date: {appointment_details.get("date", "To be scheduled") if appointment_details else "To be scheduled"}
Time: {appointment_details.get("time", "To be scheduled") if appointment_details else "To be scheduled"}

{payment_info}BUSINESS INFORMATION
Industry: {lead.industry or "Not provided"}
Nature of Business: {lead.nature_of_business or "Not provided"}
Business Structure: {lead.business_structure or "Not provided"}
Years in Operation: {lead.years_operation or "Not provided"}
Number of Employees: {lead.employees or "Not provided"}
Locations: {lead.locations or "Not provided"}
Services Seeking: {lead.services_seeking or "Not provided"}

ADDITIONAL INFORMATION
{lead.additional_info or "None provided"}

Booking Created: {lead.created_at}
Lead ID: {lead.id}

Best regards,
Brince Solutions System
"""
    
    # Email to customer
    customer_subject = 'Booking Confirmation - Brince Solutions'
    
    customer_message = f"""Dear {lead.contact_person},

Thank you for booking with Brince Solutions. Your booking has been confirmed.

BOOKING DETAILS
Service: {appointment_details.get("title", "Appointment") if appointment_details else "Appointment"}
Duration: {appointment_details.get("duration", "N/A") if appointment_details else "N/A"}
{f"Date: {appointment_details.get('date', 'To be scheduled')}" if appointment_details and appointment_details.get('date') else ""}
{f"Time: {appointment_details.get('time', 'To be scheduled')}" if appointment_details and appointment_details.get('time') else ""}

Our team will contact you shortly to finalize the details and schedule your appointment.

If you have any questions, please contact us at sales@brincesolutions.com or call 02034111756.

Best regards,
Brince Solutions Team
"""
    
    try:
        # Send booking confirmations ONLY to sales@brincesolutions.com
        recipients = ['sales@brincesolutions.com']
        print(f"Sending booking confirmation email to: {recipients}")
        send_mail(
            subject=sales_subject,
            message=sales_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=recipients,
            fail_silently=False,
        )
        print(f"Booking confirmation email sent successfully to {recipients}")
        
        # Send to customer
        print(f"Sending booking confirmation email to customer: {lead.email}")
        send_mail(
            subject=customer_subject,
            message=customer_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[lead.email],
            fail_silently=False,
        )
        print(f"Customer confirmation email sent successfully to {lead.email}")
        
        return True
    except Exception as e:
        print(f"Error sending booking confirmation email: {e}")
        import traceback
        traceback.print_exc()
        return False


def send_webinar_registration_email(lead):
    """Send webinar registration notification to sales team"""
    subject = f'New Webinar Registration: {lead.contact_person}'
    
    message = f"""Dear Sales Team,

A new webinar registration has been received.

REGISTRANT INFORMATION
Name: {lead.contact_person}
Email: {lead.email}
Phone: {lead.phone or "Not provided"}
Company: {lead.business_name or "Not provided"}
Position: {lead.position or "Not provided"}

WEBINAR DETAILS
Event: Free Webinar - How to Grow & Scale Your Business
Date: Friday, November 21, 2025
Time: 2:00 PM - 4:00 PM GMT

Registered: {lead.created_at}
Lead ID: {lead.id}

Best regards,
Brince Solutions System
"""
    
    try:
        recipients = ['sales@brincesolutions.com']
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=recipients,
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Error sending webinar registration email: {e}")
        import traceback
        traceback.print_exc()
        return False

