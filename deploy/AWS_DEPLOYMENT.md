# AWS CLI Automated Deployment Guide

Complete automated deployment using AWS CLI - no manual steps required!

## Prerequisites

1. **Install AWS CLI:**
   ```bash
   # macOS
   brew install awscli
   
   # Linux
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   ```

2. **Configure AWS CLI:**
   ```bash
   aws configure
   # Enter your:
   # - AWS Access Key ID
   # - AWS Secret Access Key
   # - Default region (e.g., us-east-1)
   # - Default output format (json)
   ```

3. **Set GitHub Repository (optional):**
   ```bash
   export GITHUB_REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO.git"
   export GITHUB_BRANCH="main"
   ```

## Quick Deployment

### Option 1: Complete Automated Deployment (Recommended)

This does everything in one command:

```bash
cd deploy
./aws-complete-deploy.sh
```

This script will:
1. ✅ Create EC2 instance (Ubuntu 22.04 LTS)
2. ✅ Configure security groups
3. ✅ Allocate and associate Elastic IP
4. ✅ Upload deployment files
5. ✅ Run all deployment scripts
6. ✅ Configure nginx and services

### Option 2: Step-by-Step Deployment

If you prefer more control:

```bash
cd deploy

# Step 1: Create EC2 instance
./aws-setup.sh

# Step 2: Deploy application (use IP from step 1)
./deploy-to-aws.sh <ELASTIC_IP>
```

## What Gets Created

### EC2 Instance
- **AMI:** Ubuntu 22.04 LTS
- **Instance Type:** t3.small (2 vCPU, 2GB RAM)
- **Storage:** 20GB default
- **Key Pair:** `brince-solutions-key` (created automatically)
- **Security Group:** `brince-solutions-sg` with rules:
  - SSH (22) from your IP only
  - HTTP (80) from anywhere
  - HTTPS (443) from anywhere

### Elastic IP
- Automatically allocated and associated
- Use this IP for DNS configuration

## Post-Deployment Steps

### 1. Configure Backend Environment Variables

SSH into your instance:
```bash
ssh -i brince-solutions-key.pem ubuntu@<ELASTIC_IP>
```

Edit the backend .env file:
```bash
sudo nano /var/www/brince-backend/backend/.env
```

Update these values:
- `SECRET_KEY` - Django secret key
- `DEBUG=False`
- `ALLOWED_HOSTS=brincesolutions.com,www.brincesolutions.com`
- `EMAIL_HOST_USER` - Your email
- `EMAIL_HOST_PASSWORD` - Your email password
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

Restart the backend:
```bash
sudo systemctl restart brince-backend
```

### 2. Configure DNS

Update your domain's DNS A record:
- **Name:** `@` (or blank for apex domain)
- **Type:** A
- **Value:** Your Elastic IP (from aws-instance-info.txt)
- **TTL:** 300

For www subdomain:
- **Name:** `www`
- **Type:** A
- **Value:** Your Elastic IP
- **TTL:** 300

### 3. Setup SSL Certificate

After DNS has propagated (usually 5-30 minutes), setup SSL:

```bash
ssh -i brince-solutions-key.pem ubuntu@<ELASTIC_IP>
cd ~/deploy
sudo ./setup-ssl.sh brincesolutions.com admin@brincesolutions.com
```

### 4. Update Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Update webhook URL to: `https://brincesolutions.com/api/payments/webhook/`
3. Update webhook secret in backend `.env` file
4. Restart backend: `sudo systemctl restart brince-backend`

## Instance Information

After running `aws-setup.sh`, instance information is saved to `aws-instance-info.txt`:

```
Instance ID: i-xxxxxxxxxxxxx
Public IP: 54.xxx.xxx.xxx
Elastic IP: 54.xxx.xxx.xxx
Key Pair: brince-solutions-key
Security Group: sg-xxxxxxxxxxxxx
Region: us-east-1
```

## Troubleshooting

### AWS CLI Not Configured
```bash
aws configure
# Enter your AWS credentials
```

### Key File Permission Error
```bash
chmod 400 brince-solutions-key.pem
```

### SSH Connection Timeout
- Check security group allows SSH from your IP
- Wait a few minutes for instance to fully initialize
- Verify the Elastic IP is correct

### Deployment Script Fails
- Check instance logs: `ssh -i key.pem ubuntu@IP "sudo journalctl -u brince-backend -n 50"`
- Verify GitHub repository URL is correct
- Ensure all environment variables are set

### SSL Certificate Fails
- Verify DNS A record points to Elastic IP
- Wait for DNS propagation (can take up to 48 hours)
- Check nginx configuration: `sudo nginx -t`

## Cost Estimation

- **EC2 t3.small:** ~$15/month
- **Elastic IP:** Free (when associated with running instance)
- **Data Transfer:** First 100GB free, then $0.09/GB
- **Storage:** ~$2/month for 20GB

**Estimated Total:** ~$17-20/month

## Security Best Practices

1. ✅ Security group restricts SSH to your IP only
2. ✅ Firewall (UFW) configured automatically
3. ✅ Fail2ban installed for brute force protection
4. ✅ SSL/TLS encryption enabled
5. ✅ Security headers configured in nginx
6. ✅ Django security settings enabled in production

## Maintenance

### View Logs
```bash
# Backend logs
ssh -i key.pem ubuntu@IP "sudo journalctl -u brince-backend -f"

# Nginx logs
ssh -i key.pem ubuntu@IP "sudo tail -f /var/log/nginx/brincesolutions_error.log"
```

### Update Application
```bash
# Backend
ssh -i key.pem ubuntu@IP
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
ssh -i key.pem ubuntu@IP
sudo cp /var/www/brince-backend/backend/db.sqlite3 /backup/db-$(date +%Y%m%d).sqlite3
```

## Cleanup (If Needed)

To delete everything created:

```bash
# Get instance ID from aws-instance-info.txt
INSTANCE_ID="i-xxxxxxxxxxxxx"
ALLOCATION_ID=$(aws ec2 describe-addresses --filters "Name=instance-id,Values=$INSTANCE_ID" --query 'Addresses[0].AllocationId' --output text)

# Terminate instance
aws ec2 terminate-instances --instance-ids $INSTANCE_ID

# Release Elastic IP
aws ec2 release-address --allocation-id $ALLOCATION_ID

# Delete security group
aws ec2 delete-security-group --group-name brince-solutions-sg

# Delete key pair (optional)
aws ec2 delete-key-pair --key-name brince-solutions-key
```

## Support

For issues or questions:
1. Check logs (see Troubleshooting section)
2. Verify all prerequisites are met
3. Ensure AWS credentials have proper permissions (EC2, VPC)
4. Review deployment scripts for any custom requirements

