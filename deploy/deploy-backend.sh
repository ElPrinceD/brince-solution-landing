#!/bin/bash
# Deploy Django backend
# Run this as the brince user or with sudo -u brince

set -e

APP_DIR="/var/www/brince-backend"
REPO_URL="${1:-https://github.com/YOUR_USERNAME/YOUR_REPO.git}"
BRANCH="${2:-main}"

echo "🚀 Deploying Django backend..."

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    echo "📥 Updating repository..."
    cd "$APP_DIR"
    git fetch origin
    git reset --hard "origin/$BRANCH"
else
    echo "📥 Cloning repository..."
    rm -rf "$APP_DIR"
    git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# Create virtual environment if it doesn't exist
if [ ! -d "$APP_DIR/venv" ]; then
    echo "🐍 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
echo "📦 Installing Python dependencies..."
source venv/bin/activate
pip install --upgrade pip

# Find requirements.txt (could be in backend/ or root)
REQUIREMENTS_FILE=""
BACKEND_DIR=""

# Check common locations
if [ -f "$APP_DIR/backend/requirements.txt" ]; then
    REQUIREMENTS_FILE="$APP_DIR/backend/requirements.txt"
    BACKEND_DIR="$APP_DIR/backend"
    echo "   📍 Found requirements.txt in backend/: $REQUIREMENTS_FILE"
elif [ -f "$APP_DIR/requirements.txt" ]; then
    REQUIREMENTS_FILE="$APP_DIR/requirements.txt"
    # Check if manage.py is in root or subdirectory
    if [ -f "$APP_DIR/manage.py" ]; then
        BACKEND_DIR="$APP_DIR"
        echo "   📍 Found requirements.txt in root: $REQUIREMENTS_FILE"
    else
        # Find manage.py
        MANAGE_PY=$(find "$APP_DIR" -maxdepth 3 -name "manage.py" -type f | head -1)
        if [ -n "$MANAGE_PY" ]; then
            BACKEND_DIR=$(dirname "$MANAGE_PY")
            echo "   📍 Found manage.py in: $BACKEND_DIR"
        else
            BACKEND_DIR="$APP_DIR"
        fi
    fi
else
    # Search for requirements.txt
    REQUIREMENTS_FILE=$(find "$APP_DIR" -maxdepth 3 -name "requirements.txt" -type f | head -1)
    if [ -n "$REQUIREMENTS_FILE" ]; then
        BACKEND_DIR=$(dirname "$REQUIREMENTS_FILE")
        echo "   📍 Found requirements.txt via search: $REQUIREMENTS_FILE"
    else
        echo "❌ Could not find requirements.txt"
        echo "   Searched in: $APP_DIR"
        echo "   Directory contents:"
        ls -la "$APP_DIR" | head -20
        echo "   Looking for backend folder:"
        ls -la "$APP_DIR/backend" 2>/dev/null || echo "   Backend folder not found"
        exit 1
    fi
fi

echo "   📍 Using backend directory: $BACKEND_DIR"

pip install -r "$REQUIREMENTS_FILE"

# Create .env file if it doesn't exist
if [ ! -f "$BACKEND_DIR/.env" ]; then
    echo "⚠️  Creating .env file from template..."
    if [ -f "$APP_DIR/deploy/.env.production.example" ]; then
        cp "$APP_DIR/deploy/.env.production.example" "$BACKEND_DIR/.env"
    elif [ -f "$APP_DIR/../deploy/.env.production.example" ]; then
        cp "$APP_DIR/../deploy/.env.production.example" "$BACKEND_DIR/.env"
    else
        echo "⚠️  .env.production.example not found, creating basic .env file"
        touch "$BACKEND_DIR/.env"
    fi
    echo "⚠️  Please update $BACKEND_DIR/.env with your production values!"
fi

# Run migrations
echo "🗄️  Running database migrations..."
cd "$BACKEND_DIR"
python manage.py migrate --noinput

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput --clear

# Create logs directory
mkdir -p "$BACKEND_DIR/logs"
chmod 755 "$BACKEND_DIR/logs"

echo "✅ Backend deployment complete!"
