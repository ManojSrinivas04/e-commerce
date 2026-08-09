# MERN E-Commerce Platform

A full-stack e-commerce web application built using the MERN stack. The platform provides user authentication, JWT-based authorization, admin-only product management, shopping cart functionality, and order processing.

The project uses a React + Vite frontend, a Node.js + Express REST API, and MongoDB Atlas with Mongoose.

---

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected backend routes
- Role-based authorization with `user` and `admin` roles
- Axios authentication interceptor for protected requests
- Authentication-aware navigation

### Product Management
- View all products
- View individual products
- Create products
- Update products
- Delete products
- Admin-only product creation, update, and deletion
- Product data stored in MongoDB

### Shopping Cart
- Add products to cart
- View authenticated user's cart
- Increase/decrease quantity
- Remove products from cart
- User-specific cart data
- Automatic cart clearing after successful order placement

### Orders
- Place orders from the cart
- Calculate order totals
- Store purchased product prices
- View authenticated user's order history
- Order status support with `pending` as the initial status

### Frontend
- React-based UI
- React Router navigation
- Reusable product card component
- Responsive styling
- Login and registration pages
- Product listing
- Cart management
- Order history
- Loading and error handling

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, React Router, Axios, HTML5, CSS3, Vite |
| Backend | Node.js, Express.js, REST APIs, JWT, bcrypt |
| Database | MongoDB Atlas, Mongoose |
| Tools | Git, GitHub, VS Code, PowerShell, Nodemon |

---

## System Architecture

```text
                         ┌─────────────────────────┐
                         │     React Frontend      │
                         │      Vite + React       │
                         │      localhost:5173     │
                         └────────────┬────────────┘
                                      │
                               Axios / HTTP
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │    Express.js API       │
                         │     localhost:3001      │
                         │                         │
                         │ Routes                  │
                         │ Controllers             │
                         │ Middleware              │
                         └────────────┬────────────┘
                                      │
                                  Mongoose
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      MongoDB Atlas      │
                         │                         │
                         │ Users                   │
                         │ Products                │
                         │ Carts                   │
                         │ Orders                  │
                         └─────────────────────────┘
```

### Local Development URLs

```text
Frontend:  http://localhost:5173
Backend:   http://localhost:3001
API Base:  http://localhost:3001/api
```

---

## Authentication Flow

```text
┌───────────────┐
│     Login     │
└───────┬───────┘
        │
        ▼
┌───────────────────────┐
│ Auth Controller       │
│ Verify email/password │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ bcrypt verification   │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ JWT generated         │
│ ID + role + expiry    │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Frontend stores token │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Axios adds            │
│ Bearer token          │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Auth Middleware       │
│ Verifies JWT          │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Protected API Route   │
└───────────────────────┘
```

---

## Application Workflow

```text
Register
   │
   ▼
Login
   │
   ▼
JWT Authentication
   │
   ▼
Browse Products
   │
   ▼
Add Product to Cart
   │
   ▼
Update / Remove Cart Items
   │
   ▼
Place Order
   │
   ▼
Order Saved in MongoDB
   │
   ▼
Cart Automatically Cleared
   │
   ▼
View Order History
   │
   ▼
Logout
```

### Admin Workflow

```text
Admin Login
    │
    ▼
JWT Contains Admin Role
    │
    ▼
Admin Authorization Middleware
    │
    ├───────────────┬────────────────┐
    ▼               ▼                ▼
Create Product   Update Product   Delete Product
    │               │                │
    └───────────────┴────────────────┘
                    │
                    ▼
               MongoDB Atlas
```

---

## Project Structure

```text
E-commerce/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Orders.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   └── orderService.js
│   │   │
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> `backend/.env` is used only for local configuration and must not be committed to GitHub.

---

# API Overview

Base URL:

```text
http://localhost:3001/api
```

Protected endpoints use:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Authentication

| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/profile` | Authenticated |

## Products

| Method | Endpoint | Access |
|---|---|---|
| GET | `/products` | Public |
| GET | `/products/:id` | Public |
| POST | `/products` | Admin |
| PUT | `/products/:id` | Admin |
| DELETE | `/products/:id` | Admin |

## Cart

| Method | Endpoint | Access |
|---|---|---|
| GET | `/cart` | Authenticated |
| POST | `/cart` | Authenticated |
| PUT | `/cart/:productId` | Authenticated |
| DELETE | `/cart/:productId` | Authenticated |

## Orders

| Method | Endpoint | Access |
|---|---|---|
| POST | `/orders` | Authenticated |
| GET | `/orders` | Authenticated |

---

# Database Design

The application uses four main MongoDB collections.

### User

```text
User
├── name
├── email
├── password
├── role
└── timestamps
```

Roles:

```text
user
admin
```

### Product

```text
Product
├── name
├── price
├── category
├── image
├── stock
└── timestamps
```

### Cart

```text
Cart
├── user
└── items
    ├── product
    └── quantity
```

### Order

```text
Order
├── user
├── items
│   ├── product
│   ├── quantity
│   └── price
├── totalAmount
├── status
└── timestamps
```

The order stores the product price at the time of purchase so that historical order pricing remains available even if the product price changes later.

---

# Security

The application implements:

- **bcrypt password hashing** instead of storing plain-text passwords
- **JWT authentication** for protected API requests
- **Role-based authorization** for admin product operations
- **Protected backend routes**
- **Environment variables** for MongoDB credentials and JWT secrets
- **User-specific cart and order access**

Example environment configuration:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

Never commit the real `.env` file.

---

# Getting Started

## Prerequisites

Install:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Visual Studio Code

---

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd E-commerce
```

---

## 2. Configure the Backend

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

Replace the placeholder values with your actual MongoDB Atlas connection string and JWT secret.

---

## 3. Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3001
```

---

## 4. Configure and Start the Frontend

Open a second terminal.

From the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the application:

```text
http://localhost:5173
```

---

## Running Both Servers

### Terminal 1

```bash
cd backend
npm run dev
```

### Terminal 2

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Frontend Routes

| Route | Description |
|---|---|
| `/` | Product listing |
| `/login` | Login |
| `/register` | User registration |
| `/cart` | Shopping cart |
| `/orders` | User order history |

Cart and Orders are intended for authenticated users. Backend authorization remains the primary security layer.

---

# Testing

The application can be tested end-to-end using the frontend:

```text
Register
   ↓
Login
   ↓
Browse Products
   ↓
Add to Cart
   ↓
Increase / Decrease Quantity
   ↓
Remove Items
   ↓
Place Order
   ↓
Cart Cleared
   ↓
View Orders
   ↓
Logout
```

Backend APIs can also be tested using:

- Postman
- PowerShell `Invoke-RestMethod`

---

# Error Handling

The backend handles common scenarios such as:

- Invalid login credentials
- Duplicate user registration
- Missing or invalid JWT
- Expired JWT
- Unauthorized admin operations
- Invalid product IDs
- Product not found
- Product not found in cart
- Invalid cart quantities
- Empty cart during checkout
- MongoDB connection failures

---

# Future Improvements

Potential future enhancements:

- Payment gateway integration
- Product search and filtering
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Inventory management
- Order status management UI
- Pagination
- Product image upload and cloud storage
- Email notifications
- Automated unit and integration tests
- Production deployment

---

# Author

**Manoj Srinivas**

Computer Science Engineering Student

---

## License

This project is developed for educational and portfolio purposes.
