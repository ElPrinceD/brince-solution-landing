#!/bin/bash
# Quick Deploy - Copy and paste these commands when SSH is available

ssh -i deploy/brince-solutions-key.pem ubuntu@98.94.179.168 << 'DEPLOY'
# Backend
cd /var/www/brince-backend && sudo -u brince git pull origin main
cd backend && sudo -u brince ../venv/bin/pip install -q requests
sudo -u brince ../venv/bin/python manage.py migrate --noinput
sudo systemctl restart brince-backend

# Frontend  
cd /var/www/brince-frontend && sudo -u brince git pull origin main
sudo -u brince npm ci --legacy-peer-deps && sudo -u brince npm run build
sudo systemctl reload nginx

echo "✅ Deployment complete!"
DEPLOY
