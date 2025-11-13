#!/bin/bash
# Deploy application to AWS EC2 instance
# Usage: ./deploy-to-aws.sh <EC2_IP_OR_ELASTIC_IP> [KEY_FILE]

set -e

if [ -z "$1" ]; then
    echo "❌ Usage: $0 <EC2_IP_OR_ELASTIC_IP> [KEY_FILE]"
    echo "   Example: $0 54.123.45.67 brince-solutions-key.pem"
    exit 1
fi

EC2_IP="$1"
KEY_FILE="${2:-brince-solutions-key.pem}"
DOMAIN="brincesolutions.com"

# Get repository URL from git remote or environment variable
if [ -z "$GITHUB_REPO_URL" ]; then
    SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
    if [ -d "$PROJECT_ROOT/.git" ]; then
        REPO_URL=$(cd "$PROJECT_ROOT" && git remote get-url origin 2>/dev/null || echo "")
        if [ -z "$REPO_URL" ]; then
            REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO.git"
            echo "⚠️  Warning: Could not detect git remote. Using default: $REPO_URL"
            echo "   Set GITHUB_REPO_URL environment variable to override"
        else
            # Convert SSH URL to HTTPS if needed
            if [[ "$REPO_URL" == git@github.com:* ]]; then
                REPO_URL=$(echo "$REPO_URL" | sed 's|git@github.com:|https://github.com/|' | sed 's|\.git$|.git|')
                echo "✅ Converted SSH URL to HTTPS: $REPO_URL"
            else
                echo "✅ Detected git repository: $REPO_URL"
            fi
        fi
    else
        REPO_URL="${GITHUB_REPO_URL:-https://github.com/YOUR_USERNAME/YOUR_REPO.git}"
        echo "⚠️  Warning: Not a git repository. Using default: $REPO_URL"
        echo "   Set GITHUB_REPO_URL environment variable to override"
    fi
else
    REPO_URL="$GITHUB_REPO_URL"
    echo "✅ Using repository from GITHUB_REPO_URL: $REPO_URL"
fi

BRANCH="${GITHUB_BRANCH:-main}"

echo "🚀 Deploying to AWS EC2 instance: $EC2_IP"

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Key file not found: $KEY_FILE"
    exit 1
fi

chmod 400 "$KEY_FILE"

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "📦 Preparing deployment package..."

# Create temporary directory for deployment files
TEMP_DIR=$(mktemp -d)
DEPLOY_DIR="$TEMP_DIR/deploy"

# Copy deployment scripts
mkdir -p "$DEPLOY_DIR"
cp -r "$SCRIPT_DIR"/*.sh "$DEPLOY_DIR/"
cp "$SCRIPT_DIR"/*.service "$DEPLOY_DIR/" 2>/dev/null || true
cp "$SCRIPT_DIR"/.env.production.example "$DEPLOY_DIR/" 2>/dev/null || true

# Make scripts executable
chmod +x "$DEPLOY_DIR"/*.sh

echo "📤 Uploading deployment files to EC2..."

# Upload deployment scripts
scp -i "$KEY_FILE" -o StrictHostKeyChecking=no -r "$DEPLOY_DIR" ubuntu@"$EC2_IP":~/deploy

# Cleanup temp directory
rm -rf "$TEMP_DIR"

echo "✅ Files uploaded"

# Wait a moment for files to settle
sleep 2

echo "🔧 Running deployment on EC2..."

# Run deployment remotely
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no ubuntu@"$EC2_IP" << EOF
set -e

echo "🚀 Starting deployment process..."

# Step 1: Initial server setup
echo "📦 Step 1/7: Initial server setup..."
cd ~/deploy
sudo ./setup-server.sh

# Step 2: Install dependencies
echo "📦 Step 2/7: Installing dependencies..."
sudo ./install-dependencies.sh

# Step 3: Deploy backend
echo "📦 Step 3/7: Deploying backend..."
sudo -u brince ./deploy-backend.sh "$REPO_URL" "$BRANCH"

# Step 4: Deploy frontend
echo "📦 Step 4/7: Deploying frontend..."
sudo -u brince ./deploy-frontend.sh "$REPO_URL" "$BRANCH" "$DOMAIN"

# Step 5: Configure nginx
echo "📦 Step 5/7: Configuring nginx..."
sudo ./configure-nginx.sh "$DOMAIN"

# Step 6: Setup SSL (will prompt for email if needed)
echo "📦 Step 6/7: Setting up SSL certificate..."
echo "⚠️  Note: SSL setup requires DNS to be configured first"
echo "   If DNS is not ready, you can run this later:"
echo "   sudo ./setup-ssl.sh $DOMAIN admin@$DOMAIN"

# Step 7: Start services
echo "📦 Step 7/7: Starting services..."
cd /var/www/brince-backend
sudo cp ~/deploy/start-services.sh .
sudo chmod +x start-services.sh
sudo ./start-services.sh

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update DNS A record for $DOMAIN to point to: $EC2_IP"
echo "   2. Wait for DNS propagation (5-30 minutes)"
echo "   3. Run SSL setup:"
echo "      ssh -i $KEY_FILE ubuntu@$EC2_IP"
echo "      cd ~/deploy"
echo "      sudo ./setup-ssl.sh $DOMAIN admin@$DOMAIN"
echo "   4. Configure backend .env file:"
echo "      sudo nano /var/www/brince-backend/backend/.env"
echo "   5. Restart services:"
echo "      sudo systemctl restart brince-backend"
echo ""
EOF

echo ""
echo "✅ Deployment script executed!"
echo ""
echo "📋 Important:"
echo "   1. Configure backend environment variables:"
echo "      ssh -i $KEY_FILE ubuntu@$EC2_IP"
echo "      sudo nano /var/www/brince-backend/backend/.env"
echo ""
echo "   2. After DNS is configured, setup SSL:"
echo "      ssh -i $KEY_FILE ubuntu@$EC2_IP"
echo "      cd ~/deploy && sudo ./setup-ssl.sh $DOMAIN admin@$DOMAIN"
echo ""

