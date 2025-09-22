# Interactive To-Do List Application

A full-stack, interactive to-do list application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows users to add, view, and delete tasks with data persistence through a connected database.


## 🌐 Live Website
👉 [Visit TODO-App here](https://todo-virid-xi.vercel.app/)


## ✨ Features

* **Create Tasks:** Easily add new tasks through a simple input field.
* **Delete Tasks:** Remove tasks with a single click.
* **Dynamic UI:** A responsive and user-friendly interface built with React.
* **Data Persistence:** Tasks are stored in a MongoDB database, so they persist across sessions.
* **RESTful API:** A backend API built with Node.js and Express to handle all task-related logic.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Deployment:** Vercel (Frontend), Render (Backend)



---

## 🔧 Getting Started

### Prerequisites

* Node.js (v14 or later)
* npm (Node Package Manager)
* A free MongoDB Atlas account

### Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/your-repo-name.git](https://github.com/YourUsername/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `server` directory and install the required packages.
    ```bash
    cd server
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the `server` directory and add your MongoDB connection string.
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

4.  **Install Frontend Dependencies:**
    Navigate to the `client` directory and install the required packages.
    ```bash
    cd ../client
    npm install
    ```

5.  **Run the Application:**
    * To start the backend server (from the `server` directory): `npm start`
    * To start the frontend development server (from the `client` directory): `npm start`

The application will be running with the frontend on `http://localhost:3000` and the backend on `http://localhost:5000`.

---

## API Endpoints

The backend server exposes the following RESTful API endpoints:

| Method | Endpoint         | Description          |
| :----- | :--------------- | :------------------- |
| `GET`  | `/api/tasks`     | Fetches all tasks.   |
| `POST` | `/api/tasks`     | Adds a new task.     |
| `DELETE`| `/api/tasks/:id` | Deletes a task by ID.|

````