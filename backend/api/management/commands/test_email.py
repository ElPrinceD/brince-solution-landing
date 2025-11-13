"""
Django management command to test email sending with GoDaddy SMTP
Usage: python manage.py test_email [recipient_email]
"""
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings
import sys


class Command(BaseCommand):
    help = 'Test email sending with GoDaddy SMTP configuration'

    def add_arguments(self, parser):
        parser.add_argument(
            'recipient',
            nargs='?',
            type=str,
            default='admin@brincesolutions.com',
            help='Recipient email address (default: admin@brincesolutions.com)'
        )

    def handle(self, *args, **options):
        recipient = options['recipient']
        
        # Display current email configuration
        self.stdout.write(self.style.SUCCESS('\n=== Email Configuration ==='))
        self.stdout.write(f'SMTP Host: {settings.EMAIL_HOST}')
        self.stdout.write(f'SMTP Port: {settings.EMAIL_PORT}')
        self.stdout.write(f'Use TLS: {settings.EMAIL_USE_TLS}')
        self.stdout.write(f'Use SSL: {settings.EMAIL_USE_SSL}')
        self.stdout.write(f'From Email: {settings.EMAIL_HOST_USER}')
        self.stdout.write(f'Default From: {settings.DEFAULT_FROM_EMAIL}')
        self.stdout.write(f'Recipient: {recipient}')
        self.stdout.write('')
        
        # Check if email credentials are set
        if not settings.EMAIL_HOST_USER:
            self.stdout.write(self.style.ERROR('ERROR: EMAIL_HOST_USER is not set in environment variables!'))
            self.stdout.write(self.style.WARNING('Please set EMAIL_HOST_USER in your .env file'))
            sys.exit(1)
        
        if not settings.EMAIL_HOST_PASSWORD:
            self.stdout.write(self.style.ERROR('ERROR: EMAIL_HOST_PASSWORD is not set in environment variables!'))
            self.stdout.write(self.style.WARNING('Please set EMAIL_HOST_PASSWORD in your .env file'))
            sys.exit(1)
        
        # Test email sending
        self.stdout.write(self.style.WARNING('Attempting to send test email...'))
        
        # Test connection first
        try:
            from django.core.mail import get_connection
            self.stdout.write('Testing SMTP connection...')
            connection = get_connection()
            connection.open()
            self.stdout.write(self.style.SUCCESS('✓ Connection opened successfully'))
            connection.close()
        except Exception as conn_error:
            self.stdout.write(self.style.ERROR(f'✗ Connection test failed: {str(conn_error)}'))
            self.stdout.write(self.style.WARNING('This might indicate a network or configuration issue'))
            self.stdout.write('')
        
        try:
            self.stdout.write('Attempting to send email...')
            send_mail(
                subject='Test Email from Brince Solutions - GoDaddy SMTP',
                message=f"""
This is a test email from Brince Solutions backend.

If you receive this email, it means the GoDaddy SMTP configuration is working correctly!

Email Configuration:
- SMTP Host: {settings.EMAIL_HOST}
- SMTP Port: {settings.EMAIL_PORT}
- TLS Enabled: {settings.EMAIL_USE_TLS}
- SSL Enabled: {settings.EMAIL_USE_SSL}

Best regards,
Brince Solutions Backend
                """.strip(),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[recipient],
                fail_silently=False,
            )
            
            self.stdout.write(self.style.SUCCESS('\n✅ SUCCESS! Email sent successfully!'))
            self.stdout.write(self.style.SUCCESS(f'Check the inbox for: {recipient}'))
            self.stdout.write('')
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'\n❌ ERROR: Failed to send email'))
            self.stdout.write(self.style.ERROR(f'Error details: {str(e)}'))
            self.stdout.write('')
            self.stdout.write(self.style.WARNING('Troubleshooting tips:'))
            self.stdout.write('1. Verify EMAIL_HOST_USER and EMAIL_HOST_PASSWORD in .env file')
            self.stdout.write('2. Check if your GoDaddy email account credentials are correct')
            self.stdout.write('3. Try port 465 with SSL if port 587 with TLS doesn\'t work')
            self.stdout.write('4. Check GoDaddy email account settings and ensure SMTP is enabled')
            self.stdout.write('')
            import traceback
            traceback.print_exc()
            sys.exit(1)

