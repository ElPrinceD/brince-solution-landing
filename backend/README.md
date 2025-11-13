# Brince Solutions Backend

Django REST Framework backend for Brince Solutions landing page.

## Setup Instructions

1. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the project root
   - Fill in all required values:
     - `SECRET_KEY`: Django secret key (generate with `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`)
     - `EMAIL_HOST_USER`: Your SMTP email address
     - `EMAIL_HOST_PASSWORD`: Your SMTP app password
     - `STRIPE_SECRET_KEY`: Your Stripe secret key
     - `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
     - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser:**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

- `POST /api/leads/` - Submit a lead form
- `POST /api/payments/create-intent/` - Create a Stripe payment intent
- `POST /api/payments/webhook/` - Stripe webhook endpoint

## Frontend Configuration

Set the following environment variables in your frontend `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Stripe Webhook Setup

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/payments/webhook/`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook signing secret to your `.env` file

## Email Configuration

The backend is configured to use GoDaddy SMTP by default.

### GoDaddy SMTP Settings:
- **SMTP Server**: `smtpout.secureserver.net`
- **Port**: `587` (TLS - recommended) or `465` (SSL - alternative)
- **TLS**: Enabled for port 587
- **SSL**: Available for port 465 (if TLS doesn't work)

### Environment Variables:
Set the following in your `.env` file:
```env
EMAIL_HOST=smtpout.secureserver.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
EMAIL_HOST_USER=your-email@brincesolutions.com
EMAIL_HOST_PASSWORD=your-email-password
DEFAULT_FROM_EMAIL=it@brincesolutions.com
```

**Note**: Use your full GoDaddy email address and password for `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD`.

For other providers, adjust `EMAIL_HOST` and `EMAIL_PORT` accordingly.

