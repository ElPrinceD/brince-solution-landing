#!/bin/bash
# Initial server setup script for EC2 instance
# Run this as root or with sudo

set -e

echo "🚀 Starting server setup..."

# Update system packages
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install basic tools
echo "🔧 Installing basic tools..."
apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    fail2ban \
    htop \
    nano \
    vim

# Create application user
echo "👤 Creating application user..."
if ! id "brince" &>/dev/null; then
    useradd -m -s /bin/bash brince
    usermod -aG sudo brince
    echo "✅ User 'brince' created"
else
    echo "ℹ️  User 'brince' already exists"
fi

# Create application directories
echo "📁 Creating application directories..."
mkdir -p /var/www/brince-backend
mkdir -p /var/www/brince-frontend
mkdir -p /var/log/brince
chown -R brince:brince /var/www/brince-backend
chown -R brince:brince /var/www/brince-frontend
chown -R brince:brince /var/log/brince

# Configure firewall
echo "🔥 Configuring firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

echo "✅ Server setup complete!"

