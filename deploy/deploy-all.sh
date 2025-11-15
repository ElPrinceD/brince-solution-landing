#!/bin/bash
# Deploy both frontend and backend to EC2
# Usage: ./deploy-all.sh

set -e

EC2_IP="98.94.179.168"
KEY_FILE="deploy/brince-solutions-key.pem"
GITHUB_REPO_URL="https://github.com/ElPrinceD/brince-solution-landing.git"

echo "🚀 Deploying to EC2: $EC2_IP"

# Deploy Backend
echo "📦 Deploying Backend..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no -o ConnectTimeout=30 ubuntu@"$EC2_IP" << 'BACKEND_EOF'
cd /var/www/brince-backend
sudo -u brince git pull origin main
cd backend
sudo -u brince ../venv/bin/pip install -q requests
sudo -u brince ../venv/bin/python manage.py migrate --noinput
sudo systemctl restart brince-backend
echo "✅ Backend deployed"
BACKEND_EOF

# Deploy Frontend
echo "📦 Deploying Frontend..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no -o ConnectTimeout=30 ubuntu@"$EC2_IP" << 'FRONTEND_EOF'
cd /var/www/brince-frontend
sudo -u brince git pull origin main
sudo -u brince npm ci --legacy-peer-deps
sudo -u brince npm run build
sudo systemctl reload nginx
echo "✅ Frontend deployed"
FRONTEND_EOF

echo "✅ Deployment complete!"

