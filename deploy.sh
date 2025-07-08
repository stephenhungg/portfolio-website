#!/bin/bash

# Portfolio Website Deployment Script
# Run this script on your EC2 instance

echo "🚀 Starting portfolio deployment..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo yum install -y nginx
fi

# Navigate to project directory
cd /home/ec2-user/portfolio-website

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Restart PM2 process
echo "🔄 Restarting application..."
pm2 restart portfolio || pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

echo "✅ Deployment completed successfully!"
echo "🌐 Your portfolio should be available at: http://your-ec2-ip"
echo "📊 Check PM2 status with: pm2 status"
echo "📋 Check logs with: pm2 logs portfolio" 