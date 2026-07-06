# URL Shortener API

A RESTful URL Shortener built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**. The project demonstrates production-oriented backend development through layered architecture, request validation, centralized error handling, logging, rate limiting, health monitoring, and integration testing.

---

## 🚀 Features

- 🔗 Create shortened URLs
- ↪️ Redirect users using short codes
- 📊 Retrieve URL analytics
- ✅ Request validation with Zod
- 🛡️ Centralized error handling
- 📝 Request logging middleware
- 🚦 Rate limiting
- ❤️ Health check endpoint
- 🧪 Integration testing with Vitest & Supertest
- 🗄️ PostgreSQL persistence
- 📦 Modular and scalable project structure

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| Validation | Zod |
| Testing | Vitest, Supertest |

---

# 🏗️ Architecture

The application follows a layered architecture to separate concerns and improve maintainability.

```text
                Client
                   │
                   ▼
         Express Application
                   │
      ┌────────────┴────────────┐
      │                         │
      ▼                         ▼
   Logger                 Rate Limiter
                   │
                   ▼
          Validation Middleware
                   │
                   ▼
                 Routes
                   │
                   ▼
              Controllers
                   │
                   ▼
                Services
                   │
                   ▼
              PostgreSQL
```

---

## 📂 Project Structure

```text
src/
│
├── config/
├── middleware/
│
├── modules/
│   ├── health/
│   │   ├── health.controller.ts
│   │   ├── health.routes.ts
│   │   └── health.service.ts
│   │
│   └── url/
│       ├── url.controller.ts
│       ├── url.routes.ts
│       ├── url.service.ts
│       ├── url.validation.ts
│       └── url.repository.ts
│
├── utils/
├── app.ts
└── server.ts

tests/
│
├── setup.ts
│
└── integration/
    ├── health.test.ts
    └── url.test.ts
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/urls` | Create a shortened URL |
| GET | `/urls/:shortCode` | Redirect to the original URL |
| GET | `/urls/:shortCode/stats` | Retrieve URL statistics |
| GET | `/health` | Health check endpoint |

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
DATABASE_URL=your_database_url
BASE_URL=http://localhost:3000
```

---

## 4. Run the Development Server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

# 🧪 Running Tests

Run all tests

```bash
npm test
```

Watch mode

```bash
npm run test:watch
```

Generate coverage

```bash
npm run test:coverage
```

---

# 📖 Example API Usage

## Create Short URL

### Request

```http
POST /urls
Content-Type: application/json
```

```json
{
  "originalUrl": "https://example.com"
}
```

### Response

```json
{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "shortCode": "Ab12Cd",
    "shortUrl": "http://localhost:3000/Ab12Cd"
  }
}
```

---

## Redirect

```http
GET /urls/Ab12Cd
```

Returns:

```
302 Found
```

Redirects to the original URL.

---

## URL Statistics

```http
GET /urls/Ab12Cd/stats
```

Example Response

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com",
    "shortCode": "Ab12Cd",
    "clicks": 15,
    "createdAt": "2026-07-06T12:00:00.000Z"
  }
}
```

---

## Health Check

```http
GET /health
```

Example Response

```json
{
  "status": "UP",
  "timestamp": "2026-07-06T12:30:00.000Z",
  "uptime": 1024.53
}
```

---

# 🧩 Middleware

The project includes the following middleware:

- Logger
- Rate Limiter
- Request Validation
- Async Handler
- Global Error Handler

---

# ✅ Testing

Integration tests cover:

- Health endpoint
- URL creation
- Request validation
- URL redirection
- URL statistics
- Rate limiting

---

# 📈 Future Improvements

- Authentication
- Custom aliases
- Redis integration
- URL expiration
- Docker & CI/CD
- Swagger documentation

---

# 🌐 Deployment

**Live API**

> https://your-deployment-url.com

---

# 📸 Screenshots

Add screenshots after deployment.

Suggested screenshots:

- API request in Postman/Bruno
- Health endpoint response
- URL creation response
- URL statistics response
- Test suite passing
- Live deployed application

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sairaj Khandagale**

Backend Developer | Learning Node.js, TypeScript, PostgreSQL, and System Design
This project is part of my journey toward building production-ready backend systems.
