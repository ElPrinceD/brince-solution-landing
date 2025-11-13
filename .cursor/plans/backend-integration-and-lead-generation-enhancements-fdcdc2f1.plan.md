<!-- fdcdc2f1-f145-4a02-9f2e-2bded682fd93 e3ffbc77-b0d1-4e25-af30-80183a16756d -->
# Deploy to AWS EC2 - Complete Setup

## Overview

Deploy the Brince Solutions full-stack application to a single AWS EC2 instance with nginx reverse proxy, SSL certificates, and domain configuration.

## Architecture

- Single EC2 instance (Ubuntu 22.04 LTS)
- Nginx as reverse proxy (serves frontend static files + proxies API to Django)
- Django backend with Gunicorn (systemd service)
- PostgreSQL database (or SQLite for simplicity)
- SSL certificates via Let's Encrypt (Certbot)
- Domain: brincesolutions.com → EC2 public IP

## Deployment Steps

### 1. EC2 Instance Setup

- Create EC2 instance (t3.small or t3.medium recommended)
- Ubuntu 22.04 LTS AMI
- Configure security groups:
- HTTP (80) from anywhere
- HTTPS (443) from anywhere
- SSH (22) from your IP
- Custom TCP 8000 (Django) from localhost only
- Create/use key pair for SSH access
- Allocate Elastic IP (optional but recommended)

### 2. Server Configuration Scripts

Create deployment scripts:

- `deploy/setup-server.sh` - Initial server setup (updates, user creation, basic tools)
- `deploy/install-dependencies.sh` - Install Node.js, Python, nginx, PostgreSQL
- `deploy/deploy-backend.sh` - Deploy Django backend
- `deploy/deploy-frontend.sh` - Build and deploy React frontend
- `deploy/configure-nginx.sh` - Nginx configuration
- `deploy/setup-ssl.sh` - SSL certificate setup with Certbot
- `deploy/start-services.sh` - Start systemd services

### 3. Backend Deployment

- Clone repository to `/var/www/brince-backend`
- Create virtual environment
- Install Python dependencies
- Set up environment variables (`.env` file)
- Run migrations
- Create systemd service for Gunicorn
- Configure Gunicorn to run on localhost:8000

### 4. Frontend Deployment

- Clone repository to `/var/www/brince-frontend`
- Install Node.js dependencies
- Build production bundle (`npm run build`)
- Configure nginx to serve static files from `dist/`
- Update API base URL to use domain instead of localhost

### 5. Nginx Configuration

- Frontend: Serve static files from `/var/www/brince-frontend/dist`
- Backend API: Proxy `/api/*` to `http://127.0.0.1:8000`
- Admin: Proxy `/admin/*` to `http://127.0.0.1:8000`
- Webhook: Proxy `/api/payments/webhook/` to `http://127.0.0.1:8000`
- SSL redirect (HTTP → HTTPS)
- Security headers

### 6. SSL Certificate Setup

- Install Certbot
- Configure nginx for Let's Encrypt
- Obtain SSL certificate for brincesolutions.com
- Auto-renewal setup

### 7. Domain Configuration

- Update DNS A record for brincesolutions.com to point to EC2 Elastic IP
- Update DNS A record for www.brincesolutions.com (optional)
- Wait for DNS propagation

### 8. Environment Variables

- Backend `.env` file with production settings:
- SECRET_KEY
- DEBUG=False
- ALLOWED_HOSTS=brincesolutions.com,www.brincesolutions.com
- Database configuration
- Email settings
- Stripe keys
- Frontend build-time environment variables

### 9. Process Management

- Systemd service for Gunicorn (Django)
- Systemd service for nginx
- Auto-restart on failure
- Log management

### 10. Security Hardening

- Firewall configuration (UFW)
- Fail2ban setup
- Regular security updates
- Secure file permissions

## Files to Create/Modify

### New Files

- `deploy/setup-server.sh` - Initial server setup
- `deploy/install-dependencies.sh` - Install all required software
- `deploy/deploy-backend.sh` - Backend deployment script
- `deploy/deploy-frontend.sh` - Frontend deployment script
- `deploy/configure-nginx.sh` - Nginx configuration
- `deploy/setup-ssl.sh` - SSL certificate setup
- `deploy/nginx.conf` - Nginx server configuration template
- `deploy/gunicorn.service` - Systemd service file for Gunicorn
- `deploy/.env.production.example` - Production environment template
- `DEPLOYMENT.md` - Deployment documentation

### Modified Files

- `vite.config.ts` - Update base path for production
- `src/utils/api.ts` - Update API_BASE_URL for production
- `backend/brince_backend/settings.py` - Production settings (static files, security)
- `.gitignore` - Add deployment scripts if needed

## Post-Deployment Tasks

- Update Stripe webhook URL to `https://brincesolutions.com/api/payments/webhook/`
- Test all functionality (forms, payments, emails)
- Set up monitoring/logging
- Configure backups
- Document deployment process

## Rollback Plan

- Keep previous deployments in versioned directories
- Quick rollback via nginx configuration change
- Database backup before migrations