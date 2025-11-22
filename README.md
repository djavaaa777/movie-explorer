
# Movie Explorer 🎬

Movie Explorer is a powerful full-stack web application built with **React (TypeScript)** on the frontend and **Node.js + Express + MongoDB** on the backend. It allows users to browse movies, search for titles, and manage a list of favorites with authentication.

## Features

- 🔍 **Movie Search** — Powered by TMDB API
- ❤️ **Add/Remove Favorites** — Favorites stored per user
- 🔐 **Authentication** — JWT-based register/login/logout
- 🧾 **Token Persistence** — Stored in localStorage
- 💡 **Responsive UI** — Clean layout and smooth UX
- 🌍 **Deployment** — Backend on Render, Frontend on Vercel

## Tech Stack

### Client
- React (TypeScript)
- React Router
- CSS (custom styling)
- TMDB API

### Server
- Node.js + Express
- MongoDB Atlas
- JWT + bcrypt
- CORS + dotenv

## Environment Variables

### Client
Create a `.env` file in the `/client` directory with:
```
REACT_APP_API_URL=https://<your-render-backend-url>/api
```

### Server
Create a `.env` file in the `/server` directory with:
```
PORT=5000
DB_USER=yourMongoDBUser
DB_PASSWORD=yourMongoDBPassword
DB_NAME=movie-explorer
JWT_SECRET=yourSecretKey
```

## Installation & Running Locally

```bash
git clone https://github.com/djavaaa777/movie-explorer.git
cd movie-explorer

# Setup server
cd server
npm install
npm run dev

# Setup client
cd ../client
npm install
npm start
```

## Deployment

- Frontend: [Vercel](https://vercel.com/)

## Demo

🌐 Mockup: <img width="1904" height="871" alt="image" src="https://github.com/user-attachments/assets/db642082-d211-45e1-af29-200f6698d925" />

## Author

👤 Javid Mustafayev

---
_This project is a portfolio-level fullstack app showcasing authentication, API integration, and deployment._


