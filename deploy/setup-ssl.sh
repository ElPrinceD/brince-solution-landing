#!/bin/bash
# Setup SSL certificate with Let's Encrypt
# Run this as root or with sudo

set -e

DOMAIN="${1:-brincesolutions.com}"
EMAIL="${2:-admin@brincesolutions.com}"

echo "🔒 Setting up SSL certificate..."

# Ensure nginx is configured first
if [ ! -f /etc/nginx/sites-available/brincesolutions ]; then
    echo "❌ Nginx configuration not found. Please run configure-nginx.sh first."
    exit 1
fi

# Obtain SSL certificate
echo "📜 Obtaining SSL certificate from Let's Encrypt..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "$EMAIL" --redirect

# Test auto-renewal
echo "🔄 Testing certificate auto-renewal..."
certbot renew --dry-run

# Setup auto-renewal cron job (certbot usually does this automatically, but let's ensure it)
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    echo "0 0,12 * * * certbot renew --quiet" | crontab -
    echo "✅ Auto-renewal cron job added"
fi

echo "✅ SSL certificate setup complete!"
echo "🌐 Your site should now be accessible at https://${DOMAIN}"

