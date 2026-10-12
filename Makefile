.PHONY: up down logs shell migrate build config

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

shell:
	docker compose exec app sh

migrate:
	docker compose exec app php artisan migrate --force

build:
	docker compose build

config:
	docker compose config