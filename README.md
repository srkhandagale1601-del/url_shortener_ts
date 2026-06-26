# 🔗 URL Shortener API

A production-style URL Shortener backend built with **TypeScript**, **Node.js**, **Express**, **PostgreSQL**, and **Prisma ORM**.

This application allows users to generate short URLs, store them in a PostgreSQL database, retrieve URL information using either an ID or shortcode, and redirect users to the original destination URL.

Designed as part of my backend development journey, this project focuses on clean architecture, database design, REST API development, and scalable backend practices.

---

## 🚀 Features

* Create shortened URLs
* Generate unique shortcodes using NanoID
* Store and manage URLs in PostgreSQL
* Retrieve URL details by ID
* Retrieve URL details by shortcode
* Redirect users using a shortcode
* Redirect users using a URL ID
* Modular backend architecture
* Type-safe development with TypeScript
* Prisma ORM integration for database operations

---

## 🛠️ Tech Stack

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| TypeScript | Type-safe backend development |
| Node.js    | Runtime environment           |
| Express.js | REST API framework            |
| PostgreSQL | Database                      |
| Prisma ORM | Database access layer         |
| NanoID     | Shortcode generation          |

---

## 📁 Project Structure

```text
src/
│
├── lib/
│   └── prisma.ts
│
├── modules/
│   └── url/
│       ├── url.routes.ts
│       ├── url.controller.ts
│       ├── url.service.ts
│       └── url.types.ts
│
├── app.ts
└── server.ts
```

---

## 🗄️ Database Schema

```prisma
model Url {
  id          String   @id @default(uuid())
  originalUrl String
  shortCode   String   @unique
  createdAt   DateTime @default(now())
}
```

---

## 📡 API Endpoints

### Create Short URL

```http
POST /urls
```

#### Request

```json
{
  "originalUrl": "https://google.com"
}
```

#### Response

```json
{
  "id": "7ca1e2e5-fe4f-4f86-af0d-47622f4e034d",
  "originalUrl": "https://google.com",
  "shortCode": "x6qedr",
  "createdAt": "2026-06-19T08:44:21.762Z"
}
```

---

### Get URL by Shortcode

```http
GET /urls/:shortCode
```

Example:

```http
GET /urls/x6qedr
```

---

### Get URL by ID

```http
GET /urls/id/:id
```

Example:

```http
GET /urls/id/7ca1e2e5-fe4f-4f86-af0d-47622f4e034d
```

---

### Redirect Using Shortcode

```http
GET /urls/:shortCode
```

Example:

```http
GET /x6qedr
```

➡️ Redirects to:

```text
https://google.com
```

---

### Redirect Using URL ID

```http
GET /url/id/:id
```

Example:

```http
GET /redirect/7ca1e2e5-fe4f-4f86-af0d-47622f4e034d
```

➡️ Redirects to:

```text
https://google.com
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone <repository-url>
cd url-shortener-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_connection_string"
```

---

## 🗃️ Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Running the Application

Development Mode:

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

---

## 🎯 Key Learnings

Through this project, I gained hands-on experience with:

* Building RESTful APIs using Express and TypeScript
* Designing modular backend architectures
* Managing PostgreSQL databases with Prisma ORM
* Database migrations and schema evolution
* Generating unique identifiers using NanoID
* Implementing URL redirection workflows
* Working with route parameters and controllers
* Debugging backend applications and database interactions

---

## 🔮 Future Enhancements

* Input validation with Zod
* Global error handling middleware
* Click tracking and analytics
* User authentication with JWT
* Custom short URL aliases
* URL expiration support
* Rate limiting and API security
* Redis caching
* Docker containerization
* CI/CD integration
* Cloud deployment (AWS, Railway, Render, or Fly.io)

---

## 👨‍💻 Author

**Sairaj Khandagale**.

Built as part of my backend development journey while learning TypeScript, Express, PostgreSQL, and Prisma.
