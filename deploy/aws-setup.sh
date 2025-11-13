#!/bin/bash
# Automated AWS EC2 setup using AWS CLI
# This script creates and configures the EC2 instance automatically

set -e

# Configuration
INSTANCE_NAME="brince-solutions-production"
INSTANCE_TYPE="t3.small"
KEY_NAME="brince-solutions-key"
SECURITY_GROUP_NAME="brince-solutions-sg"
REGION="${AWS_REGION:-us-east-1}"
DOMAIN="brincesolutions.com"

# Get Ubuntu 22.04 LTS AMI ID for the region
echo "🔍 Finding Ubuntu 22.04 LTS AMI for region: $REGION"
AMI_ID=$(aws ec2 describe-images \
    --owners 099720109477 \
    --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" \
              "Name=state,Values=available" \
    --query 'Images | sort_by(@, &CreationDate) | [-1].ImageId' \
    --output text \
    --region "$REGION")

if [ -z "$AMI_ID" ] || [ "$AMI_ID" == "None" ]; then
    echo "❌ Could not find Ubuntu 22.04 LTS AMI in region $REGION"
    echo "   Please specify AMI_ID manually or check your region"
    exit 1
fi

echo "   ✅ Found AMI: $AMI_ID"

echo "🚀 Starting AWS EC2 automated setup..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://aws.amazon.com/cli/"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run:"
    echo "   aws configure"
    exit 1
fi

echo "✅ AWS CLI configured"

# Get your public IP for SSH access
MY_IP=$(curl -s https://checkip.amazonaws.com)
echo "📍 Your IP address: $MY_IP"

# Create key pair if it doesn't exist
echo "🔑 Creating/checking key pair..."
if ! aws ec2 describe-key-pairs --key-names "$KEY_NAME" --region "$REGION" &> /dev/null; then
    echo "   Creating new key pair: $KEY_NAME"
    aws ec2 create-key-pair \
        --key-name "$KEY_NAME" \
        --region "$REGION" \
        --query 'KeyMaterial' \
        --output text > "${KEY_NAME}.pem"
    chmod 400 "${KEY_NAME}.pem"
    echo "   ✅ Key pair created and saved to ${KEY_NAME}.pem"
    echo "   ⚠️  IMPORTANT: Keep this file safe! You'll need it to SSH into the instance."
else
    echo "   ✅ Key pair already exists"
    if [ ! -f "${KEY_NAME}.pem" ]; then
        echo "   ⚠️  Warning: Key file ${KEY_NAME}.pem not found locally"
        echo "   You may need to download it from AWS Console or recreate it"
    fi
fi

# Create security group if it doesn't exist
echo "🛡️  Creating/checking security group..."
SG_ID=$(aws ec2 describe-security-groups \
    --group-names "$SECURITY_GROUP_NAME" \
    --region "$REGION" \
    --query 'SecurityGroups[0].GroupId' \
    --output text 2>/dev/null || echo "")

if [ -z "$SG_ID" ] || [ "$SG_ID" == "None" ]; then
    echo "   Creating security group: $SECURITY_GROUP_NAME"
    SG_ID=$(aws ec2 create-security-group \
        --group-name "$SECURITY_GROUP_NAME" \
        --description "Security group for Brince Solutions production server" \
        --region "$REGION" \
        --query 'GroupId' \
        --output text)
    echo "   ✅ Security group created: $SG_ID"
    
    # Add inbound rules
    echo "   Adding inbound rules..."
    aws ec2 authorize-security-group-ingress \
        --group-id "$SG_ID" \
        --protocol tcp \
        --port 22 \
        --cidr "${MY_IP}/32" \
        --region "$REGION" \
        --output text > /dev/null
    
    aws ec2 authorize-security-group-ingress \
        --group-id "$SG_ID" \
        --protocol tcp \
        --port 80 \
        --cidr "0.0.0.0/0" \
        --region "$REGION" \
        --output text > /dev/null
    
    aws ec2 authorize-security-group-ingress \
        --group-id "$SG_ID" \
        --protocol tcp \
        --port 443 \
        --cidr "0.0.0.0/0" \
        --region "$REGION" \
        --output text > /dev/null
    
    echo "   ✅ Security group rules configured"
else
    echo "   ✅ Security group already exists: $SG_ID"
fi

# Launch EC2 instance
echo "🖥️  Launching EC2 instance..."
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id "$AMI_ID" \
    --instance-type "$INSTANCE_TYPE" \
    --key-name "$KEY_NAME" \
    --security-group-ids "$SG_ID" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]" \
    --region "$REGION" \
    --query 'Instances[0].InstanceId' \
    --output text)

echo "   ✅ Instance launched: $INSTANCE_ID"
echo "   ⏳ Waiting for instance to be running..."

# Wait for instance to be running
aws ec2 wait instance-running --instance-ids "$INSTANCE_ID" --region "$REGION"
echo "   ✅ Instance is running"

# Get public IP
echo "🌐 Getting instance details..."
PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --region "$REGION" \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text)

echo "   ✅ Public IP: $PUBLIC_IP"

# Allocate Elastic IP
echo "🔗 Allocating Elastic IP..."
ALLOCATION_ID=$(aws ec2 allocate-address \
    --domain vpc \
    --region "$REGION" \
    --query 'AllocationId' \
    --output text)

echo "   ✅ Elastic IP allocated: $ALLOCATION_ID"

# Associate Elastic IP with instance
echo "🔗 Associating Elastic IP with instance..."
aws ec2 associate-address \
    --instance-id "$INSTANCE_ID" \
    --allocation-id "$ALLOCATION_ID" \
    --region "$REGION" \
    --output text > /dev/null

# Get Elastic IP
ELASTIC_IP=$(aws ec2 describe-addresses \
    --allocation-ids "$ALLOCATION_ID" \
    --region "$REGION" \
    --query 'Addresses[0].PublicIp' \
    --output text)

echo "   ✅ Elastic IP associated: $ELASTIC_IP"

# Wait for SSH to be ready
echo "⏳ Waiting for SSH to be ready..."
sleep 30
for i in {1..30}; do
    if ssh -i "${KEY_NAME}.pem" -o StrictHostKeyChecking=no -o ConnectTimeout=5 ubuntu@"$ELASTIC_IP" exit 2>/dev/null; then
        echo "   ✅ SSH is ready"
        break
    fi
    echo "   Waiting... ($i/30)"
    sleep 5
done

# Save instance information
cat > aws-instance-info.txt << EOF
Instance ID: $INSTANCE_ID
Public IP: $PUBLIC_IP
Elastic IP: $ELASTIC_IP
Key Pair: $KEY_NAME
Security Group: $SG_ID
Region: $REGION

SSH Command:
ssh -i ${KEY_NAME}.pem ubuntu@$ELASTIC_IP

Next Steps:
1. Update DNS A record for $DOMAIN to point to: $ELASTIC_IP
2. Run: ./deploy-to-aws.sh $ELASTIC_IP
EOF

echo ""
echo "✅ AWS EC2 setup complete!"
echo ""
echo "📋 Instance Information:"
echo "   Instance ID: $INSTANCE_ID"
echo "   Elastic IP: $ELASTIC_IP"
echo "   Key Pair: ${KEY_NAME}.pem"
echo ""
echo "📝 Next steps:"
echo "   1. Update DNS A record for $DOMAIN to point to: $ELASTIC_IP"
echo "   2. Run: ./deploy-to-aws.sh $ELASTIC_IP"
echo ""
echo "💾 Instance info saved to: aws-instance-info.txt"

