#!/bin/bash
# Install all required dependencies
# Run this as root or with sudo

set -e

echo "📦 Installing dependencies..."

# Install Node.js 20.x
echo "📦 Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    echo "✅ Node.js installed: $(node --version)"
else
    echo "ℹ️  Node.js already installed: $(node --version)"
fi

# Install Python 3.10+ and pip
echo "🐍 Installing Python..."
apt-get install -y python3 python3-pip python3-venv python3-dev

# Install PostgreSQL
echo "🐘 Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

# Install nginx
echo "🌐 Installing nginx..."
apt-get install -y nginx

# Install Certbot for SSL
echo "🔒 Installing Certbot..."
apt-get install -y certbot python3-certbot-nginx

# Install additional Python build dependencies
apt-get install -y \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    libpng-dev

echo "✅ All dependencies installed!"

