# Executables
DOCKER_COMPOSE?=docker compose
DOCKER_EXEC?=$(DOCKER_COMPOSE) exec -it
PNPM?=$(DOCKER_EXEC) node pnpm

# Misc
default: help

##
## —— Docker ———————————————————————————————————————————————————————————————————

.PHONY: build
build: ## Build and start containers.
	@$(DOCKER_COMPOSE) up --build --no-recreate -d

.PHONY: rebuild
rebuild: ## Force rebuild and start containers.
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

.PHONY: package
package: ## Package lib.
	@$(PNPM) build

.PHONY: typedoc
typedoc: ## Generate API reference docs.
	@$(PNPM) docs:typedoc

.PHONY: dev
dev: ## Run dev docs.
	@$(PNPM) docs:dev --host

.PHONY: preview
preview: ## Run preview docs.
	@$(MAKE) --no-print-directory package
	@$(MAKE) --no-print-directory typedoc
	@$(PNPM) docs:preview --host --port 5173

.PHONY: lint
lint: ## Lint.
	@$(PNPM) lint

.PHONY: lint-write
lint-write: ## Lint and autofix.
	@$(PNPM) lint --write

.PHONY: test-unit
test-unit: ## Run unit tests.
	@$(PNPM) test:unit

.PHONY: test-e2e
test-e2e: ## Run E2E tests.
	@docker run -it -v ./:/e2e -w /e2e --name cypress-tests --rm --network host --entrypoint cypress cypress/included:15.6.0 run --component

.PHONY: test
test: ## Run all tests.
	@$(MAKE) --no-print-directory test-unit
	@$(MAKE) --no-print-directory test-e2e

##
## —— Utilities ————————————————————————————————————————————————————————————————

.PHONY: sh
sh: ## Run sh on test container.
	@$(DOCKER_EXEC) node sh

.PHONY: help
help: ## Show help for each of the Makefile recipes.
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
