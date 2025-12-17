#!/bin/bash
# Deploy snras_website to VM
set -e

echo "===== SNRAS Website Deployment ====="

# Update system
echo "1. Updating system packages..."
sudo apt update

# Install nginx and git
echo "2. Installing nginx and git..."
sudo apt install -y nginx git

# Clone or update repo
REPO_URL="https://github.com/golam-snrassystems/snraswebsite.git"
WEB_ROOT="/var/www/snras_website"

if [ -d "$WEB_ROOT/.git" ]; then
    echo "3. Updating existing repo..."
    cd $WEB_ROOT
    sudo git pull
else
    echo "3. Cloning repo..."
    sudo rm -rf $WEB_ROOT
    sudo git clone $REPO_URL $WEB_ROOT
fi

# Set permissions
echo "4. Setting permissions..."
sudo chown -R www-data:www-data $WEB_ROOT
sudo chmod -R 755 $WEB_ROOT

# Configure nginx
echo "5. Configuring nginx..."
sudo tee /etc/nginx/sites-available/snras > /dev/null <<'NGINX_CONF'
server {
    listen 80;
    listen [::]:80;
    server_name 34.100.201.70;
    
    root /var/www/snras_website;
    index index.html main.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

# Enable site
sudo ln -sf /etc/nginx/sites-available/snras /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
echo "6. Testing nginx configuration..."
sudo nginx -t

# Configure firewall
echo "7. Configuring firewall..."
sudo ufw allow 'Nginx Full' 2>/dev/null || echo "UFW not enabled or already configured"
sudo ufw allow OpenSSH 2>/dev/null || true

# Restart nginx
echo "8. Restarting nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# Get server IP
SERVER_IP=$(curl -s ifconfig.me || echo "34.100.201.70")

echo ""
echo "===== Deployment Complete! ====="
echo "Your website is now live at:"
echo "  → http://$SERVER_IP"
echo "  → http://34.100.201.70"
echo ""
echo "To update the site later, run:"
echo "  cd $WEB_ROOT && sudo git pull && sudo systemctl reload nginx"
