# Critical Frequency — static site served by nginx
FROM node:22-alpine AS builder
WORKDIR /app
COPY critical_frequency/package*.json ./
RUN npm ci
COPY critical_frequency/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Brown Bag Lunch campaign page + assets
COPY mental-health-campaign/brown-bag-lunch.html /usr/share/nginx/html/brown-bag-lunch.html
COPY mental-health-campaign/bmhm.png /usr/share/nginx/html/bmhm.png
COPY mental-health-campaign/brown-bag-og.png /usr/share/nginx/html/brown-bag-og.png
COPY mental-health-campaign/index.html /usr/share/nginx/html/mental-health.html
# SPA fallback — serve static files first, then fall back to React app
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
