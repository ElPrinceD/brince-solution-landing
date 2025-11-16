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
        recipients = ['admin@brincesolutions.com', 'office@brincesolutions.com']
        
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
    # Check if this is a webinar registration
    is_webinar = 'Webinar Registration' in (lead.short_term_goals or '') or 'Free Webinar' in (lead.services_seeking or '')
    
    if is_webinar:
        subject = 'Webinar Registration Confirmed - Join Us on November 21, 2025'
        
        message = f"""Dear {lead.contact_person},

Thank you for registering for our free webinar: "How to Grow & Scale Your Business". We are delighted to have you join us!

WEBINAR DETAILS
Date: Friday, November 21, 2025
Time: 6:00 PM - 8:00 PM GMT (London)
Format: Online via Zoom

JOIN THE MEETING
You can join the webinar using the following details:

Join Zoom Meeting:
https://us06web.zoom.us/j/86573140304?pwd=6KxhaeLAq9pj4aaKE576f71pivbBDY.1

Meeting ID: 865 7314 0304
Passcode: 076585

WHAT TO EXPECT
During this exclusive webinar, our industry experts will share:
• Proven strategies for business growth
• Scaling techniques that actually work
• Common pitfalls to avoid
• Q&A session with industry experts

PREPARATION
• Please join a few minutes early to ensure your connection is working
• Have your questions ready for the Q&A session
• You can access the meeting from any device (computer, tablet, or smartphone)

ADD TO CALENDAR
We recommend adding this event to your calendar to ensure you don't miss it.

If you have any questions or need assistance, please contact us at office@brincesolutions.com or call 02034111756.

We look forward to seeing you at the webinar!

Best regards,
Brince Solutions Team

Brince Solutions Ltd
Email: office@brincesolutions.com
Phone: 02034111756
Website: https://brincesolutions.com
"""
    else:
        subject = 'Thank You for Contacting Brince Solutions'
        
        message = f"""Dear {lead.contact_person},

Thank you for reaching out to Brince Solutions. We have received your business information and our team will review it carefully.

We will get back to you within 24 hours to discuss how we can help grow your business.

If you have any immediate questions, please do not hesitate to contact us at office@brincesolutions.com or call us at 02034111756.

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


def extract_date_time_from_additional_info(additional_info):
    """Extract date and time from additional_info string"""
    date = "To be scheduled"
    time = "To be scheduled"
    
    if additional_info:
        # Look for "Date: " pattern
        if "Date: " in additional_info:
            date_part = additional_info.split("Date: ")[1]
            # Extract date (everything until " - Time:" or end of string)
            if " - Time:" in date_part:
                date = date_part.split(" - Time:")[0].strip()
            else:
                date = date_part.strip()
        
        # Look for "Time: " pattern
        if "Time: " in additional_info:
            time_part = additional_info.split("Time: ")[1]
            # Extract time (everything until next " - " or end of string)
            if " - " in time_part:
                time = time_part.split(" - ")[0].strip()
            else:
                time = time_part.strip()
    
    return date, time


def is_business_booking(lead):
    """Determine if this is a business booking or personal appointment"""
    # Check if business fields are filled
    has_business_info = (
        (lead.business_name and lead.business_name not in ['', 'Not provided', 'Not specified']) or
        (lead.industry and lead.industry not in ['', 'Not provided', 'Not specified']) or
        (lead.business_structure and lead.business_structure not in ['', 'Not provided', 'Not specified']) or
        (lead.years_operation and lead.years_operation not in ['', 'Not provided', 'Not specified']) or
        (lead.employees and lead.employees not in ['', 'Not provided', 'Not specified'])
    )
    
    # Check if it's a lead generation inquiry
    is_lead_gen = 'Lead Generation' in (lead.services_seeking or '') or 'Lead Generation' in (lead.short_term_goals or '')
    
    return has_business_info or is_lead_gen


def send_booking_confirmation_email(lead, appointment_details=None, payment_details=None):
    """Send booking confirmation email to sales and customer"""
    # Extract date and time from additional_info
    date, time = extract_date_time_from_additional_info(lead.additional_info)
    
    # Update appointment_details with extracted date/time if not already set
    if appointment_details:
        if not appointment_details.get('date') or appointment_details.get('date') == 'To be scheduled':
            appointment_details['date'] = date
        if not appointment_details.get('time') or appointment_details.get('time') == 'To be scheduled':
            appointment_details['time'] = time
    else:
        appointment_details = {'date': date, 'time': time}
    
    # Determine if this is a business booking or personal appointment
    is_business = is_business_booking(lead)
    
    # Email to sales team
    sales_subject = f'New {"Business Booking" if is_business else "Appointment"}: {lead.contact_person} - {appointment_details.get("title", "Appointment") if appointment_details else "Appointment"}'
    
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
    
    # Different email templates for business vs personal
    if is_business:
        sales_message = f"""Dear Sales Team,

A new business booking has been received through our website.

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
Date: {appointment_details.get("date", "To be scheduled")}
Time: {appointment_details.get("time", "To be scheduled")}

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
    else:
        # Personal appointment - simpler template
        sales_message = f"""Dear Sales Team,

A new appointment booking has been received through our website.

CUSTOMER INFORMATION
Name: {lead.contact_person}
Email: {lead.email}
Phone: {lead.phone or "Not provided"}

APPOINTMENT DETAILS
Service: {appointment_details.get("title", "N/A") if appointment_details else "N/A"}
Duration: {appointment_details.get("duration", "N/A") if appointment_details else "N/A"}
Date: {appointment_details.get("date", "To be scheduled")}
Time: {appointment_details.get("time", "To be scheduled")}

{payment_info}Booking Created: {lead.created_at}
Lead ID: {lead.id}

Best regards,
Brince Solutions System
"""
    
    # Email to customer
    customer_subject = 'Appointment Confirmation - Brince Solutions'
    
    customer_message = f"""Dear {lead.contact_person},

Thank you for booking an appointment with Brince Solutions. Your appointment has been confirmed.

APPOINTMENT DETAILS
Service: {appointment_details.get("title", "Appointment") if appointment_details else "Appointment"}
Duration: {appointment_details.get("duration", "N/A") if appointment_details else "N/A"}
Date: {appointment_details.get("date", "To be scheduled")}
Time: {appointment_details.get("time", "To be scheduled")}

Our team will contact you shortly to confirm the appointment details.

If you have any questions or need to reschedule, please contact us at office@brincesolutions.com or call 02034111756.

Best regards,
Brince Solutions Team
"""
    
    try:
        # Send booking confirmations ONLY to office@brincesolutions.com
        recipients = ['office@brincesolutions.com']
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
Time: 6:00 PM - 8:00 PM GMT

Registered: {lead.created_at}
Lead ID: {lead.id}

Best regards,
Brince Solutions System
"""
    
    try:
        recipients = ['office@brincesolutions.com']
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

