# Setup Complete! ✅

All dependencies have been installed and the project is ready to use.

## What's Been Done

1. ✅ **Frontend Dependencies**: Installed all npm packages including Stripe integration
2. ✅ **Backend Dependencies**: Installed all Python packages in virtual environment
3. ✅ **Django Migrations**: Created and applied all database migrations
4. ✅ **Environment Files**: Created `.env` files for both frontend and backend

## Configuration Required

### Backend Configuration (`backend/.env`)

You need to update the following values in `backend/.env`:

```env
# Email Configuration (SMTP)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@brincesolutions.com

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Note**: A Django SECRET_KEY has already been generated in your `.env` file.

### Frontend Configuration (`.env`)

Update the following in your root `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## Running the Application

### Start Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### Start Frontend Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Create Admin User

To access the Django admin panel:

```bash
cd backend
source venv/bin/activate
python manage.py createsuperuser
```

Then visit `http://localhost:8000/admin` to manage leads and payments.

## API Endpoints

- `POST /api/leads/` - Submit lead form
- `POST /api/payments/create-intent/` - Create Stripe payment intent
- `POST /api/payments/webhook/` - Stripe webhook endpoint

## Stripe Webhook Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) > Developers > Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-domain.com/api/payments/webhook/`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `backend/.env`

## Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password as `EMAIL_HOST_PASSWORD` in `backend/.env`

## Testing

Once configured, you can test:
- Lead form submission on the homepage popup
- Contact form on the contact page
- Stripe payment integration (use test mode keys)

All forms will now send emails via SMTP and store data in the Django database!

