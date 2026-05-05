Nice — I’ve upgraded it into a **GitHub-ready professional README** with:

* 🔰 Badges (stack + status style)
* 🧠 ER Diagram (Mermaid)
* 🖼️ Screenshot placeholders section
* ✨ Cleaner structure
* 📌 More “portfolio-level” presentation

You can paste this directly into your repo.

---

````md id="readme-v2"
# 🛒 MERN E-Commerce Platform

![MERN Stack](https://img.shields.io/badge/MERN-FullStack-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![JWT Auth](https://img.shields.io/badge/Auth-JWT-red)
![Status](https://img.shields.io/badge/Status-Active-success)

A full-stack **e-commerce web application** built using the MERN stack with PostgreSQL, featuring authentication, role-based access, product management, cart, wishlist, and order system.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- Context API / State Management
- Tailwind CSS / CSS Modules

### Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcrypt.js

### Database
- PostgreSQL

---

## ✨ Features

### 👤 Authentication System
- User registration & login
- JWT-based authentication
- Protected routes
- Role-based access (Admin / User)

### 🛍️ User Features
- Browse products
- Add/remove from cart
- Wishlist management
- Place orders
- View order history

### 🧑‍💼 Admin Features
- Add / update / delete products
- Manage users & roles
- View all orders
- Inventory control

### 📦 Order System
- Transaction-safe order creation
- OrderItems mapping with products
- Order tracking support

---

## 🧠 Database Design (ER Diagram)

```mermaid
erDiagram

    USER ||--o{ ORDER : places
    ORDER ||--o{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : appears_in

    USER ||--o{ WISHLIST : has
    PRODUCT ||--o{ WISHLIST : saved_in

    USER {
        int id PK
        string name
        string email
        string password
        string role
    }

    PRODUCT {
        int id PK
        string name
        float price
        string description
    }

    ORDER {
        int id PK
        int userId FK
        string status
    }

    ORDER_ITEM {
        int id PK
        int orderId FK
        int productId FK
        int quantity
    }

    WISHLIST {
        int id PK
        int userId FK
        int productId FK
    }
````

---

## 🗂️ Project Structure

```
/client   → React frontend
/server   → Node + Express backend
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 4. Run Full App

```bash
npm run dev
```

---

## 📸 Screenshots

> Add your screenshots here

### 🏠 Home Page

![Home](https://via.placeholder.com/900x400?text=Home+Page)

### 🛍️ Product Page

![Products](https://via.placeholder.com/900x400?text=Products+Page)

### 🛒 Cart Page

![Cart](https://via.placeholder.com/900x400?text=Cart+Page)

### 🔐 Login Page

![Login](https://via.placeholder.com/900x400?text=Login+Page)

---

## 🔐 Authentication Flow

* JWT token stored in localStorage
* Axios interceptor attaches token to requests
* Backend middleware validates token
* Role-based access control for admin routes

---

## 🔗 API Overview

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Products

* `GET /api/products`
* `POST /api/products` (Admin)
* `PUT /api/products/:id` (Admin)
* `DELETE /api/products/:id` (Admin)

### Cart

* `POST /api/cart`
* `GET /api/cart`
* `DELETE /api/cart/:id`

### Orders

* `POST /api/orders`
* `GET /api/orders/user`
* `GET /api/orders` (Admin)

---

## 🛠️ Future Improvements

* 💳 Payment gateway (Razorpay / Stripe)
* 🔍 Product search & filters from backend
* 📦 Order tracking system
* ☁️ Image upload (Cloudinary)
* 📊 Analytics dashboard

---

## 👨‍💻 Author

Built by **Tushar 🚀**

