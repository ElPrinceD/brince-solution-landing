# AWS EC2 Deployment Guide

Complete guide for deploying Brince Solutions to AWS EC2.

## Prerequisites

- AWS account with EC2 access
- AWS CLI installed and configured (`aws configure`)
- Domain name (brincesolutions.com) with DNS access
- GitHub repository access (or code repository)

## Quick Start (Automated)

The easiest way to deploy is using the automated scripts:

```bash
cd deploy
chmod +x *.sh

# Option 1: Complete automated deployment (recommended)
./aws-complete-deploy.sh

# Option 2: Step by step
./aws-setup.sh          # Creates EC2 instance
./deploy-to-aws.sh <IP> # Deploys application
```

The automated scripts will:
- Create EC2 instance with proper configuration
- Set up security groups
- Allocate Elastic IP
- Upload and run all deployment scripts
- Configure nginx, SSL, and services

## Manual Deployment

If you prefer manual setup or need more control:

## Step 1: Create EC2 Instance

1. **Launch EC2 Instance:**
   - Go to AWS Console → EC2 → Launch Instance
   - Name: `brince-solutions-production`
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t3.small or t3.medium (minimum 2GB RAM)
   - Key pair: Create new or use existing
   - Network settings:
     - Allow SSH (port 22) from your IP
     - Allow HTTP (port 80) from anywhere
     - Allow HTTPS (port 443) from anywhere
   - Storage: 20GB minimum

2. **Allocate Elastic IP (Recommended):**
   - EC2 → Elastic IPs → Allocate Elastic IP
   - Associate with your instance

3. **Note your instance details:**
   - Public IP or Elastic IP
   - SSH key file location

## Step 2: Initial Server Setup

1. **Connect to your EC2 instance:**
   ```bash
   ssh -i /path/to/your-key.pem ubuntu@YOUR_EC2_IP
   ```

2. **Upload deployment scripts:**
   ```bash
   # From your local machine
   scp -r -i /path/to/your-key.pem deploy/ ubuntu@YOUR_EC2_IP:~/
   ```

3. **Run initial server setup:**
   ```bash
   # On EC2 instance
   cd ~/deploy
   chmod +x *.sh
   sudo ./setup-server.sh
   ```

4. **Install dependencies:**
   ```bash
   sudo ./install-dependencies.sh
   ```

## Step 3: Configure Domain DNS

1. **Update DNS A records:**
   - Go to your domain registrar's DNS settings
   - Add/Update A record:
     - Name: `@` (or blank)
     - Value: Your EC2 Elastic IP
     - TTL: 300
   - Add/Update A record for www:
     - Name: `www`
     - Value: Your EC2 Elastic IP
     - TTL: 300

2. **Wait for DNS propagation** (can take up to 48 hours, usually 5-30 minutes)

## Step 4: Deploy Backend

1. **Clone repository:**
   ```bash
   sudo -u brince ./deploy-backend.sh https://github.com/YOUR_USERNAME/YOUR_REPO.git main
   ```

2. **Configure environment variables:**
   ```bash
   sudo nano /var/www/brince-backend/backend/.env
   # Update all values (SECRET_KEY, database, email, Stripe keys, etc.)
   ```

3. **Create superuser (optional):**
   ```bash
   sudo -u brince bash
   cd /var/www/brince-backend/backend
   source ../venv/bin/activate
   python manage.py createsuperuser
   exit
   ```

## Step 5: Deploy Frontend

1. **Clone and build:**
   ```bash
   sudo -u brince ./deploy-frontend.sh https://github.com/YOUR_USERNAME/YOUR_REPO.git main brincesolutions.com
   ```

2. **Update Stripe publishable key in .env.production:**
   ```bash
   sudo nano /var/www/brince-frontend/.env.production
   ```

## Step 6: Configure Nginx

```bash
sudo ./configure-nginx.sh brincesolutions.com
```

## Step 7: Setup SSL Certificate

```bash
sudo ./setup-ssl.sh brincesolutions.com admin@brincesolutions.com
```

## Step 8: Start Services

```bash
cd /var/www/brince-backend
sudo ./start-services.sh
```

## Step 9: Verify Deployment

1. **Check services:**
   ```bash
   sudo systemctl status brince-backend
   sudo systemctl status nginx
   ```

2. **Check logs:**
   ```bash
   sudo tail -f /var/log/brince/gunicorn-error.log
   sudo tail -f /var/log/nginx/brincesolutions_error.log
   ```

3. **Test website:**
   - Visit: https://brincesolutions.com
   - Test API: https://brincesolutions.com/api/
   - Test admin: https://brincesolutions.com/admin/

## Step 10: Update Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Update webhook URL to: `https://brincesolutions.com/api/payments/webhook/`
3. Update webhook secret in backend `.env` file

## Maintenance

### View Logs
```bash
# Backend logs
sudo journalctl -u brince-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/brincesolutions_error.log
sudo tail -f /var/log/nginx/brincesolutions_access.log

# Django logs
sudo tail -f /var/www/brince-backend/backend/logs/django.log
```

### Restart Services
```bash
sudo systemctl restart brince-backend
sudo systemctl restart nginx
```

### Update Deployment
```bash
# Backend
cd /var/www/brince-backend
sudo -u brince git pull
sudo -u brince bash
source venv/bin/activate
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
exit
sudo systemctl restart brince-backend

# Frontend
cd /var/www/brince-frontend
sudo -u brince git pull
sudo -u brince npm ci --legacy-peer-deps
sudo -u brince CUSTOM_DOMAIN=true npm run build
sudo systemctl reload nginx
```

### Backup Database
```bash
# SQLite
sudo cp /var/www/brince-backend/backend/db.sqlite3 /backup/db-$(date +%Y%m%d).sqlite3

# PostgreSQL
sudo -u postgres pg_dump brince_db > /backup/db-$(date +%Y%m%d).sql
```

## Troubleshooting

### Service won't start
```bash
sudo systemctl status brince-backend
sudo journalctl -u brince-backend -n 50
```

### Nginx errors
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Permission issues
```bash
sudo chown -R brince:brince /var/www/brince-backend
sudo chown -R brince:brince /var/www/brince-frontend
```

### SSL certificate issues
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key-only authentication
- [ ] Fail2ban installed and configured
- [ ] SSL certificate installed
- [ ] DEBUG=False in production
- [ ] Strong SECRET_KEY
- [ ] Database credentials secure
- [ ] Regular security updates enabled
- [ ] Backups configured

