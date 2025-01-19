# Capstone Project - Leveraging MERN Stack for Efficient Automated Test Paper Generation

## Prerequisites
- Node.js (v14 or higher)
- npm or Yarn

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/CamruthaV/Capstone-Project.git
    ```

2. Install dependencies:
    - Frontend:
      ```bash
      cd frontend
      npm install
      ```

    - Backend:
      ```bash
      cd ../backend
      npm install
      ```

3. Set up environment variables:
    - Create a `.env` file in both `frontend` and `backend` folders (if required).
    
4. Run the servers:
    - Start backend server:
      ```bash
      cd backend
      npm start
      ```
    - Start frontend server:
      ```bash
      cd frontend
      npm start
      ```

5. Visit `http://localhost:3000` in your browser to view the app.

## Running in Production (optional)

1. Build the frontend:
    ```bash
    cd frontend
    npm run build
    ```

2. Serve the production build with the backend (configured in `backend/server.js`).