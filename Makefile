# Executables
DOCKER_COMPOSE?=docker compose
DOCKER_EXEC?=$(DOCKER_COMPOSE) exec -it
PNPM?=$(DOCKER_EXEC) node pnpm
DOCS?=$(DOCKER_EXEC) docs

# Misc
default: help

##
## —— Docker ———————————————————————————————————————————————————————————————————

.PHONY: docker-build
docker-build: ## Build and start containers.
	@$(DOCKER_COMPOSE) up --build --no-recreate -d

.PHONY: docker-rebuild
docker-rebuild: ## Force rebuild and start containers.
	@$(DOCKER_COMPOSE) up --build --force-recreate --remove-orphans -d

.PHONY: up
up: ## Start containers without building.
	@$(DOCKER_COMPOSE) up -d

.PHONY: down
down: ## Stop and remove containers.
	@$(DOCKER_COMPOSE) down --remove-orphans

##
## —— Executables ——————————————————————————————————————————————————————————————

.PHONY: pnpm
pnpm: ## Run a PNPM command (e.g. make pnpm c="update").
	@$(PNPM) $(c)

##
## —— Build, lint and tests ————————————————————————————————————————————————————

.PHONY: build
build: ## Build.
	@$(PNPM) lib:build

.PHONY: lint
lint: ## Lint.
	@$(PNPM) lint

##
## —— Utilities ————————————————————————————————————————————————————————————————

.PHONY: sh
sh: ## Run sh on test container.
	@$(DOCKER_EXEC) node sh

.PHONY: help
help: ## Show help for each of the Makefile recipes.
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
