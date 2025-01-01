# Task Manager Application

## Overview

The **Task Manager Application** is a web application designed to manage tasks efficiently. Users can create, update, mark as complete or pending, and delete tasks. The app includes authentication and authorization features, ensuring only authorized users can access task-related operations. 

The project is built using **Next.js**, styled with **Tailwind CSS**, and utilizes **React Context API** for state management. **Axios** handles API requests, while **react-toastify** provides user-friendly notifications.

---

## Features

1. **Authentication**:
   - Login and signup for user accounts.
   - Persistent authentication with JWT stored in `localStorage`.

2. **Task Management**:
   - Create, view, edit, and delete tasks.
   - Mark tasks as completed or pending.
   - Real-time updates of task status.

3. **User Dashboard**:
   - Displays a summary of completed and pending tasks.

4. **Mobile-Responsive Navigation**:
   - A responsive navbar with dropdown functionality for mobile devices.

5. **Protected Routes**:
   - Ensures non-authenticated users are redirected to the login page when trying to access protected routes.

---

## Technologies Used

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - Axios
  - React Toastify

- **Backend** (expected API functionality):
  - REST API with endpoints for user authentication and task management.
  - Requires a `NEXT_PUBLIC_API_URL` environment variable pointing to the API base URL.

---

## Folder Structure

- **components/**: Reusable components like `Navbar`, `TaskItem`, `Layout`, etc.
- **context/**: `AuthContext` to manage user authentication state.
- **pages/**: Next.js pages for different routes like login, signup, tasks, etc.
- **utils/**: Helper for API interactions.
- **styles/**: Global CSS for the application.

---

## Running the Project Locally

### Prerequisites

- Node.js (v16+ recommended)
- NPM or Yarn
- A running backend API server
  - The backend should support the following endpoints:
    - `/auth/login` (POST): For user login
    - `/auth/signup` (POST): For user registration
    - `/auth/me` (GET): To fetch user details
    - `/tasks` (CRUD operations): For managing tasks
    - `/tasks/summary` (GET): To fetch task summary (completed/pending)

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/officialasishkumar/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. **Install Dependencies**:
   Using NPM:
   ```bash
   npm install
   ```
   Using Yarn:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
   Replace `http://localhost:8000` with your API server's base URL.

4. **Run the Application**:
   Using NPM:
   ```bash
   npm run dev
   ```
   Using Yarn:
   ```bash
   yarn dev
   ```

5. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Available Scripts

- **`npm run dev`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm start`**: Starts the app in production mode.
- **`npm run lint`**: Lints the project.

---

## Key Pages and Routes

1. **Authentication**:
   - `/login`: User login page.
   - `/signup`: User registration page.

2. **Tasks**:
   - `/tasks`: View and manage all tasks.
   - `/tasks/add`: Add a new task.
   - `/tasks/edit/[id]`: Edit an existing task.

3. **Dashboard**:
   - `/dashboard`: Displays a summary of tasks.

