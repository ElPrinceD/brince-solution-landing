#!/bin/bash
# Complete automated deployment: Create EC2 + Deploy application
# This is the main script that does everything

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🚀 Complete AWS EC2 Deployment"
echo "================================"
echo ""

# Step 1: Setup AWS EC2 instance
echo "Step 1: Creating AWS EC2 instance..."
"$SCRIPT_DIR/aws-setup.sh"

# Read instance info
if [ -f aws-instance-info.txt ]; then
    ELASTIC_IP=$(grep "Elastic IP:" aws-instance-info.txt | awk '{print $3}')
    KEY_FILE=$(grep "Key Pair:" aws-instance-info.txt | awk '{print $3}').pem
    
    echo ""
    echo "Step 2: Deploying application..."
    echo "⏳ Waiting 60 seconds for instance to fully initialize..."
    sleep 60
    
    "$SCRIPT_DIR/deploy-to-aws.sh" "$ELASTIC_IP" "$KEY_FILE"
    
    echo ""
    echo "✅ Complete deployment finished!"
    echo ""
    echo "📋 Summary:"
    echo "   Instance IP: $ELASTIC_IP"
    echo "   Key file: $KEY_FILE"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update DNS A record for brincesolutions.com to: $ELASTIC_IP"
    echo "   2. Configure backend .env file (see instructions above)"
    echo "   3. Setup SSL certificate (after DNS propagation)"
    echo ""
else
    echo "❌ Could not read instance information"
    exit 1
fi

