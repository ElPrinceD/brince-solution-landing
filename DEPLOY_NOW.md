# Deployment Instructions

## All Changes Committed ✅

All code changes have been committed and pushed to GitHub:
- ✅ Booking emails now send ONLY to sales@brincesolutions.com
- ✅ Job application form with CV upload added
- ✅ Free webinar announcement added
- ✅ Date/time picker for bookings (Mon-Fri, 9am-5pm)
- ✅ Background images for benefit cards

## Deploy When EC2 is Available

When the EC2 instance is accessible, run these commands:

### Option 1: Use the deployment script
```bash
cd /Users/prince/Desktop/projects/brinces/brince_landing_page
./deploy/deploy-all.sh
```

### Option 2: Manual deployment commands

**Backend:**
```bash
ssh -i deploy/brince-solutions-key.pem ubuntu@98.94.179.168
cd /var/www/brince-backend
sudo -u brince git pull origin main
cd backend
sudo -u brince ../venv/bin/pip install -q requests
sudo -u brince ../venv/bin/python manage.py migrate --noinput
sudo systemctl restart brince-backend
```

**Frontend:**
```bash
ssh -i deploy/brince-solutions-key.pem ubuntu@98.94.179.168
cd /var/www/brince-frontend
sudo -u brince git pull origin main
sudo -u brince npm ci --legacy-peer-deps
sudo -u brince npm run build
sudo systemctl reload nginx
```

## Verify Credentials on Server

After deployment, verify these are set in `/var/www/brince-backend/backend/.env`:

```bash
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_HOST_USER=admin@brincesolutions.com
EMAIL_HOST_PASSWORD=mjyplpnjbvmrjrzq
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51SRz7yHlmo3ECKx97ixUJpyCTCqhKApRGvpv2DkqpUM0oRo4k3xzREw8Gvc3juQ4jN3J68DTlkpxMNCQoselC4DH00NCsCS82C
STRIPE_WEBHOOK_SECRET=whsec_DuxK6anKJTpvBy5GsIYuoRoleg1yvFbL
ALLOWED_HOSTS=localhost,127.0.0.1,brincesolutions.com,www.brincesolutions.com
```

And in `/var/www/brince-frontend/.env.production`:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51SRz7yHlmo3ECKx97ixUJpyCTCqhKApRGvpv2DkqpUM0oRo4k3xzREw8Gvc3juQ4jN3J68DTlkpxMNCQoselC4DH00NCsCS82C
```

## Test After Deployment

1. **Test Booking:**
   - Go to https://brincesolutions.com
   - Book an appointment
   - Check that email goes to sales@brincesolutions.com only

2. **Test Job Application:**
   - Go to https://brincesolutions.com/#/careers
   - Fill out application form with CV
   - Verify email with CV attachment goes to sales@brincesolutions.com

3. **Check Logs:**
   ```bash
   sudo journalctl -u brince-backend --since '10 minutes ago' | grep -i "sales\|email\|booking"
   ```

