# UI Project Fullstack

This project is a fullstack application with a React frontend and an Express backend.

## Project Structure

- `backend/`: Contains the Express server and API.
- `frontend/`: Contains the React application.

## Getting Started

To get started with this project, clone the repository and run the following commands:

1. Install root dependencies for running concurrent scripts:
    ```
    npm install
    ```

2. Install all dependencies for both frontend and backend:
    ```
    npm run install-all
    ```

3. To start both the frontend and backend servers concurrently:
    ```
    npm start
    ```

The frontend application will run on `http://localhost:4000` and the backend on `http://localhost:8080`.

## Scripts

- `start`: Runs both the frontend and backend.
- `start-backend`: Runs the backend server.
- `start-frontend`: Runs the frontend server.
- `install-all`: Installs dependencies for both frontend and backend.
- `install-backend`: Installs backend dependencies.
- `install-frontend`: Installs frontend dependencies.

For more detailed information, check the `package.json` files in the respective `Frontend` and `Backend` directories.
