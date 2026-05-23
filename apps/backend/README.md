# TaskFlow Backend

Java Spring Boot backend for the TaskFlow application.

## Features

- Health check endpoint
- Task CRUD APIs
- H2 database for local testing
- PostgreSQL support later through Docker Compose
- Spring Boot Actuator for monitoring foundation

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks/{id}` | Get one task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

## Run Locally

```bash
mvn spring-boot:run