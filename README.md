# 🚀 Eclipse Station

A space-themed interactive web application built for Software Engineering students.

Eclipse Station challenges students with interactive coding, logic, problem-solving, and puzzle-based activities in a fun, game-like environment.

## ✨ Features

* Interactive missions and challenges
* Puzzle-based activities
* Mission progress tracking
* Score and XP system
* Results and leaderboard
* Responsive user interface
* Backend API with database integration

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* CSS

### Backend

* Node.js
* Express
* MongoDB
* Mongoose

### Deployment

* Vercel
* Render
* MongoDB Atlas

---

# 📁 Project Structure

```text
eclipse-station/
│
├── client/
│   ├── React application
│   ├── Components
│   ├── Pages
│   └── Styles
│
└── server/
    ├── Express API
    ├── Models
    ├── Controllers
    ├── Routes
    └── Seed data
```

---

# 🚀 Local Setup

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd eclipse-station
```

## 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
CLIENT_URL=http://localhost:5173
```

Seed the database if required:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

---

## 3. Set Up the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# 🌐 Deployment

Eclipse Station can be deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

### Backend Environment Variables

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
CLIENT_URL=YOUR_FRONTEND_URL
PORT=5000
```

### Frontend Environment Variables

```env
VITE_API_URL=YOUR_BACKEND_API_URL
```

Make sure the frontend API URL points to the deployed backend.

---

# 🎮 Student Experience

Students interact with the application through the deployed frontend.

They can:

1. Open Eclipse Station
2. Enter their name or information if required
3. Browse available missions
4. Select a mission
5. Complete the challenges
6. View their results
7. Track their progress
8. Check the leaderboard

Students do not need to install or configure the project's development tools to use the deployed application.

---

# 📌 Notes

This project is designed as an educational game-based experience for Software Engineering students.

The missions, challenges, scoring system, and content can be customized and expanded as the project develops.
