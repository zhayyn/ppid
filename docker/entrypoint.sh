#!/bin/sh
set -eu

if [ "${1:-php-fpm}" != "php-fpm" ]; then
    exec "$@"
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link --force

exec "$@"
