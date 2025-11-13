#!/bin/bash
# Start all services
# Run this as root or with sudo

set -e

echo "🚀 Starting services..."

# Copy systemd service file
echo "📋 Installing Gunicorn service..."
cp deploy/gunicorn.service /etc/systemd/system/brince-backend.service
systemctl daemon-reload

# Enable and start Gunicorn
echo "🔄 Starting Gunicorn..."
systemctl enable brince-backend
systemctl restart brince-backend

# Enable and start nginx
echo "🌐 Starting nginx..."
systemctl enable nginx
systemctl restart nginx

# Check service status
echo "📊 Service status:"
systemctl status brince-backend --no-pager -l
systemctl status nginx --no-pager -l

echo "✅ All services started!"

