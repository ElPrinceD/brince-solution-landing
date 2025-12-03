#!/bin/bash
# Update Stripe credentials on EC2 instance
# Usage: ./update-stripe-credentials.sh <secret_key> <publishable_key> <webhook_secret>

set -e

if [ $# -lt 3 ]; then
    echo "❌ Usage: $0 <stripe_secret_key> <stripe_publishable_key> <stripe_webhook_secret>"
    echo "   Example: $0 sk_live_xxx pk_live_xxx whsec_xxx"
    exit 1
fi

STRIPE_SECRET_KEY="$1"
STRIPE_PUBLISHABLE_KEY="$2"
STRIPE_WEBHOOK_SECRET="$3"

INSTANCE_IP="98.94.179.168"
KEY_FILE="brince-solutions-key.pem"
DOMAIN="brincesolutions.com"

echo "🔐 Updating Stripe credentials on EC2 instance..."

# Update backend .env file
echo "📝 Updating backend .env file..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@$INSTANCE_IP << EOF
    # Backup existing .env
    if [ -f /var/www/brince-backend/backend/.env ]; then
        cp /var/www/brince-backend/backend/.env /var/www/brince-backend/backend/.env.backup
    elif [ -f /var/www/brince-backend/.env ]; then
        cp /var/www/brince-backend/.env /var/www/brince-backend/.env.backup
    fi
    
    # Find backend directory
    if [ -f /var/www/brince-backend/backend/.env ]; then
        BACKEND_DIR="/var/www/brince-backend/backend"
    elif [ -f /var/www/brince-backend/.env ]; then
        BACKEND_DIR="/var/www/brince-backend"
    else
        echo "❌ Could not find backend .env file"
        exit 1
    fi
    
    # Update or add Stripe keys
    cd "\$BACKEND_DIR"
    
    # Remove existing Stripe keys
    sed -i '/^STRIPE_SECRET_KEY=/d' .env 2>/dev/null || true
    sed -i '/^STRIPE_PUBLISHABLE_KEY=/d' .env 2>/dev/null || true
    sed -i '/^STRIPE_WEBHOOK_SECRET=/d' .env 2>/dev/null || true
    
    # Add new Stripe keys
    echo "" >> .env
    echo "# Stripe Configuration" >> .env
    echo "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" >> .env
    echo "STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY" >> .env
    echo "STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET" >> .env
    
    echo "✅ Backend .env updated"
    
    # Restart Gunicorn to load new environment variables
    echo "🔄 Restarting Gunicorn..."
    sudo systemctl restart gunicorn
    sleep 2
    sudo systemctl status gunicorn --no-pager | head -5
EOF

# Rebuild frontend with Stripe publishable key
echo "🏗️  Rebuilding frontend with Stripe publishable key..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@$INSTANCE_IP << EOF
    cd /var/www/brince-frontend
    
    # Create .env.production with Stripe key
    cat > .env.production << ENVEOF
VITE_API_BASE_URL=https://${DOMAIN}/api
VITE_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
ENVEOF
    
    # Rebuild frontend
    sudo -u brince npm run build
    
    # Reload nginx
    sudo systemctl reload nginx
    
    echo "✅ Frontend rebuilt with Stripe key"
EOF

echo ""
echo "✅ Stripe credentials updated successfully!"
echo ""
echo "🔍 Verifying configuration..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@$INSTANCE_IP << EOF
    echo "Backend .env Stripe keys:"
    if [ -f /var/www/brince-backend/backend/.env ]; then
        grep "STRIPE_" /var/www/brince-backend/backend/.env | sed 's/=.*/=***/'
    elif [ -f /var/www/brince-backend/.env ]; then
        grep "STRIPE_" /var/www/brince-backend/.env | sed 's/=.*/=***/'
    fi
    
    echo ""
    echo "Frontend .env.production:"
    if [ -f /var/www/brince-frontend/.env.production ]; then
        grep "VITE_STRIPE" /var/www/brince-frontend/.env.production | sed 's/=.*/=***/'
    fi
    
    echo ""
    echo "Service status:"
    sudo systemctl is-active gunicorn && echo "✅ Gunicorn is running" || echo "❌ Gunicorn is not running"
    sudo systemctl is-active nginx && echo "✅ Nginx is running" || echo "❌ Nginx is not running"
EOF

echo ""
echo "🌐 Your site should now work with Stripe!"
echo "   Frontend: https://${DOMAIN}"
echo "   Backend API: https://${DOMAIN}/api/"






