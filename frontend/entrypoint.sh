#!/bin/sh
# Use the PORT environment variable, default to 8080
PORT=${PORT:-8080}

# Create nginx config with the correct PORT
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen $PORT;
    server_name _;

    location / {
        root /usr/share/nginx/html;
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass https://spotify-backend-757684232443.us-central1.run.app/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Disable caching for service worker
    location /index.html {
        root /usr/share/nginx/html;
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Start nginx
nginx -g "daemon off;"
