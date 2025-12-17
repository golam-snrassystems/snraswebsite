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

# Install Node.js and npm if not installed
echo "9. Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# Install backend dependencies
echo "10. Installing backend dependencies..."
cd $WEB_ROOT/realtime_tracker
sudo npm install

# Create systemd service for backend API
echo "11. Setting up backend service..."
sudo tee /etc/systemd/system/water-api.service > /dev/null <<'SERVICE_CONF'
[Unit]
Description=Water Quality API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/snras_website/realtime_tracker
ExecStart=/usr/bin/node app.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE_CONF

# Enable and start the backend service
sudo systemctl daemon-reload
sudo systemctl enable water-api
sudo systemctl start water-api

# Open port 8345 in firewall
echo "12. Opening API port..."
sudo ufw allow 8345/tcp 2>/dev/null || true

# Get server IP
SERVER_IP=$(curl -s ifconfig.me || echo "34.100.201.70")

echo ""
echo "===== Deployment Complete! ====="
echo "Your website is now live at:"
echo "  → http://$SERVER_IP"
echo "  → http://34.100.201.70"
echo ""
echo "Backend API running on port 8345"
echo ""
echo "To update the site later, run:"
echo "  cd $WEB_ROOT && sudo git pull && sudo systemctl reload nginx && sudo systemctl restart water-api"
echo ""
echo "To check backend status:"
echo "  sudo systemctl status water-api"
echo "  sudo journalctl -u water-api -f"
