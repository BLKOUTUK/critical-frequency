# Critical Frequency — static site served by nginx
FROM node:22-alpine AS builder
WORKDIR /app
COPY critical_frequency/package*.json ./
RUN npm ci
COPY critical_frequency/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# SPA fallback — all routes serve index.html
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
