#!/usr/bin/env python3
"""
Direct SMTP test script to verify GoDaddy SMTP connection
This bypasses Django to test the raw SMTP connection
"""
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

# Get credentials from environment
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtpout.secureserver.net')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', '587'))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_USE_SSL = os.getenv('EMAIL_USE_SSL', 'False') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
RECIPIENT = os.getenv('TEST_EMAIL_RECIPIENT', 'admin@brincesolutions.com')

print(f"\n=== Direct SMTP Test ===")
print(f"SMTP Host: {EMAIL_HOST}")
print(f"SMTP Port: {EMAIL_PORT}")
print(f"Use TLS: {EMAIL_USE_TLS}")
print(f"Use SSL: {EMAIL_USE_SSL}")
print(f"From: {EMAIL_HOST_USER}")
print(f"To: {RECIPIENT}")
print(f"Password length: {len(EMAIL_HOST_PASSWORD) if EMAIL_HOST_PASSWORD else 0} characters")
print()

if not EMAIL_HOST_USER or not EMAIL_HOST_PASSWORD:
    print("ERROR: EMAIL_HOST_USER or EMAIL_HOST_PASSWORD not set!")
    exit(1)

try:
    # Create message
    msg = MIMEMultipart()
    msg['From'] = EMAIL_HOST_USER
    msg['To'] = RECIPIENT
    msg['Subject'] = "Test Email - Direct SMTP Test"
    
    body = """
This is a direct SMTP test email from Brince Solutions.

If you receive this, the GoDaddy SMTP connection is working!
    """
    msg.attach(MIMEText(body, 'plain'))
    
    # Connect and send
    print("Connecting to SMTP server...")
    
    if EMAIL_USE_SSL:
        # SSL connection (port 465)
        print("Using SSL connection...")
        context = ssl.create_default_context()
        server = smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT, context=context)
    else:
        # TLS connection (port 587)
        print("Using TLS connection...")
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        if EMAIL_USE_TLS:
            server.starttls()
    
    print("Connected! Attempting to login...")
    server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    print("Login successful! Sending email...")
    
    text = msg.as_string()
    server.sendmail(EMAIL_HOST_USER, RECIPIENT, text)
    server.quit()
    
    print("\n✅ SUCCESS! Email sent successfully!")
    print(f"Check the inbox for: {RECIPIENT}")
    
except smtplib.SMTPAuthenticationError as e:
    print(f"\n❌ AUTHENTICATION ERROR: {e}")
    print("\nPossible issues:")
    print("1. Incorrect email address or password")
    print("2. SMTP authentication not enabled in GoDaddy")
    print("3. Account might be locked or suspended")
    
except smtplib.SMTPConnectError as e:
    print(f"\n❌ CONNECTION ERROR: {e}")
    print("\nPossible issues:")
    print("1. Firewall blocking the connection")
    print("2. Incorrect SMTP host or port")
    print("3. Network connectivity issues")
    
except Exception as e:
    print(f"\n❌ ERROR: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()

