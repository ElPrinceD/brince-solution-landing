#!/bin/bash
# Deploy React frontend
# Run this as the brince user or with sudo -u brince

set -e

APP_DIR="/var/www/brince-frontend"
REPO_URL="${1:-https://github.com/YOUR_USERNAME/YOUR_REPO.git}"
BRANCH="${2:-main}"
DOMAIN="${3:-brincesolutions.com}"

echo "🚀 Deploying React frontend..."

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    echo "📥 Updating repository..."
    cd "$APP_DIR"
    git fetch origin
    git reset --hard "origin/$BRANCH"
else
    echo "📥 Cloning repository..."
    git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm ci --legacy-peer-deps

# Create production .env file
echo "📝 Creating production environment file..."
cat > "$APP_DIR/.env.production" << EOF
VITE_API_BASE_URL=https://${DOMAIN}/api
VITE_STRIPE_PUBLISHABLE_KEY=\${STRIPE_PUBLISHABLE_KEY}
EOF

# Build production bundle
echo "🏗️  Building production bundle..."
CUSTOM_DOMAIN=true npm run build

# Set proper permissions
chown -R brince:brince "$APP_DIR"
chmod -R 755 "$APP_DIR/dist"

echo "✅ Frontend deployment complete!"

