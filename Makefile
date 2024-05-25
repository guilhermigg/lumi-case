.PHONY: up
up:
	docker compose up

.PHONY: build
build:
	docker compose build --no-cache

.PHONY: bash
bash:
	docker container exec -it lumi-api /bin/sh
