FROM node:22-bookworm-slim AS frontend

WORKDIR /build
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi
COPY src ./src
COPY public ./public
COPY index.html vite.config.ts tsconfig.json metadata.json ./
RUN npm run build

FROM nginx:1.27-alpine

COPY backend/public /var/www/public
COPY --from=frontend /build/dist/assets /var/www/public/assets
COPY --from=frontend /build/dist/index.html /var/www/public/spa.html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/storage/app/public
