# TASK 1 (completed)

This project demonstrates a RESTful API with real-time communication using WebSockets. The API provides CRUD (Create, Read, Update, Delete) operations for resources and supports real-time updates using WebSocket communication for certain events.

## Features

RESTful API with JWT-based Authentication and Authorization.
MongoDB for data storage and retrieval using Mongoose as the ORM.
Redis for caching frequently accessed resources to improve performance.
Pagination and sorting of resources for efficient querying.
Real-time communication using Socket.IO for WebSocket support.
Broadcasting of real-time events to multiple clients using rooms or namespaces.

## Prerequisites

- Node.js (version 14 or higher)
- Docker (optional, for using the provided Docker Compose setup)
- MongoDB (optional, for using MongoDB as the database)
- Redis (optional, for using Redis for caching)

## Installation

- Clone the repository:
- git clone https://github.com/your-username/your-project.git
- cd raft
- Install dependencies:
- npm install
- Configuration

Create a .env file in the project root and configure the following environment variables:
bash
Copy code

# Common configurations

- PORT=5050
- JWT_SECRET=your-jwt-secret-key

# MongoDB configuration (if using MongoDB)

- MONGODB_URI=mongodb://localhost:27017/mydatabase

# Redis configuration (if using Redis for caching)

- REDIS_URI=redis://localhost:6379

## Running the Application

# Start the development server:

- npm run start
  Access the API at http://localhost:5050
  Docker Compose (Optional)

If you have Docker and Docker Compose installed, you can use the provided Docker Compose setup to run the entire stack (including MongoDB, and Redis) with a single command.

- Start the services using Docker Compose:
  docker-compose up

The API provides WebSocket communication using Socket.IO to enable real-time updates of resources. WebSocket events are broadcasted to clients in the same room based on their user ID.

- Example WebSocket events:
  userdeleteOrUpdate: Triggered when a user is delete or updated.

API Documentation

Please refer to the API documentation in the docs directory for detailed information about the available endpoints and request/response formats.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Feel free to customize this README file based on your project's specific details. It serves as a starting point to provide important information about your RESTful API project with real-time communication using WebSockets.
