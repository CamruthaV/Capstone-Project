# Capstone Project - Leveraging MERN Stack for Efficient Automated Test Paper Generation
<details>
<summary><b><font size="+1">Prerequisites</font></b></summary>

- Node.js (v14 or higher)
- npm or Yarn

</details>

<details>
<summary><b><font size="+1">Setup</font></b></summary>

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

</details>

<details>
<summary><b><font size="+1">Running in Production (optional)</font></b></summary>

1. Build the frontend:
  ```bash
  cd frontend
  npm run build
  ```

2. Serve the production build with the backend (configured in `backend/server.js`).

</details>

## Abstract

In the modern educational landscape, the need for efficient and automated test paper generation is paramount. Traditional methods of creating test papers are time-consuming and prone to human error. <br><br>
This Capstone Project aims to streamline the process of creating test papers by leveraging the MERN stack (MongoDB, Express, React, Node.js). <br><br> The system allows administrators to generate test papers with a mix of short and long questions, ensuring a balanced distribution of difficulty levels. By automating the test paper generation process, educational institutions can save time, reduce errors, and ensure consistency in the difficulty levels of the questions.<br><br> The application also incorporates secure access controls to ensure that only authorized users can generate and manage test papers. Overall, this project provides a robust solution for educational institutions to enhance their test paper creation process.

## Technologies Used

### Frontend Technologies

- **React**
  - A JavaScript library for building user interfaces, particularly single-page applications.
  - Used to build components like `GeneratedQuestionsPage`, `AdminPage`, and `QuestionForm`.

- **React Router**
  - A library for routing in React applications.
  - Used to navigate between different components and views.

- **Tailwind CSS**
  - A utility-first CSS framework for building custom designs without writing custom CSS.
  - Used for styling components with classes like `text-center`, `mt-10`, `border-2`, and `rounded-lg`.

- **Axios**
  - A promise-based HTTP client for making HTTP requests from the browser and Node.js.
  - Used to make API calls to the backend.

### Backend Technologies

- **Node.js**
  - A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - Used to run JavaScript on the server-side.

- **Express**
  - A minimal and flexible Node.js web application framework.
  - Used to create the server and define API routes.

- **Mongoose**
  - An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - Used to define schemas and interact with the MongoDB database.

- **MongoDB**
  - A NoSQL database that stores data in flexible, JSON-like documents.
  - Used as the database to store questions and other application data.


### Development Tools

- **Visual Studio Code (VS Code)**
  - A popular source-code editor developed by Microsoft.
  - Used for development, providing support for debugging, embedded Git control, syntax highlighting, and more.

- **Git**
  - A distributed version control system.
  - Used for version control, allowing developers to track changes, collaborate, and manage the codebase.

### API Design

- **RESTful API**
  - An architectural style for designing networked applications.
  - Used to define API endpoints for handling CRUD operations for questions.

### Data Handling

- **Aggregation Framework**
  - MongoDB's aggregation framework for processing data and returning computed results.
  - Used in the `getWeightedRandomQuestions` function to fetch random questions based on specified criteria.

## Features

- **Automated Test Paper Generation**
  - Allows administrators to generate test papers with a mix of short and long questions.
  - Ensures a balanced distribution of difficulty levels.

- **Random Question Selection**
  - Fetches random questions from the database based on specified criteria.
  - Uses weighted random selection to ensure the desired proportions of difficulty levels.

- **Secure Access**
  - Protects routes with authentication and authorization middleware.
  - Ensures that only authorized users can access certain endpoints.

## Conclusion

This Capstone Project leverages the MERN stack to create an efficient and automated test paper generation system. By combining modern frontend and backend technologies, the application provides a robust solution for educational institutions to streamline the process of creating test papers. The use of Git for version control and VS Code for development further enhances the development workflow, making it easier to build and maintain the application