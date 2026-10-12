FROM composer:2 AS composer

WORKDIR /var/www
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader --no-scripts

FROM node:22-bookworm-slim AS node

WORKDIR /build
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi
COPY src ./src
COPY public ./public
COPY index.html vite.config.ts tsconfig.json metadata.json ./
RUN npm run lint && npm run build

FROM php:8.3-fpm-bookworm AS app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev \
        libzip-dev libicu-dev libonig-dev unzip ca-certificates \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath gd intl mbstring opcache pcntl pdo_mysql zip \
    && pecl install redis \
    && docker-php-ext-enable redis opcache \
    && sed -i 's/^;clear_env = no/clear_env = no/' /usr/local/etc/php-fpm.d/www.conf \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www
COPY backend /var/www
COPY --from=composer /var/www/vendor /var/www/vendor
COPY --from=node /build/dist/assets /var/www/public/assets
COPY --from=node /build/dist/index.html /var/www/public/spa.html
COPY docker/php.ini /usr/local/etc/php/conf.d/ppid.ini
COPY docker/entrypoint.sh /usr/local/bin/ppid-entrypoint

RUN mkdir -p /var/www/storage/app/public /var/www/storage/app/private/quarantine /var/www/storage/framework/cache /var/www/storage/framework/sessions /var/www/storage/framework/views /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && find /var/www -type d -exec chmod 0755 {} \; \
    && find /var/www -type f -exec chmod 0644 {} \; \
    && chmod +x /usr/local/bin/ppid-entrypoint

USER www-data
ENTRYPOINT ["ppid-entrypoint"]
CMD ["php-fpm", "-F"]
