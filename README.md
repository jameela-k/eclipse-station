# 🚀 Eclipse Station

A space-themed React escape room for Software Engineering students.

Students solve coding, logic, math and pattern puzzles while racing against the clock.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

# Project Structure

eclipse-station/

client/
    React application

server/
    Express API
    MongoDB models
    Controllers
    Routes
    Seed data

---

# Local Setup

## 1. Clone the project

git clone YOUR_REPOSITORY_URL

cd eclipse-station

---

# Backend

cd server

npm install

Create:

.env

Add:

MONGO_URI=mongodb://127.0.0.1:27017/eclipse-station
PORT=5000
CLIENT_URL=http://localhost:5173

Seed the missions:

npm run seed

Start the server:

npm run dev

---

# Frontend

Open another terminal:

cd client

npm install

npm run dev

Open:

http://localhost:5173

---

# Missions

ECL-001
The Locked Station

ECL-002
Black Hole Protocol

ECL-003
Signal from Europa

ECL-004
Asteroid Impact

ECL-005
Station Zero

---

# Scoring

Completed mission:

500 XP

Each solved puzzle:

50 XP

Remaining time:

5 XP per 10 seconds

Hint:

-25 XP

---

# Deployment

## MongoDB Atlas

Create a free MongoDB Atlas cluster.

Create a database user.

Allow access from:

0.0.0.0/0

Copy the MongoDB connection string.

---

# Render

Create a new Web Service.

Root directory:

server

Build command:

npm install

Start command:

npm start

Add environment variables:

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

CLIENT_URL=YOUR_VERCEL_URL

---

# Seed Production Database

After deploying the backend:

Open the Render shell and run:

npm run seed

---

# Vercel

Create a new Vercel project.

Root directory:

client

Build command:

npm run build

Output directory:

dist

Add:

VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api

---

# Student Experience

Students only need the Vercel URL.

They do NOT need:

- VS Code
- Node.js
- MongoDB
- Git
- GitHub

They simply:

1. Open Eclipse Station
2. Enter their name
3. Select a mission
4. Solve the puzzles
5. Escape
6. Check the leaderboard