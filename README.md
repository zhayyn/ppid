# PPID Laravel 13

Aplikasi PPID ini memakai React/Vite sebagai frontend dan Laravel 13 sebagai API/backend. Target production adalah Ubuntu 24.04 LTS dengan Docker Engine, MariaDB, Redis, PHP-FPM, Nginx, ClamAV, worker, scheduler, dan Cloudflare Tunnel.

## Arsitektur production

```text
Cloudflare Tunnel
        |
        v
cloudflared -> nginx:8080 -> app:9000 (PHP-FPM Laravel)
                                  |
                     +------------+------------+
                     v            v            v
                   db          redis        clamav
                MariaDB       queue/cache   file scan
```

Semua service berada di network internal `ppid-network`. Tidak ada port aplikasi yang dipublish ke host. Akses publik hanya melalui Cloudflare Tunnel.

## Komponen Docker

- `app`: Laravel 13 + PHP 8.3-FPM.
- `nginx`: `nginx:1.27-alpine`, internal port 8080, meneruskan PHP ke `app:9000`.
- `db`: `mariadb:10.11`.
- `redis`: `redis:7-alpine` untuk cache, session, dan queue.
- `worker`: image yang sama dengan app, menjalankan `queue:work`.
- `scheduler`: image yang sama dengan app, menjalankan `schedule:work`.
- `clamav`: pemeriksaan antivirus upload.
- `cloudflared`: Cloudflare Tunnel menuju `http://nginx:8080`.

## Persistent data

```text
/media/storage/ppid-data/mysql    MariaDB
/media/storage/ppid-data/redis    Redis AOF
/media/storage/ppid-data/storage  Laravel storage dan upload
```

Dokumen upload berada di storage privat Laravel dan tidak boleh disimpan di Git.

## Persiapan Ubuntu 24.04

Di server `192.168.88.9`:

```bash
sudo mkdir -p /opt/ppid
sudo mkdir -p /media/storage/ppid-data/{mysql,redis,storage}
sudo chown -R 33:33 /media/storage/ppid-data/storage
sudo chmod 750 /media/storage/ppid-data/storage
```

Docker Engine v29.1.3 sudah tersedia. Install Compose plugin bila belum ada:

```bash
sudo apt-get update
sudo apt-get install -y docker-compose-plugin
sudo docker compose version
```

## Environment production

Di `/opt/ppid`, buat file rahasia `.env` dari template:

```bash
cp .env.example .env
chmod 600 .env
nano .env
```

Isi minimal:

```env
APP_NAME=PPID
APP_ENV=production
APP_KEY=base64:GENERATE_REAL_KEY
APP_DEBUG=false
APP_URL=https://ppid.pa-semarang.go.id

MYSQL_DATABASE=ppid_pa_semarang
MYSQL_USER=ppid_user
MYSQL_PASSWORD=STRONG_DATABASE_PASSWORD
MYSQL_ROOT_PASSWORD=STRONG_ROOT_PASSWORD

DB_CONNECTION=mariadb
DB_HOST=db
DB_PORT=3306
DB_DATABASE=ppid_pa_semarang
DB_USERNAME=ppid_user
DB_PASSWORD=STRONG_DATABASE_PASSWORD

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_CLIENT=phpredis
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

CLOUDFLARE_TUNNEL_TOKEN=your_token_here
PPID_ALLOWED_ORIGIN=https://ppid.pa-semarang.go.id
```

Generate `APP_KEY` sebelum deployment menggunakan Laravel container:

```bash
docker run --rm -v /opt/ppid/backend:/app -w /app composer:2 php artisan key:generate --show
```

Jangan commit `.env` atau token Cloudflare.

## Build image sebelum production

Constraint production: jangan memakai `docker compose up --build` di server production.

Build dilakukan di build machine atau CI:

```bash
docker compose build app nginx
```

Push image ke registry internal/GHCR, atau export dan transfer:

```bash
docker save ppid-app:production ppid-nginx:production | gzip > ppid-images.tar.gz
scp ppid-images.tar.gz ubuntu@192.168.88.9:/opt/ppid/
```

Di server:

```bash
cd /opt/ppid
gunzip -c ppid-images.tar.gz | docker load
```

Pastikan image sudah ada:

```bash
docker image ls ppid-app ppid-nginx
```

## Deploy tanpa build di production

```bash
cd /opt/ppid
docker compose up -d
docker compose ps
docker compose logs -f nginx app
```

Entrypoint container app menjalankan urutan berikut saat startup:

```text
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link --force
php-fpm -F
```

Worker dan scheduler memakai image `ppid-app:production` yang sama, tetapi melewati entrypoint cache/migration dan langsung menjalankan command masing-masing.

## Cloudflare Tunnel

Di Cloudflare Zero Trust buat Public Hostname:

```text
ppid.pa-semarang.go.id
```

Service tujuan di dashboard Cloudflare:

```text
http://nginx:8080
```

Token tunnel disimpan hanya di `.env` server melalui `CLOUDFLARE_TUNNEL_TOKEN`. Container `cloudflared` tidak memerlukan port host.

## Migration

Migration resmi berada di:

```text
backend/database/migrations/
```

Menjalankan migration manual:

```bash
make migrate
```

atau:

```bash
docker compose exec app php artisan migrate --force
```

## Admin pertama

```bash
docker compose exec app php artisan ppid:create-admin
```

Login admin tersedia di:

```text
https://ppid.pa-semarang.go.id/admin
```

## Upload security

- Nginx membatasi request ke 50 MB.
- PHP membatasi upload ke 50 MB.
- Laravel memvalidasi PDF/JPG/PNG dan MIME content.
- PDF diperiksa signature `%PDF-`.
- File diberi UUID acak.
- File disimpan di volume privat.
- ClamAV wajib tersedia; jika scan gagal, file ditolak.
- File tidak disajikan dari public web root.

## Helper commands

```bash
make up       # start tanpa build
make down     # stop service
make logs     # follow logs
make shell    # masuk ke app container
make migrate  # jalankan migration
make build    # hanya untuk build machine/CI
make config   # validasi compose config
```

## Backup

Database:

```bash
docker compose exec db sh -c 'exec mariadb-dump -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' > backup_ppid.sql
```

Backup juga direktori berikut secara terenkripsi:

```text
/media/storage/ppid-data/storage
```

Jangan menjalankan `docker compose down -v` pada production karena dapat menghapus data volume.
