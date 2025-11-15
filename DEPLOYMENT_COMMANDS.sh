#!/bin/bash
# Deployment Commands for Brince Solutions
# Run these commands when SSH access is available

EC2_IP="98.94.179.168"
KEY_FILE="deploy/brince-solutions-key.pem"

echo "🚀 Deploying Brince Solutions to EC2..."

# Deploy Backend
echo ""
echo "📦 Step 1: Deploying Backend..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@"$EC2_IP" << 'EOF'
cd /var/www/brince-backend
sudo -u brince git pull origin main
cd backend
sudo -u brince ../venv/bin/pip install -q requests
sudo -u brince ../venv/bin/python manage.py migrate --noinput
sudo systemctl restart brince-backend
sleep 2
sudo systemctl status brince-backend --no-pager | head -8
echo "✅ Backend deployed"
EOF

# Deploy Frontend
echo ""
echo "📦 Step 2: Deploying Frontend..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@"$EC2_IP" << 'EOF'
cd /var/www/brince-frontend
sudo -u brince git pull origin main
sudo -u brince npm ci --legacy-peer-deps
sudo -u brince npm run build
sudo systemctl reload nginx
echo "✅ Frontend deployed"
EOF

# Verify Credentials
echo ""
echo "📋 Step 3: Verifying Credentials..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@"$EC2_IP" << 'EOF'
echo "Backend .env:"
cat /var/www/brince-backend/backend/.env | grep -E 'EMAIL_HOST|STRIPE_SECRET_KEY|ALLOWED_HOSTS' | head -3
echo ""
echo "Frontend .env.production:"
cat /var/www/brince-frontend/.env.production | grep STRIPE
EOF

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🧪 Testing:"
echo "1. Visit: https://brincesolutions.com"
echo "2. Test booking: https://brincesolutions.com/#/services"
echo "3. Test careers: https://brincesolutions.com/#/careers"
echo "4. Check logs: ssh -i $KEY_FILE ubuntu@$EC2_IP 'sudo journalctl -u brince-backend --since \"5 minutes ago\" | grep -i email'"

