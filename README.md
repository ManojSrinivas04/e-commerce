# Scalable MERN E-Commerce Platform

A full-stack e-commerce web application built using the MERN stack, featuring secure user authentication, role-based authorization, product management, shopping cart functionality, and order processing.

The application follows a modular client-server architecture where a React frontend communicates with a Node.js/Express REST API backed by MongoDB Atlas.

---

## Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected API routes
- Role-based authorization for users and administrators
- Persistent authentication using browser local storage

### Product Management

- View all available products
- View individual product details
- Create products
- Update products
- Delete products
- Admin-only product management operations
- MongoDB-backed product storage

### Shopping Cart

- Add products to cart
- View user's cart
- Increase or decrease product quantity
- Remove products from cart
- User-specific cart data
- Automatic cart clearing after successful order placement

### Order Management

- Place orders from the shopping cart
- Automatic order total calculation
- Store product price at the time of purchase
- View personal order history
- Track order status
- Automatic cart clearing after successful order placement

### Frontend

- Responsive React interface
- Product grid with reusable product cards
- Login and registration pages
- Shopping cart page
- Order history page
- Authentication-aware navigation bar
- Loading and error handling
- Client-side routing using React Router

---

## Tech Stack

### Frontend

- React.js
- JavaScript (ES6+)
- React Router
- Axios
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- RESTful APIs
- JSON Web Token (JWT)
- bcrypt
- MVC architecture

### Database

- MongoDB Atlas
- Mongoose

### Tools

- Git
- GitHub
- Visual Studio Code
- Postman / PowerShell
- Nodemon

---

## Architecture

The application follows a client-server architecture:

