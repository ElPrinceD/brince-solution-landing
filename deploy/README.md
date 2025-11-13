# Deployment Scripts

This directory contains all scripts needed to deploy the Brince Solutions application to AWS EC2.

## Scripts Overview

1. **setup-server.sh** - Initial server setup (run first)
2. **install-dependencies.sh** - Install Node.js, Python, nginx, etc.
3. **deploy-backend.sh** - Deploy Django backend
4. **deploy-frontend.sh** - Deploy React frontend
5. **configure-nginx.sh** - Configure nginx reverse proxy
6. **setup-ssl.sh** - Setup SSL certificates with Let's Encrypt
7. **start-services.sh** - Start all services (Gunicorn, nginx)

## Quick Start

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment instructions.

## Usage

All scripts should be run in order. Most require sudo/root access.

```bash
# 1. Initial setup
sudo ./setup-server.sh

# 2. Install dependencies
sudo ./install-dependencies.sh

# 3. Deploy backend
sudo -u brince ./deploy-backend.sh https://github.com/USER/REPO.git main

# 4. Deploy frontend
sudo -u brince ./deploy-frontend.sh https://github.com/USER/REPO.git main brincesolutions.com

# 5. Configure nginx
sudo ./configure-nginx.sh brincesolutions.com

# 6. Setup SSL
sudo ./setup-ssl.sh brincesolutions.com admin@brincesolutions.com

# 7. Start services
cd /var/www/brince-backend
sudo ./start-services.sh
```

## Configuration Files

- **gunicorn.service** - Systemd service file for Django backend
- **.env.production.example** - Template for production environment variables

## Notes

- Update repository URLs in deployment scripts before use
- Ensure all environment variables are set in backend `.env` file
- DNS must be configured before SSL certificate setup
- All scripts include error handling and will stop on errors

