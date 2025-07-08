# EC2 Deployment Guide for Portfolio Website

## Prerequisites
- AWS Account
- EC2 Instance (t2.micro or larger recommended)
- Domain name (optional but recommended)

## Step 1: Launch EC2 Instance

1. **Go to AWS Console** → EC2 → Launch Instance
2. **Choose Amazon Linux 2023** (free tier eligible)
3. **Instance Type**: t2.micro (free tier) or t3.small for better performance
4. **Key Pair**: Create or select existing key pair for SSH access
5. **Security Group**: Create new with these rules:
   - SSH (Port 22): Your IP
   - HTTP (Port 80): 0.0.0.0/0
   - HTTPS (Port 443): 0.0.0.0/0 (if using SSL)

## Step 2: Connect to EC2 Instance

```bash
# Replace with your key file and instance IP
ssh -i "your-key.pem" ec2-user@your-instance-ip
```

## Step 3: Install Dependencies

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Git
sudo yum install -y git

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo yum install -y nginx
```

## Step 4: Clone and Setup Application

```bash
# Clone your repository
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save
```

## Step 5: Configure Nginx

Create Nginx configuration:
```bash
sudo nano /etc/nginx/conf.d/portfolio.conf
```

Add this content:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Start Nginx:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 6: Setup SSL (Optional but Recommended)

Install Certbot:
```bash
sudo yum install -y certbot python3-certbot-nginx
```

Get SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 7: Environment Variables

Create production environment file:
```bash
nano .env.local
```

Add any environment variables your app needs.

## Step 8: Update Application

For future updates:
```bash
cd portfolio-website
git pull
npm install
npm run build
pm2 restart portfolio
```

## Troubleshooting

### Check Application Status
```bash
pm2 status
pm2 logs portfolio
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check Ports
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :3000
```

## Security Considerations

1. **Keep system updated**: `sudo yum update -y`
2. **Configure firewall**: Use AWS Security Groups
3. **Regular backups**: Set up automated backups
4. **Monitor logs**: Check application and system logs regularly
5. **SSL certificate renewal**: Certbot auto-renewal should be enabled

## Cost Optimization

- Use t2.micro for free tier
- Consider using AWS Lightsail for simpler pricing
- Monitor usage with AWS CloudWatch
- Set up billing alerts 