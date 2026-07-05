# TaskFlow — A MERN Stack Task Manager

A complete, portfolio-ready project for practicing the full MERN stack:
**MongoDB, Express.js, React, Node.js**. It's a task manager with real user
accounts (JWT auth), full CRUD, search/filtering, and a small stats dashboard
with an animated "flow ring" progress indicator.

You already know Mongo/Express/Node and frontend basics — this project is
designed to make you *connect* them: real auth, protected routes on both
the client and server, and a UI that isn't just a bare CRUD form.

## Features

- **Auth**: register/login with hashed passwords (bcrypt) and JWT tokens
- **Protected API routes**: every task belongs to a user; you can't see or edit someone else's
- **Full CRUD** on tasks: title, description, category, priority, status, due date
- **Search + filters**: by status, by category, live text search
- **Dashboard stats**: total / to do / in progress / done + a completion-rate ring
- **Polished UI**: Tailwind CSS, custom color system, Fraunces + Inter type pairing
- **Toast notifications** for every action (success/error), so the app never feels silent

## Tech stack

| Layer      | Tech |
|------------|------|
| Database   | MongoDB + Mongoose |
| Backend    | Node.js + Express.js, JWT, bcryptjs |
| Frontend   | React 18 (Vite), React Router, Axios, Tailwind CSS, react-hot-toast |

## Project structure

```
mern-taskflow/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── models/User.js          # User schema (password hashing)
│   ├── models/Task.js          # Task schema
│   ├── middleware/auth.js      # JWT verification middleware
│   ├── controllers/            # Route logic (auth + tasks)
│   ├── routes/                 # Express routers
│   ├── server.js               # App entry point
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js        # Axios instance with auth interceptor
    │   ├── context/AuthContext.jsx
    │   ├── components/         # Navbar, TaskCard, TaskForm, StatsBar
    │   ├── pages/               # Landing, Login, Register, Dashboard
    │   ├── App.jsx              # Routes (protected + public)
    │   └── main.jsx
    ├── tailwind.config.js
    └── index.html
```

## Setup in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- MongoDB running locally, **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- VS Code with the "ES7+ React/Redux" and "MongoDB for VS Code" extensions (optional but helpful)

### 1. Open the project
Unzip the project and open the `mern-taskflow` folder in VS Code (`File → Open Folder`).

Open a terminal with **Terminal → New Terminal** (or `` Ctrl+` ``). By default VS Code
on Windows opens PowerShell — to use **Command Prompt** instead, click the
dropdown arrow next to the `+` in the terminal panel and choose **Command Prompt**,
or set it permanently: `Ctrl+Shift+P` → "Terminal: Select Default Profile" → **Command Prompt**.

Open a **second terminal** the same way (click the `+` icon, or `` Ctrl+Shift+` ``)
so backend and frontend can run at the same time — switch between the two
terminal tabs shown at the top of the panel.

### 2. Backend setup

**Command Prompt (cmd.exe):**
```cmd
cd backend
npm install
copy .env.example .env
```

**Bash / macOS / Linux terminal (if you're not on Windows):**
```bash
cd backend
npm install
cp .env.example .env
```

Open the new `.env` file in VS Code and set your own values:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=make_this_a_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```
If you're using Atlas, `MONGO_URI` will look like:
`mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taskflow`

Start the backend (same command either way):
```cmd
npm run dev
```
You should see `✅ MongoDB connected` and `✅ TaskFlow API listening on http://localhost:5000`.
Leave this terminal running — switch to the second terminal for the frontend.

### 3. Frontend setup

Switch to your second terminal tab, then (same commands on cmd, PowerShell, or bash):
```cmd
cd frontend
npm install
npm run dev
```
Open the URL Vite prints (usually `http://localhost:5173`).

### Command Prompt notes
- `cd backend` / `cd frontend` are relative to wherever the terminal opened —
  if it opened at `mern-taskflow\`, `cd backend` is correct. Run `cd` alone to print your current path if you're unsure.
- `copy` (not `cp`) duplicates a file in cmd.exe; `del` (not `rm`) deletes one.
- To stop a running server, click into that terminal and press `Ctrl+C`, then confirm with `Y` if prompted.
- If `npm` isn't recognized, Node.js isn't on your PATH — reinstall Node.js and restart VS Code.

### 4. Try it out
1. Click **Get started** → create an account
2. Add a few tasks with different categories/priorities
3. Use the status button on each card to move it through **To Do → In Progress → Done**
4. Watch the flow ring on the dashboard update as tasks complete

## API reference

| Method | Endpoint            | Auth | Description |
|--------|---------------------|------|-------------|
| POST   | `/api/auth/register`| No   | Create account, returns JWT |
| POST   | `/api/auth/login`   | No   | Log in, returns JWT |
| GET    | `/api/auth/me`       | Yes  | Get current user |
| GET    | `/api/tasks`         | Yes  | List tasks (`?status=&category=&search=`) |
| GET    | `/api/tasks/stats`   | Yes  | Task counts + completion rate |
| POST   | `/api/tasks`         | Yes  | Create a task |
| PUT    | `/api/tasks/:id`     | Yes  | Update a task |
| DELETE | `/api/tasks/:id`     | Yes  | Delete a task |

Send the JWT as `Authorization: Bearer <token>` for all protected routes.

## What this project teaches you

- **Schema design & relationships** — tasks reference a `user` via ObjectId
- **Password security** — never storing plaintext, bcrypt hashing
- **Stateless auth** — JWTs, protecting routes with middleware
- **REST API design** — resourceful routes, status codes, error handling
- **React state & data fetching** — `useEffect`, debounced search, loading/empty states
- **Client-side auth flow** — context, protected routes, auto-logout on expired tokens
- **Real UI craft** — a deliberate color/type system instead of default Bootstrap-y styling

## Stretch goals (once the base project works)

Pick any of these to push into "intermediate → advanced" territory:
1. **Drag-and-drop** columns (To Do / In Progress / Done) using `@dnd-kit` or `react-beautiful-dnd`
2. **Pagination or infinite scroll** for large task lists
3. **Due-date reminders** — highlight overdue tasks in red
4. **Dark mode** toggle using Tailwind's `dark:` variants
5. **Image/avatar upload** for user profiles (Multer + Cloudinary)
6. **Deploy it**: backend on Render/Railway, frontend on Vercel/Netlify, DB on Atlas
7. **Testing**: add Jest + Supertest for the API, React Testing Library for components

## Troubleshooting

- **"MongoDB connection error"** → check `MONGO_URI` in `.env`, and that `mongod` is running if local
- **CORS errors in the browser** → confirm `CLIENT_URL` in backend `.env` matches your Vite URL
- **401 errors after login** → check that `JWT_SECRET` didn't change between requests (restarting the server with a new secret invalidates old tokens)
- **Tailwind styles not applying** → make sure `npm run dev` was restarted after editing `tailwind.config.js`
