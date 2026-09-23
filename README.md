
# E-Commerce Platform

A full-stack e-commerce platform built with React, TypeScript, Node.js, Express.js, MongoDB, Redis, and Docker.

## Features

- JWT-based user authentication
- Role-based authorization with admin access
- Product management
- Cart management
- Order management
- Product search
- Category filtering
- Price range filtering
- Sorting
- Pagination
- Input validation using Joi
- Centralized error handling
- Redis caching for product queries
- Redis cache invalidation after product changes
- Dockerized frontend, backend, and Redis
- Nginx-based production frontend serving

## Tech Stack

### Frontend
- React.js
- TypeScript
- React Router
- Axios
- Nginx

### Backend
- Node.js
- Express.js
- JWT
- bcrypt
- Joi
- Mongoose

### Database & Caching
- MongoDB Atlas
- Redis

### DevOps
- Docker
- Docker Compose

## Architecture

```text
                    ┌─────────────────┐
                    │     Browser     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Nginx / React   │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Express.js   │
                    │     Backend     │
                    └───────┬─┬───────┘
                            │ │
                 ┌──────────┘ └──────────┐
                 ▼                       ▼
          ┌──────────────┐        ┌──────────────┐
          │   MongoDB    │        │    Redis     │
          │    Atlas     │        │    Cache     │
          └──────────────┘        └──────────────┘
Application Flow
User
 │
 ▼
React Frontend
 │
 ▼
Axios API Request
 │
 ▼
Express.js Backend
 │
 ├── Authentication / Authorization
 │
 ├── Input Validation
 │
 ├── Controller
 │
 ├── Redis Cache
 │
 └── MongoDB
 │
 ▼
API Response
 │
 ▼
React Frontend
API Features

The backend provides RESTful APIs for:

Authentication
Products
Cart
Orders

Product APIs support:

Search
Category filtering
Price filtering
Sorting
Pagination
Authentication & Authorization

The application uses JWT-based authentication.

User Login
    │
    ▼
Credentials Verified
    │
    ▼
JWT Token Generated
    │
    ▼
Token Stored by Client
    │
    ▼
Token Sent with API Requests
    │
    ▼
Authentication Middleware
    │
    ▼
Authorized Request

The application also implements role-based authorization, allowing admin-only operations such as product creation, updating, and deletion.

Redis Caching

Product listing requests use a cache-aside strategy.

Request
   │
   ▼
Check Redis
   │
   ├── Cache HIT ──► Return cached data
   │
   └── Cache MISS
          │
          ▼
      Query MongoDB
          │
          ▼
      Store in Redis
          │
          ▼
      Return response

Product cache entries are invalidated when products are created, updated, or deleted.

This reduces repeated database queries for frequently requested product data.

Docker Setup

The application consists of three Docker services:

┌───────────────────────────────────────────┐
│              Docker Compose               │
│                                           │
│  ┌─────────────┐   ┌─────────────┐       │
│  │  Frontend   │   │   Backend   │       │
│  │ React+Nginx │──►│ Node+Express│       │
│  └─────────────┘   └──────┬──────┘       │
│                           │              │
│                    ┌──────▼──────┐       │
│                    │    Redis    │       │
│                    │    Cache    │       │
│                    └─────────────┘       │
└───────────────────────────────────────────┘

                    │
                    ▼
              MongoDB Atlas

MongoDB is hosted externally using MongoDB Atlas.

Running the Project
Prerequisites
Docker Desktop
MongoDB Atlas account
Environment Variables

Create:

backend/.env

Add:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
PORT=3001

Never commit .env files containing secrets.

A template is provided in:

backend/.env.example
Start the Application

From the project root:

docker compose up --build

The application will be available at:

Frontend: http://localhost:5173
Backend:  http://localhost:3001
Stop the Application
docker compose down
Project Structure
e-commerce/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── cartValidator.js
│   │   └── productValidator.js
│   │
│   ├── .env.example
│   ├── .dockerignore
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── nginx.conf
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
Key Concepts Implemented
RESTful API design
JWT authentication
Role-based access control
Password hashing with bcrypt
Input validation
Centralized error handling
MongoDB database integration
Mongoose ODM
Search and filtering
Pagination
Sorting
Redis cache-aside pattern
Redis cache invalidation
Docker containerization
Docker Compose orchestration
Nginx production serving
React with TypeScript
Security
Passwords are hashed using bcrypt
Authentication is handled using JWT
Admin routes are protected using role-based authorization
Request data is validated using Joi
Environment variables are excluded from Git
Sensitive credentials are not stored in the repository
Future Improvements
Payment gateway integration
Product image upload
Order status tracking
Unit and integration testing
CI/CD pipeline
Cloud deployment
Rate limiting
API documentation using Swagger/OpenAPI
Author

Manoj D S

