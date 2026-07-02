# 🔗 URL Shortener API

A production-style URL Shortener REST API built with **TypeScript**, **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**.

The project follows a clean, layered architecture with request validation, centralized error handling, reusable middleware, and a service-oriented design. It is being developed as part of my backend engineering journey, focusing on writing scalable and maintainable backend applications.

---

## ✨ Features

### URL Management

- Create shortened URLs
- Generate unique short codes using NanoID
- Redirect users using short URLs
- Track click analytics
- Retrieve URL statistics

### Backend Architecture

- Feature-based folder structure
- Layered architecture (Controller → Service → Database)
- Request validation using Zod
- Async controller wrapper
- Global error handling
- Custom application errors
- Standardized API responses

### Database

- PostgreSQL
- Prisma ORM
- Type-safe database operations
- Database migrations

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe backend development |
| Node.js | Runtime environment |
| Express.js | REST API framework |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| Zod | Request validation |
| NanoID | Short code generation |

---

# 🏗 Architecture

The application follows a layered architecture.

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Validation Middleware
   │
   ▼
Controller
   │
   ▼
Service Layer
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

Error flow:

```text
Application Error
        │
        ▼
Async Handler
        │
        ▼
Global Error Middleware
        │
        ▼
HTTP Response
```

---

## 📁 Project Structure

```text
src/
│
├── config/
│   └── env.ts
│
├── errors/
│   ├── AppError.ts
│   └── NotFoundError.ts
│
├── lib/
│   └── prisma.ts
│
├── middleware/
│   ├── asyncHandler.ts
│   ├── errorHandler.ts
│   └── validate.ts
│
├── modules/
│   └── url/
│       ├── url.controller.ts
│       ├── url.routes.ts
│       ├── url.service.ts
│       ├── url.validation.ts
│       └── url.types.ts
│
├── utils/
│   ├── apiResponse.ts
│   └── generateShortCode.ts
│
├── app.ts
└── server.ts
```

---

## 📡 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/urls` | Create a shortened URL |
| GET | `/:shortCode` | Redirect to original URL |
| GET | `/:shortCode/stats` | Retrieve URL statistics |

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd url-shortener-api
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file.

```env
DATABASE_URL=your_database_connection_string
PORT=3000
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## 🧪 Current Capabilities

- ✅ URL shortening
- ✅ URL redirection
- ✅ Click tracking
- ✅ URL statistics
- ✅ Request validation
- ✅ Centralized error handling
- ✅ Consistent API responses

---

## 🚧 Planned Improvements

- Custom short URL aliases
- URL expiration
- Request logging middleware
- Rate limiting
- Health check endpoint
- Integration testing
- Docker support
- Cloud deployment

---

## 📚 Key Learnings

This project helped me gain practical experience with:

- Building RESTful APIs using Express and TypeScript
- Designing layered backend architectures
- PostgreSQL database modeling
- Prisma ORM
- Request validation with Zod
- Global exception handling
- Custom application errors
- Middleware design
- Service-oriented architecture
- Click analytics implementation
- Writing reusable backend utilities

---

## 👨‍💻 Author

**Sairaj Khandagale**

Backend Developer | Learning Node.js, TypeScript, PostgreSQL, and System Design

This project is part of my journey toward building production-ready backend systems.