```text
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │    localhost:5173    │
                    └──────────┬───────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Express.js Backend  │
                    │    localhost:3001     │
                    └──────────┬───────────┘
                               │
                    Routes / Controllers
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Mongoose Models    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas     │
                    └──────────────────────┘
Authentication Flow
User
  │
  ▼
Login
  │
  ▼
Express Authentication API
  │
  ├── Verify user
  ├── Compare password using bcrypt
  │
  ▼
JWT generated
  │
  ▼
Frontend stores JWT
  │
  ▼
Axios interceptor
  │
  ▼
Authorization: Bearer <JWT>
  │
  ▼
Protected Backend Routes
Project Structure
E-commerce/
│
├── backend/
│   │
│   ├── config/
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
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

The .env file is used only for local configuration and must not be committed to GitHub.

API Documentation

Base API URL:

http://localhost:3001/api

All protected endpoints require:

Authorization: Bearer <JWT_TOKEN>
Authentication APIs
Register User
POST /auth/register

Request:

{
  "name": "Manoj",
  "email": "manoj@example.com",
  "password": "password123"
}

Response:

{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Manoj",
    "email": "manoj@example.com",
    "role": "user"
  }
}
Login User
POST /auth/login

Request:

{
  "email": "manoj@example.com",
  "password": "password123"
}

Response:

{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Manoj",
    "email": "manoj@example.com",
    "role": "user"
  }
}

The frontend stores the JWT and automatically attaches it to protected API requests using an Axios request interceptor.

Product APIs
Get All Products
GET /products

Returns all available products.

Get Product by ID
GET /products/:id

Returns a specific product.

Create Product
POST /products

Requires authentication and admin authorization.

Example request:

{
  "name": "Wireless Headphones",
  "price": 1999,
  "description": "Bluetooth wireless headphones"
}
Update Product
PUT /products/:id

Requires admin authorization.

Delete Product
DELETE /products/:id

Requires admin authorization.

Cart APIs

All cart operations require user authentication.

Get Cart
GET /cart

Returns the authenticated user's cart.

Add Product to Cart
POST /cart

Request:

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}
Update Cart Item
PUT /cart/:productId

Request:

{
  "quantity": 3
}
Remove Cart Item
DELETE /cart/:productId

Removes the specified product from the authenticated user's cart.

Order APIs

All order operations require user authentication.

Place Order
POST /orders

The backend:

Retrieves the authenticated user's cart.
Checks whether the cart is empty.
Calculates the order total.
Creates the order.
Stores the product price at the time of purchase.
Clears the user's cart.
Get My Orders
GET /orders

Returns orders belonging to the authenticated user.

Example:

{
  "user": "USER_ID",
  "items": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2,
      "price": 1999
    }
  ],
  "totalAmount": 3998,
  "status": "pending"
}
Database Design

The application uses four primary MongoDB collections.

User
User
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt

Supported roles:

user
admin
Product
Product
├── name
├── price
├── description
├── image
└── timestamps
Cart

Each cart belongs to a specific authenticated user.

Cart
├── user
└── items
    ├── product
    └── quantity
Order
Order
├── user
├── items
│   ├── product
│   ├── quantity
│   └── price
├── totalAmount
├── status
└── timestamps

The order stores the product price at the time of purchase. This ensures that historical orders remain accurate even if the current product price changes later.

Security

The application implements the following security mechanisms.

Password Hashing

User passwords are hashed using bcrypt before being stored.

Plain Password
      │
      ▼
    bcrypt
      │
      ▼
Hashed Password
      │
      ▼
   MongoDB

Passwords are never stored as plain text.

JWT Authentication

Successful login generates a JWT.

Protected requests use:

Authorization: Bearer <JWT_TOKEN>
Role-Based Authorization

Administrative product operations are restricted to users with the admin role.

User
 ├── View products
 ├── Manage own cart
 └── Manage own orders

Admin
 └── Product management
     ├── Create
     ├── Update
     └── Delete
Environment Variables

Sensitive configuration is stored using environment variables.

Example:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

The .env file must never be committed to GitHub.

Installation & Setup
Prerequisites

Install the following before running the project:

Node.js
npm
Git
MongoDB Atlas account
Visual Studio Code
1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd E-commerce
2. Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create a file:

backend/.env

Add:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

Replace the placeholder values with your actual MongoDB Atlas connection string and JWT secret.

Start the backend:

npm run dev

The backend will run at:

http://localhost:3001

Expected output:

Server running on http://localhost:3001
Connected to MongoDB
3. Frontend Setup

Open a new terminal.

Navigate to:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend will run at:

http://localhost:5173
4. Run the Full Application

Use two terminals.

Terminal 1 — Backend
cd backend
npm run dev
Terminal 2 — Frontend
cd frontend
npm run dev

Open:

http://localhost:5173
Application Workflow

The complete customer workflow is:

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
Update Cart
   │
   ▼
Place Order
   │
   ▼
Order Created
   │
   ▼
Cart Automatically Cleared
   │
   ▼
View Order History
   │
   ▼
Logout
Testing

The backend APIs can be tested using:

Postman
PowerShell Invoke-RestMethod
Browser for GET endpoints

The frontend supports end-to-end testing through:

Register
   ↓
Login
   ↓
Browse Products
   ↓
Add to Cart
   ↓
Update Cart
   ↓
Remove Items
   ↓
Place Order
   ↓
View Orders
   ↓
Logout
Error Handling

The application handles common errors including:

Invalid login credentials
Duplicate user registration
Missing authentication token
Invalid or expired JWT
Unauthorized admin operations
Empty carts
Invalid product IDs
Product not found
Failed API requests
MongoDB connection failures
Development Practices

The project follows several development practices:

Modular MVC backend structure
Separation of routes, controllers, models, and middleware
Reusable React components
Centralized Axios API configuration
Axios request interceptor for JWT authentication
Environment variables for sensitive configuration
Protected backend routes
User-specific cart and order data
Meaningful API error responses
Future Improvements

Potential future enhancements include:

Payment gateway integration
Product search and filtering
Product categories
Product reviews and ratings
Wishlist functionality
Admin dashboard
Inventory management
Order status management interface
Pagination
Product image upload and cloud storage
Email notifications
Automated unit and integration testing
Production deployment
Learning Outcomes

This project provided practical experience with:

Full-stack web application development
MERN stack development
REST API design
React component architecture
Client-server communication
JWT authentication
Role-based authorization
Password hashing
MongoDB data modeling
Mongoose
MVC architecture
Protected API routes
Shopping cart workflows
Order processing
Git and GitHub
Author

Manoj Srinivas

Computer Science Engineering Student

License

This project is developed for educational and portfolio purposes.


### One thing before you commit

Because this README is going directly onto GitHub, **check your actual route files once** against the API section. In particular, make sure the product endpoints and cart endpoints use exactly the paths shown above.

Otherwise, this is the README I'd use. It's complete enough for a recruiter or interviewer to understand the project, while still being clean enough that it doesn't look like documentation generated just to make the project seem bigger than it is.
Pasted markdown.md
File
verify if everything is perfect, especially the local host values, last time u had given wrong ones

Yes — I checked the actual README file you uploaded line-by-line, especially the localhost values. And this time the ports are consistent with the setup you've actually been running.

✅ Localhost verification

Your README currently says:

Component	README	Your actual setup	Status
React/Vite frontend	http://localhost:5173	Vite showed http://localhost:5173/	✅ Correct
Node/Express backend	http://localhost:3001	Server showed http://localhost:3001	✅ Correct
API base	http://localhost:3001/api	Your testing used /api/auth, /api/cart, etc.	✅ Correct
Frontend API calls	/api/...	Matches your working backend routes	✅ Correct

The README explicitly documents the frontend as localhost:5173 and backend as localhost:3001.

Your API base is also correctly written as:

http://localhost:3001/api

And the setup section correctly tells users that the backend runs on 3001 and frontend on 5173.

I found only a few things I'd change
1. Change the .env structure display

Currently you show:

backend/
├── .env
├── package.json
└── server.js

That's technically fine, but because .env must not be uploaded, I'd change it to:

backend/
├── .env.example
├── package.json
└── server.js

And explain:

Create your own backend/.env file locally using the variables shown in .env.example.

Even better, create an actual backend/.env.example later.

2. Your README says ProductCard.jsx exists

Your structure says:

components/
├── Navbar.jsx
└── ProductCard.jsx

If ProductCard.jsx actually exists, leave it.

If you don't actually have that file, remove it from the README. Same applies to config/ and vite.config.js.

The README should represent your real repository, not the intended repository.

3. The localhost URLs are NOT wrong

This is the important part.

Keep:

Frontend:
http://localhost:5173

Backend:
http://localhost:3001

API:
http://localhost:3001/api

Do not change them to 3000, 5000, 8080, etc.

Your actual working setup confirms these ports.

4. API documentation is consistent

Your README has:

POST /auth/register
POST /auth/login

GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id

GET    /cart
POST   /cart
PUT    /cart/:productId
DELETE /cart/:productId

POST /orders
GET  /orders

Because the base URL is:

http://localhost:3001/api

the actual full URLs become:

http://localhost:3001/api/auth/register
http://localhost:3001/api/auth/login

http://localhost:3001/api/products

http://localhost:3001/api/cart

http://localhost:3001/api/orders

That's consistent with the commands you've actually been using during testing.

🟢 Final verdict

Your README is very close to final.

Keep exactly:
Frontend → http://localhost:5173
Backend  → http://localhost:3001
API      → http://localhost:3001/api

Those are correct. ✅

Make these small cleanup changes:
Change .env in the structure to .env.example, or simply omit it.
Make sure ProductCard.jsx, config/, and vite.config.js actually exist before keeping them in the structure.
Keep the API paths exactly as currently documented.
Don't put your actual MongoDB URI or JWT secret anywhere in the README.
Keep .env in .gitignore.

The rest of the README — features, architecture, authentication flow, database design, setup, testing, security, workflow, and learning outcomes — is well structured and appropriate for a GitHub portfolio project.

So no, you don't need to rewrite the whole README again. Just make those small corrections and it's ready for GitHub.

E-commerce.zip
Zip Archive
verify everything inside this once clearly, and make me a final readme file
Worked for 29s

Yes. I verified the ZIP itself, not just the previous README. I checked the actual backend routes/controllers/models, frontend pages/services/components, package.json files, and the existing README.

I found a few inaccuracies in the previous README and corrected them:

✅ Frontend: http://localhost:5173
✅ Backend: http://localhost:3001
✅ API base: http://localhost:3001/api
✅ /auth/profile actually exists
✅ Product fields are name, price, category, image, stock — not description
✅ Product CRUD is admin-only on the backend
✅ Cart endpoints match the actual code
✅ Order endpoints match the actual code
✅ Order statuses match the actual Mongoose enum
✅ Navbar.jsx, ProductCard.jsx, all pages and services match the actual project
✅ Backend structure matches the actual ZIP
✅ The README no longer claims an admin dashboard that doesn't exist
✅ It clearly explains that order status currently defaults to pending
✅ Setup commands match your actual package.json scripts
✅ The backend root check http://localhost:3001/ is also documented correctly
Final README

I've created the verified final file for you:

Download the final README.md

You can also open it and copy-paste the entire contents directly into your project's README.md.

One important thing: do not replace your actual backend/.env with anything from the README. The README only contains placeholders such as:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

Your real credentials stay in your local .env and should remain ignored by Git. 

README.md
Document

Library
/
README.md
Scalable MERN E-Commerce Platform

A full-stack e-commerce web application built using the MERN stack, featuring user authentication, JWT-based authorization, admin-only product management, shopping cart functionality, and order processing.

The application uses a React/Vite frontend, a Node.js/Express REST API, and MongoDB Atlas with Mongoose.

Features
Authentication & Authorization
User registration and login
JWT-based authentication
Password hashing with bcrypt
Protected API routes
Role-based authorization with user and admin roles
JWT automatically attached to protected frontend API requests using an Axios interceptor
Login token and user information stored in browser local storage
Product Management
View all products
View a single product by ID
Create products through protected admin APIs
Update products through protected admin APIs
Delete products through protected admin APIs
Product data stored in MongoDB
Product fields include name, price, category, image, and stock

Product CRUD is implemented on the backend. The current React frontend focuses on the customer shopping flow and does not include a separate admin dashboard.

Shopping Cart
Add products to the authenticated user's cart
View the user's cart
Increase or decrease product quantity
Remove products from the cart
Each user has their own cart
Product references are populated from MongoDB
Cart is automatically cleared after a successful order
Orders
Place orders from the shopping cart
Calculate the order total from product price × quantity
Store the product price at the time of purchase
View the authenticated user's order history
Store order status with pending as the default
Cart is automatically cleared after order creation
Frontend
React-based user interface
Vite development environment
React Router navigation
Reusable product card component
Authentication-aware navigation bar
Login and registration pages
Product listing page
Shopping cart page
Order history page
Responsive CSS styling
Basic loading and error handling
Tech Stack
Frontend
React.js
JavaScript (ES6+)
React Router
Axios
HTML5
CSS3
Vite
Backend
Node.js
Express.js
RESTful APIs
JSON Web Token (JWT)
bcrypt
MVC-style architecture
CORS
dotenv
Nodemon
Database
MongoDB Atlas
Mongoose
Development Tools
Git
GitHub
Visual Studio Code
PowerShell / Postman
Nodemon
Architecture

The application follows a client-server architecture:

                    ┌──────────────────────┐
                    │    React Frontend    │
                    │    localhost:5173    │
                    └──────────┬───────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Express.js Backend  │
                    │    localhost:3001    │
                    └──────────┬───────────┘
                               │
                    Routes / Controllers
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Mongoose Models    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas     │
                    └──────────────────────┘
Local Development URLs
Component	URL
Frontend	http://localhost:5173
Backend	http://localhost:3001
API Base URL	http://localhost:3001/api
Backend Root Check	http://localhost:3001/

The frontend Axios configuration currently uses:

http://localhost:3001/api
Authentication Flow
User
  │
  ▼
Register / Login
  │
  ▼
Express Authentication API
  │
  ├── Find user
  ├── Compare password using bcrypt
  │
  ▼
JWT generated
  │
  ▼
Frontend stores JWT
  │
  ▼
Axios request interceptor
  │
  ▼
Authorization: Bearer <JWT>
  │
  ▼
Protected Backend Route
  │
  ▼
JWT verification
  │
  ▼
Request processed

The JWT contains the authenticated user's ID and role and expires after one day.

Project Structure
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
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
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

backend/.env is a local configuration file and must never be committed to GitHub.

API Documentation
Base URL
http://localhost:3001/api

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>
Authentication APIs
Register User
POST /auth/register

Full URL:

http://localhost:3001/api/auth/register

Request body:

{
  "name": "Manoj",
  "email": "manoj@example.com",
  "password": "password123"
}

Successful response:

{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Manoj",
    "email": "manoj@example.com",
    "role": "user"
  }
}
Login User
POST /auth/login

Full URL:

http://localhost:3001/api/auth/login

Request body:

{
  "email": "manoj@example.com",
  "password": "password123"
}

Successful response contains:

{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Manoj",
    "email": "manoj@example.com",
    "role": "user"
  }
}

The frontend stores the JWT in local storage and the Axios interceptor automatically adds it to protected requests.

Get Authenticated Profile
GET /auth/profile

Full URL:

http://localhost:3001/api/auth/profile

Requires authentication.

Returns the authenticated user's JWT payload.

Product APIs
Get All Products
GET /products

Full URL:

http://localhost:3001/api/products

Public endpoint.

Returns all products.

Get Product by ID
GET /products/:id

Full URL example:

http://localhost:3001/api/products/PRODUCT_ID

Public endpoint.

Create Product
POST /products

Full URL:

http://localhost:3001/api/products

Requires:

JWT authentication
+
admin role

Example request:

{
  "name": "Wireless Headphones",
  "price": 1999,
  "category": "Electronics",
  "image": "https://example.com/headphones.jpg",
  "stock": 10
}
Update Product
PUT /products/:id

Requires:

JWT authentication
+
admin role
Delete Product
DELETE /products/:id

Requires:

JWT authentication
+
admin role
Cart APIs

All cart endpoints require JWT authentication.

Get Cart
GET /cart

Full URL:

http://localhost:3001/api/cart

Returns the authenticated user's cart.

Add Product to Cart
POST /cart

Full URL:

http://localhost:3001/api/cart

Request body:

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

If the product already exists in the cart, its quantity is increased.

Update Cart Item
PUT /cart/:productId

Full URL example:

http://localhost:3001/api/cart/PRODUCT_ID

Request body:

{
  "quantity": 3
}

Quantity must be at least 1.

Remove Cart Item
DELETE /cart/:productId

Full URL example:

http://localhost:3001/api/cart/PRODUCT_ID

Removes the specified product from the authenticated user's cart.

Order APIs

All order endpoints require JWT authentication.

Place Order
POST /orders

Full URL:

http://localhost:3001/api/orders

The backend:

Retrieves the authenticated user's cart.
Checks that the cart is not empty.
Reads the current product prices.
Calculates the total amount.
Creates the order.
Stores the purchased product prices in the order.
Clears the user's cart.

The newly created order defaults to:

pending
Get My Orders
GET /orders

Full URL:

http://localhost:3001/api/orders

Returns orders belonging to the authenticated user.

Example order structure:

{
  "user": "USER_ID",
  "items": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2,
      "price": 1999
    }
  ],
  "totalAmount": 3998,
  "status": "pending"
}
Database Design

The application uses four primary MongoDB collections.

User
User
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt

Supported roles:

user
admin
Product
Product
├── name
├── price
├── category
├── image
├── stock
├── createdAt
└── updatedAt
Cart

Each user has one cart.

Cart
├── user
└── items
    ├── product
    └── quantity

The product field references the Product collection.

Order
Order
├── user
├── items
│   ├── product
│   ├── quantity
│   └── price
├── totalAmount
├── status
├── createdAt
└── updatedAt

The order stores the product price at the time of purchase so that the order retains the original purchase price even if the product's current price changes later.

Supported order statuses:

pending
confirmed
shipped
delivered
cancelled

The current application creates orders with pending status. There is currently no separate order-status update API in the project.

Security
Password Hashing

Passwords are hashed using bcrypt before being stored in MongoDB.

Plain Password
      │
      ▼
    bcrypt
      │
      ▼
Hashed Password
      │
      ▼
   MongoDB

Passwords are never intentionally stored as plain text.

JWT Authentication

After successful login, the backend creates a JWT containing the user's ID and role.

Protected requests use:

Authorization: Bearer <JWT_TOKEN>

The JWT expires after one day.

Role-Based Authorization

Product creation, update, and deletion require the admin role.

User
 ├── View products
 ├── Manage own cart
 └── View own orders

Admin
 └── Product management
     ├── Create
     ├── Update
     └── Delete
Environment Variables

The backend uses environment variables for:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

Never commit the real .env file or expose MongoDB credentials or JWT secrets.

Installation & Setup
Prerequisites

Install:

Node.js
npm
Git
MongoDB Atlas account
Visual Studio Code
1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd E-commerce
2. Backend Setup

Open a terminal and run:

cd backend
npm install

Create:

backend/.env

Add:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

Replace the placeholder values with your own credentials.

Start the backend:

npm run dev

The backend runs at:

http://localhost:3001

You can verify the backend is running by opening:

http://localhost:3001/

Expected response:

Backend is running...
3. Frontend Setup

Open a second terminal.

From the project root:

cd frontend
npm install

Start the frontend:

npm run dev

The frontend runs at:

http://localhost:5173

Open it in a browser:

http://localhost:5173
4. Run the Complete Application

You need two terminals.

Terminal 1 — Backend
cd backend
npm run dev
Terminal 2 — Frontend
cd frontend
npm run dev

Then open:

http://localhost:5173
Application Workflow

The complete customer workflow is:

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
Increase / Decrease Quantity
   │
   ▼
Remove Items if Needed
   │
   ▼
Place Order
   │
   ▼
Order Created
   │
   ▼
Cart Automatically Cleared
   │
   ▼
View My Orders
   │
   ▼
Logout
Frontend Pages
Route	Purpose	Authentication
/	Product listing	Public
/login	User login	Public
/register	User registration	Public
/cart	View and manage cart	Requires login
/orders	View user's orders	Requires login

The current frontend hides Cart and Orders navigation links when there is no JWT in local storage. The backend remains the authoritative protection layer for these resources.

Testing

The backend APIs can be tested using:

Postman
PowerShell Invoke-RestMethod
Browser for public GET endpoints

The frontend supports an end-to-end customer workflow:

Register
   ↓
Login
   ↓
Browse Products
   ↓
Add to Cart
   ↓
Update Quantity
   ↓
Remove Item
   ↓
Place Order
   ↓
Cart Cleared
   ↓
View Orders
   ↓
Logout
Admin API Testing

Admin product operations can be tested by obtaining a JWT belonging to a user whose role is:

admin

Then send the token as:

Authorization: Bearer <ADMIN_JWT>
Error Handling

The application handles common errors including:

Invalid login credentials
Duplicate user registration
Missing authentication token
Invalid or expired JWT
Unauthorized admin operations
Empty carts
Invalid product IDs
Product not found
Product not found in cart
Invalid cart quantity
Failed API requests
MongoDB connection failures
Development Practices

The project uses:

Modular backend structure
Separation of routes, controllers, models, and middleware
Reusable React components
Centralized Axios API configuration
Axios request interceptor for JWT authentication
Environment variables for sensitive configuration
Protected backend routes
User-specific cart and order data
Mongoose population for referenced product data
Git/GitHub for version control
Future Improvements

Potential future enhancements include:

Payment gateway integration
Product search and filtering
Product categories and category filtering
Product reviews and ratings
Wishlist functionality
Admin dashboard
Inventory management
Order status management interface
Pagination
Product image upload and cloud storage
Email notifications
Automated unit and integration testing
Production deployment
Learning Outcomes

This project provided practical experience with:

Full-stack web application development
MERN stack development
REST API design
React component architecture
Client-server communication
JWT authentication
Role-based authorization
Password hashing
MongoDB data modeling
Mongoose
MVC-style backend architecture
Protected API routes
Shopping cart workflows
Order processing
Git and GitHub
Author

Manoj Srinivas

Computer Science Engineering Student

License

This project is developed for educational and portfolio purposes.

Library
/
README.md
Scalable MERN E-Commerce Platform

A full-stack e-commerce web application built using the MERN stack, featuring user authentication, JWT-based authorization, admin-only product management, shopping cart functionality, and order processing.

The application uses a React/Vite frontend, a Node.js/Express REST API, and MongoDB Atlas with Mongoose.

Features
Authentication & Authorization
User registration and login
JWT-based authentication
Password hashing with bcrypt
Protected API routes
Role-based authorization with user and admin roles
JWT automatically attached to protected frontend API requests using an Axios interceptor
Login token and user information stored in browser local storage
Product Management
View all products
View a single product by ID
Create products through protected admin APIs
Update products through protected admin APIs
Delete products through protected admin APIs
Product data stored in MongoDB
Product fields include name, price, category, image, and stock

Product CRUD is implemented on the backend. The current React frontend focuses on the customer shopping flow and does not include a separate admin dashboard.

Shopping Cart
Add products to the authenticated user's cart
View the user's cart
Increase or decrease product quantity
Remove products from the cart
Each user has their own cart
Product references are populated from MongoDB
Cart is automatically cleared after a successful order
Orders
Place orders from the shopping cart
Calculate the order total from product price × quantity
Store the product price at the time of purchase
View the authenticated user's order history
Store order status with pending as the default
Cart is automatically cleared after order creation
Frontend
React-based user interface
Vite development environment
React Router navigation
Reusable product card component
Authentication-aware navigation bar
Login and registration pages
Product listing page
Shopping cart page
Order history page
Responsive CSS styling
Basic loading and error handling
Tech Stack
Frontend
React.js
JavaScript (ES6+)
React Router
Axios
HTML5
CSS3
Vite
Backend
Node.js
Express.js
RESTful APIs
JSON Web Token (JWT)
bcrypt
MVC-style architecture
CORS
dotenv
Nodemon
Database
MongoDB Atlas
Mongoose
Development Tools
Git
GitHub
Visual Studio Code
PowerShell / Postman
Nodemon
Architecture

The application follows a client-server architecture:

                    ┌──────────────────────┐
                    │    React Frontend    │
                    │    localhost:5173    │
                    └──────────┬───────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Express.js Backend  │
                    │    localhost:3001    │
                    └──────────┬───────────┘
                               │
                    Routes / Controllers
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Mongoose Models    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas     │
                    └──────────────────────┘
Local Development URLs
Component	URL
Frontend	http://localhost:5173
Backend	http://localhost:3001
API Base URL	http://localhost:3001/api
Backend Root Check	http://localhost:3001/

The frontend Axios configuration currently uses:

http://localhost:3001/api
Authentication Flow
User
  │
  ▼
Register / Login
  │
  ▼
Express Authentication API
  │
  ├── Find user
  ├── Compare password using bcrypt
  │
  ▼
JWT generated
  │
  ▼
Frontend stores JWT
  │
  ▼
Axios request interceptor
  │
  ▼
Authorization: Bearer <JWT>
  │
  ▼
Protected Backend Route
  │
  ▼
JWT verification
  │
  ▼
Request processed

The JWT contains the authenticated user's ID and role and expires after one day.

Project Structure
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
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
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

backend/.env is a local configuration file and must never be committed to GitHub.

API Documentation
Base URL
http://localhost:3001/api

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>
Authentication APIs
Register User
POST /auth/register

Full URL:

http://localhost:3001/api/auth/register

Request body:

{
  "name": "Manoj",
  "email": "manoj@example.com",
  "password": "password123"
}

Successful response:

{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Manoj",
    "email": "manoj@example.com",
    "role": "user"
  }
}
Login User
POST /auth/login

Full URL:

http://localhost:3001/api/auth/login

Request body:

{
  "email": "manoj@example.com",
  "password": "password123"
}

Successful response contains:

{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Manoj",
    "email": "manoj@example.com",
    "role": "user"
  }
}

The frontend stores the JWT in local storage and the Axios interceptor automatically adds it to protected requests.

Get Authenticated Profile
GET /auth/profile

Full URL:

http://localhost:3001/api/auth/profile

Requires authentication.

Returns the authenticated user's JWT payload.

Product APIs
Get All Products
GET /products

Full URL:

http://localhost:3001/api/products

Public endpoint.

Returns all products.

Get Product by ID
GET /products/:id

Full URL example:

http://localhost:3001/api/products/PRODUCT_ID

Public endpoint.

Create Product
POST /products

Full URL:

http://localhost:3001/api/products

Requires:

JWT authentication
+
admin role

Example request:

{
  "name": "Wireless Headphones",
  "price": 1999,
  "category": "Electronics",
  "image": "https://example.com/headphones.jpg",
  "stock": 10
}
Update Product
PUT /products/:id

Requires:

JWT authentication
+
admin role
Delete Product
DELETE /products/:id

Requires:

JWT authentication
+
admin role
Cart APIs

All cart endpoints require JWT authentication.

Get Cart
GET /cart

Full URL:

http://localhost:3001/api/cart

Returns the authenticated user's cart.

Add Product to Cart
POST /cart

Full URL:

http://localhost:3001/api/cart

Request body:

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

If the product already exists in the cart, its quantity is increased.

Update Cart Item
PUT /cart/:productId

Full URL example:

http://localhost:3001/api/cart/PRODUCT_ID

Request body:

{
  "quantity": 3
}

Quantity must be at least 1.

Remove Cart Item
DELETE /cart/:productId

Full URL example:

http://localhost:3001/api/cart/PRODUCT_ID

Removes the specified product from the authenticated user's cart.

Order APIs

All order endpoints require JWT authentication.

Place Order
POST /orders

Full URL:

http://localhost:3001/api/orders

The backend:

Retrieves the authenticated user's cart.
Checks that the cart is not empty.
Reads the current product prices.
Calculates the total amount.
Creates the order.
Stores the purchased product prices in the order.
Clears the user's cart.

The newly created order defaults to:

pending
Get My Orders
GET /orders

Full URL:

http://localhost:3001/api/orders

Returns orders belonging to the authenticated user.

Example order structure:

{
  "user": "USER_ID",
  "items": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2,
      "price": 1999
    }
  ],
  "totalAmount": 3998,
  "status": "pending"
}
Database Design

The application uses four primary MongoDB collections.

User
User
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt

Supported roles:

user
admin
Product
Product
├── name
├── price
├── category
├── image
├── stock
├── createdAt
└── updatedAt
Cart

Each user has one cart.

Cart
├── user
└── items
    ├── product
    └── quantity

The product field references the Product collection.

Order
Order
├── user
├── items
│   ├── product
│   ├── quantity
│   └── price
├── totalAmount
├── status
├── createdAt
└── updatedAt

The order stores the product price at the time of purchase so that the order retains the original purchase price even if the product's current price changes later.

Supported order statuses:

pending
confirmed
shipped
delivered
cancelled

The current application creates orders with pending status. There is currently no separate order-status update API in the project.

Security
Password Hashing

Passwords are hashed using bcrypt before being stored in MongoDB.

Plain Password
      │
      ▼
    bcrypt
      │
      ▼
Hashed Password
      │
      ▼
   MongoDB

Passwords are never intentionally stored as plain text.

JWT Authentication

After successful login, the backend creates a JWT containing the user's ID and role.

Protected requests use:

Authorization: Bearer <JWT_TOKEN>

The JWT expires after one day.

Role-Based Authorization

Product creation, update, and deletion require the admin role.

User
 ├── View products
 ├── Manage own cart
 └── View own orders

Admin
 └── Product management
     ├── Create
     ├── Update
     └── Delete
Environment Variables

The backend uses environment variables for:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

Never commit the real .env file or expose MongoDB credentials or JWT secrets.

Installation & Setup
Prerequisites

Install:

Node.js
npm
Git
MongoDB Atlas account
Visual Studio Code
1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd E-commerce
2. Backend Setup

Open a terminal and run:

cd backend
npm install

Create:

backend/.env

Add:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001

Replace the placeholder values with your own credentials.

Start the backend:

npm run dev

The backend runs at:

http://localhost:3001

You can verify the backend is running by opening:

http://localhost:3001/

Expected response:

Backend is running...
3. Frontend Setup

Open a second terminal.

From the project root:

cd frontend
npm install

Start the frontend:

npm run dev

The frontend runs at:

http://localhost:5173

Open it in a browser:

http://localhost:5173
4. Run the Complete Application

You need two terminals.

Terminal 1 — Backend
cd backend
npm run dev
Terminal 2 — Frontend
cd frontend
npm run dev

Then open:

http://localhost:5173
Application Workflow

The complete customer workflow is:

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
Increase / Decrease Quantity
   │
   ▼
Remove Items if Needed
   │
   ▼
Place Order
   │
   ▼
Order Created
   │
   ▼
Cart Automatically Cleared
   │
   ▼
View My Orders
   │
   ▼
Logout
Frontend Pages
Route	Purpose	Authentication
/	Product listing	Public
/login	User login	Public
/register	User registration	Public
/cart	View and manage cart	Requires login
/orders	View user's orders	Requires login

The current frontend hides Cart and Orders navigation links when there is no JWT in local storage. The backend remains the authoritative protection layer for these resources.

Testing

The backend APIs can be tested using:

Postman
PowerShell Invoke-RestMethod
Browser for public GET endpoints

The frontend supports an end-to-end customer workflow:

Register
   ↓
Login
   ↓
Browse Products
   ↓
Add to Cart
   ↓
Update Quantity
   ↓
Remove Item
   ↓
Place Order
   ↓
Cart Cleared
   ↓
View Orders
   ↓
Logout
Admin API Testing

Admin product operations can be tested by obtaining a JWT belonging to a user whose role is:

admin

Then send the token as:

Authorization: Bearer <ADMIN_JWT>
Error Handling

The application handles common errors including:

Invalid login credentials
Duplicate user registration
Missing authentication token
Invalid or expired JWT
Unauthorized admin operations
Empty carts
Invalid product IDs
Product not found
Product not found in cart
Invalid cart quantity
Failed API requests
MongoDB connection failures
Development Practices

The project uses:

Modular backend structure
Separation of routes, controllers, models, and middleware
Reusable React components
Centralized Axios API configuration
Axios request interceptor for JWT authentication
Environment variables for sensitive configuration
Protected backend routes
User-specific cart and order data
Mongoose population for referenced product data
Git/GitHub for version control
Future Improvements

Potential future enhancements include:

Payment gateway integration
Product search and filtering
Product categories and category filtering
Product reviews and ratings
Wishlist functionality
Admin dashboard
Inventory management
Order status management interface
Pagination
Product image upload and cloud storage
Email notifications
Automated unit and integration testing
Production deployment
Learning Outcomes

This project provided practical experience with:

Full-stack web application development
MERN stack development
REST API design
React component architecture
Client-server communication
JWT authentication
Role-based authorization
Password hashing
MongoDB data modeling
Mongoose
MVC-style backend architecture
Protected API routes
Shopping cart workflows
Order processing
Git and GitHub
Author

Manoj Srinivas

Computer Science Engineering Student

License

This project is developed for educational and portfolio purposes.