# Task Manager

This is a Task Manager configured with MongoDB for data storage. It includes essential environment variables to manage API endpoints and database connections.

## 🚀 Features

- Server-side rendering (SSR) and static site generation (SSG)
- MongoDB integration for data persistence
- API routes for backend functionalities
- Environment variables for configuration

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone [https://github.com/your-username/your-repo.git](https://github.com/Shwetank-nitp/task-manager.git)
cd task-manager
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:3000  # Update for production
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Update for production
```

### 4️⃣ Run the Development Server

```sh
npm run dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## 🚀 Deployment

### Build for Production

```sh
npm run build
npm start
```

Ensure your `.env.local` file is properly configured for the production environment.

## 📜 API Routes

- **`/api/task/create`** – Example API route to create a new task
- **`/api/task/update`** – Example API route to update a task
- **`/api/task/getAll`** – Example API route to get all the task
- **`/api/task/delete`** – Example API route to delete a task

## 🛠 Tech Stack

- **Next.js** – React framework for server-side rendering
- **MongoDB** – NoSQL database for storage
- **Tailwind CSS (optional)** – Utility-first CSS framework

## 📌 Notes

- Ensure **MongoDB** is running locally or use a cloud service like **MongoDB Atlas**.
- `BASE_URL` is used for backend requests, while `NEXT_PUBLIC_BASE_URL` is exposed to the client.
- Use **`.env.local`** to store sensitive credentials securely.
