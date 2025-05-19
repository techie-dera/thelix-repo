# Task Management Application

This is a Task Management application built with **React** for the frontend, **Express** for the backend, and **MySQL** for the database. This README will guide you through setting up and running the project locally.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- **Node.js** (>= 14.x)
- **MySQL** (>= 8.x)
- **Docker** (optional for containerization)
- **npm** or **yarn** (Node package managers)

## Project Structure

- **Frontend**: A React-based application that allows users to add and manage tasks.
- **Backend**: An Express API that handles task management, including adding, marking as done, and retrieving tasks from a MySQL database.

## Setup Instructions

Follow these steps to set up the project on your machine.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Setup Backend (Server)

#### a. Install Backend Dependencies

Navigate to the **backend** directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

#### b. Configure Environment Variables

Create a `.env` file in the **backend** directory and configure your MySQL connection settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=task_management_db
PORT=5000
```

#### c. Run MySQL Database

Ensure that MySQL is running on your machine. You can run MySQL locally, or if using Docker, you can run it in a container.

For local MySQL, start the MySQL service and ensure the `task_management_db` database is created:

```bash
mysql -u root -p
CREATE DATABASE task_management_db;
```

#### d. Start the Backend Server

Once your environment variables are set and MySQL is running, start the backend server:

```bash
npm start
```

The backend API will be available at `http://localhost:5000`.

### 3. Setup Frontend (React)

#### a. Install Frontend Dependencies

Navigate to the **frontend** directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install typescript@4.9.5
npm install
```

Run the frontend React app:

```bash
npm start
```

The frontend app will be available at `http://localhost:3000`.

### 4. Testing the Application

1. Open your browser and navigate to `http://localhost:3000`.
2. Add a task using the form on the page.
3. Check the **backend** database to ensure that the task has been added.
4. Mark a task as "done" from the UI and verify that the task is updated both in the UI and the backend.

### Optional: Docker Setup (for Production)

If you want to run both the frontend and backend in Docker containers, follow these steps:

1. **Build Docker Images:**

   In the **frontend** directory:

   ```bash
   docker build -t task-frontend .
   ```

   In the **backend** directory:

   ```bash
   docker build -t task-backend .
   ```

2. **Run Containers:**

   You can use Docker Compose to run both containers together. Here's a sample `docker-compose.yml` file:

   ```yaml
   version: '3'
   services:
     frontend:
       build: ./frontend
       ports:
         - "3000:3000"
     backend:
       build: ./backend
       environment:
         - DB_HOST=localhost
         - DB_USER=root
         - DB_PASS=your_mysql_password
         - DB_NAME=task_management_db
       ports:
         - "5000:5000"
       depends_on:
         - mysql
     mysql:
       image: mysql:latest
       environment:
         MYSQL_ROOT_PASSWORD: your_mysql_password
         MYSQL_DATABASE: task_management_db
       ports:
         - "3306:3306"
   ```

3. **Start Containers:**

   Run Docker Compose to start the application:

   ```bash
   docker-compose up --build
   ```

This will start both the frontend and backend in Docker containers, and you can access the app at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Troubleshooting

- If you encounter any issues related to database connection, ensure your **MySQL** service is running and properly configured in the `.env` file.
- If the frontend is not displaying tasks, verify that the API URL is correct and the backend server is running.
- For any issues with Docker, ensure that all containers are running and accessible on the specified ports.

## Conclusion

You now have a task management app running on your machine! Feel free to modify or extend it to suit your needs. If you have any questions or issues, feel free to open an issue in the GitHub repository.
