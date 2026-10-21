# Critical Frequency — static site served by nginx
FROM node:22-alpine AS builder
WORKDIR /app
COPY critical_frequency/package*.json ./
RUN npm ci
COPY critical_frequency/ .
RUN npm run build

# Prerender / into dist/index.html (keeps dist/shell.html); the page is otherwise empty to a crawler
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN node scripts/prerender.mjs dist prerender.routes.json

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Brown Bag Lunch campaign page + assets
COPY mental-health-campaign/brown-bag-lunch.html /usr/share/nginx/html/brown-bag-lunch.html
COPY mental-health-campaign/bmhm.png /usr/share/nginx/html/bmhm.png
COPY mental-health-campaign/brown-bag-og.png /usr/share/nginx/html/brown-bag-og.png
COPY mental-health-campaign/index.html /usr/share/nginx/html/mental-health.html
# The Critical Frequency papers live here now (SEO plan K3, 21 Oct 2026): the legacy
# mental-health.blkoutuk.com essay site points each page at its copy below.
COPY briefings/ /usr/share/nginx/html/
# Static files first; / is the (prerendered) app. Anything else: index.html with a real 404 status
# (SEO plan K2, 11 Oct 2026) — the app reads no URL, so there are no other routes.
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; \
  location = /public/podcast-pilot.html { return 301 https://critical.blkoutuk.com/podcast-pilot.html; } \
  location = / { try_files /index.html =404; } \
  location / { try_files $uri $uri/ =404; } \
  error_page 404 /index.html; \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
