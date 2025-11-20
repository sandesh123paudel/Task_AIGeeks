## AIGeeks Task

- Name: Sandesh Paudel
- Email: sandeshpaudel0618@gmail.com
- Contact: +977 9863464699
- https://www.linkedin.com/in/sandeshpaudel/

# Kanban Board Application

This repository contains a Kanban Board application built with React for the frontend and Node.js with Express for the backend. The application allows users to manage tasks across different columns (e.g., To Do, In Progress, Done) with full CRUD functionality integrated with a RESTful API.

### Features

- Create, Read, Update, and Delete tasks
- Drag and drop tasks between columns
- Persistent data storage using local storage and a backend API

### Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express, CORS

## Live Link (Data from Local Storage):

https://kanbanboard-sandesh.netlify.app/

## Live Link (Data from Backend API):

https://kanban-live-sandesh.netlify.app/

Backend API Link: https://task-aigeeks.onrender.com/

### Run the Project Locally

## Kanban Board Setup (For Data Stored in Local Storage)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sandesh123paudel/Task_AIGeeks
   ```
2. **Navigate to the Project Directory**
   ```bash
    cd Task_AIGeeks
   ```
3. **Setup Frontend**

   - Navigate to the frontend directory:
     ```bash
     cd kanban-board
     ```
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**
   - Open your web browser and navigate to `http://localhost:5173` to access the Kanban Board application.

## Kanban Board Setup (For Data from Backend API)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sandesh123paudel/Task_AIGeeks
   ```
2. **Navigate to the Project Directory**

   ```bash
   cd Task_AIGeeks

   ```

3. **Setup Backend**

   - Navigate to the backend directory:

     ```bash
     cd server
     ```

   - Create a `.env` file in the `server` directory and add the following environment variable:

     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ```

   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

4. **Setup Frontend**
   - Open a new terminal and navigate to the frontend directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
5. **Access the Application**
   - Open your web browser and navigate to `http://localhost:5173` to access the Kanban Board application.

## Thank You 🙏

## AIGeeks Task Completed by Sandesh Paudel
