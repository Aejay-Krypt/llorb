## logs: [DOCKER] Tail general logs for all running docker compose containers
logs:
	@echo "============= Viewing all logs ============="
	docker compose logs -f

## down: [DOCKER] Shutdown docker compose running containers
down:
	@echo "============= Shutting down all running containers ============="
	docker compose down

## clean: [DOCKER] Clean up after shutdown and remove all images and volumes
clean:
	@echo "============= Project cleaning up ============="
	docker system prune -f
	docker volume prune -f

## api: [DOCKER] Boot up backend
api:
	@echo "============= Run backend docker build ============="
	docker build -t taskmaster-api -f Dockerfile.api .

## portal: [DOCKER] Boot up frontend
portal:
	@echo "============= Run frontend docker build ============="
	docker build -t taskmaster-portal -f Dockerfile.portal .

## ignition: [DOCKER] Boot up system
ignition:
	@echo "============= Run system docker build ============="
	docker compose up --build -d

## view: [DOCKER] Show all running containers for the api
view:
	@echo "============= View all running containers for API ============="
	docker compose ps

## help: [LINUX] Command to view help
help: Makefile
	@echo
	@echo "Choose a command to run using Docker-Compose OR PHP-Composer Commands:"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
