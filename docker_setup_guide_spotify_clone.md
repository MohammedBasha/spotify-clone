# Docker Setup Guide (Spotify Clone - MERN + Socket.IO)

This document explains how to run, build, and deploy the Spotify Clone using Docker. It is designed so that any developer or recruiter can run the project with minimal setup.

---

# 🚀 Overview

This project is a fully Dockerized MERN application that includes:

- React Frontend (Vite)
- Node.js + Express Backend
- MongoDB Atlas (Cloud Database)
- Socket.IO Real-time communication
- Clerk Authentication
- Cloudinary Media Uploads

---

# 🧱 Architecture

```
Frontend (Docker)  →  Backend (Docker)  →  MongoDB Atlas
        ↓                    ↓
     Nginx             Express API + Socket.IO
```

---

# 📦 Prerequisites

Make sure you have installed:

- Docker Desktop
- Git

---

# 📥 Clone the project

```bash
git clone https://github.com/your-username/spotify-clone
cd spotify-clone
```

---

# ⚙️ Environment Setup

## 1. Create `.env` file

Copy from example:

```bash
cp .env.example .env
```

---

## 2. Backend `.env` example

```env
PORT=5000
CLIENT_URL=http://localhost:3000

MONGODB_URI=your_mongo_connection_string

CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud

CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
```

---

## 3. Frontend `.env`

Create inside frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

---

# 🐳 Docker Setup

## 1. Build and run everything

```bash
docker-compose up --build
```

---

## 2. Access the app

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

# 🧪 Docker Images (Optional)

You can also pull prebuilt images:

```bash
docker pull mohammedbasha/spotify-backend
docker pull mohammedbasha/spotify-frontend
```

---

# 📦 Manual Docker Build (Optional)

## Backend

```bash
docker build -t spotify-backend ./backend
docker run -p 5000:5000 spotify-backend
```

## Frontend

```bash
docker build -t spotify-frontend ./frontend
docker run -p 3000:80 spotify-frontend
```

---

# 🧠 Database Setup (Important)

This project uses MongoDB Atlas.

### You DO NOT store data in Docker.

Instead:

- Database is hosted externally
- Connection is handled via `MONGODB_URI`

---

# 🌱 Seeding the database

After running containers:

```bash
docker exec -it backend npm run seed:songs
```

```bash
docker exec -it backend npm run seed:albums
```

This will populate:

- Songs
- Albums

---

# 🚀 Production Build (Concept)

In production:

- Frontend is built using `vite build`
- Backend serves static files
- API routes remain under `/api`

---

# ⚠️ Common Issues

## 1. API calls go to wrong URL

❌ Wrong:

```
http://localhost:3000/api
```

✅ Correct:

```
http://localhost:5000/api
```

---

## 2. Environment variables not loaded

Make sure:

- `.env` exists
- Frontend is rebuilt after changes

```bash
npm run build
```

---

## 3. Docker containers not starting

Run:

```bash
docker ps
```

Check logs:

```bash
docker logs <container_id>
```

---

# 🔥 One-command startup

The entire project runs with:

```bash
docker-compose up --build
```

---

# 👨‍💻 Developer Notes

- Never hardcode API URLs
- Always use `.env`
- Always rebuild frontend after env changes
- Use MongoDB Atlas for persistence

---

# 🏁 Summary

This project demonstrates:

- Full MERN architecture
- Docker multi-service setup
- Real-time communication (Socket.IO)
- Authentication (Clerk)
- Cloud media handling (Cloudinary)
- Production-ready deployment structure

---

# 📌 Author

Built as a learning project to demonstrate:

- Docker
- Full-stack architecture
- Production deployment practices
