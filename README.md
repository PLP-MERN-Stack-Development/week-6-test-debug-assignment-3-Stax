# Bug Tracker Application (MERN Stack)

## Project Overview

This is a full-stack Bug Tracker application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a simple interface for managing software defects, allowing users to report, view, edit, and delete bugs. This project served as an assignment focused on debugging and ensuring the complete functionality of a MERN application.

## Features

* **Bug Reporting:** Create new bug entries with a title, description, status (Open, In Progress, Closed), and priority (Low, Medium, High).
* **Bug Listing:** View a list of all reported bugs on the main page.
* **Bug Details:** Access a dedicated page for each bug to view its comprehensive details, including automatically generated creation and last updated timestamps.
* **Bug Editing:** Modify existing bug information through a dedicated edit form.
* **Bug Deletion:** Permanently remove bug entries from the system.
* **Persistent Storage:** All bug data is stored and retrieved from a MongoDB database.
* **User Interface:** A basic, functional React frontend ensures an intuitive user experience.

## Technologies Used

### Frontend (Client)
* **React.js:** A JavaScript library for building dynamic user interfaces.
* **React Router DOM:** Used for client-side routing within the React application, enabling navigation between different views (Bug List, Report Bug, Bug Details).
* **Axios:** A promise-based HTTP client to make requests to the backend API.
* **pnpm:** A fast, disk space efficient package manager used for managing frontend dependencies.

### Backend (Server)
* **Node.js:** JavaScript runtime environment for building the server-side API.
* **Express.js:** A minimalist web framework for Node.js, used to build the RESTful API endpoints for bug management.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying interactions with the database.
* **MongoDB:** A NoSQL document database used for persistent storage of bug data.
* **CORS:** Middleware for Express.js to enable Cross-Origin Resource Sharing, allowing the frontend (localhost:3000) to communicate with the backend (localhost:5000).
* **Dotenv:** A module to load environment variables from a `.env` file, keeping sensitive configurations separate from the codebase.

## Setup and Installation

Follow these steps to set up and run the Bug Tracker application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js (LTS version recommended):** Download from [nodejs.org](https://nodejs.org/).
* **pnpm:** Install globally via npm: `npm install -g pnpm`.
* **MongoDB Community Server:** Download and install from [mongodb.com](https://www.mongodb.com/try/download/community). Ensure it's running.
* **MongoDB Compass (Optional but Recommended):** A GUI tool for interacting with MongoDB, helpful for verifying data.

### 1. Clone the Repository

Clone the project repository to your desired directory:

```bash
git clone [https://github.com/Stax-10/week-6-test-debug-assignment-3-Stax.git](https://github.com/Stax-10/week-6-test-debug-assignment-3-Stax.git) # Replace with your actual repository URL if different
cd week-6-test-debug-assignment-3-Stax

2. Backend Setup
Navigate into the server directory, install its dependencies, and configure environment variables.

Bash

cd server
pnpm install
Create a .env file:
In the server directory, create a file named .env with the following content:

Code snippet

PORT=5000
MONGO_URI=mongodb://localhost:27017/bugtracker_db
PORT: Defines the port for your backend server.

MONGO_URI: The connection string for your MongoDB database. Ensure MongoDB is running on localhost:27017.

3. Frontend Setup
Navigate into the client directory and install its dependencies.

Bash

cd ../client # Go back to the root directory, then into 'client'
pnpm install
How to Run the Application
You will need two separate terminal windows for the server and the client applications.

1. Start the Backend Server
In your first terminal window, navigate to the server directory and start the server:

Bash

cd ~/Desktop/SjAnaniasPLP/MERN/Week6_TestingDebugging/Assignment/week-6-test-debug-assignment-3-Stax/server
node src/server.js
You should see output confirming the database connection and server port.
Leave this terminal window open.

2. Start the Frontend Application
In your second terminal window, navigate to the client directory and start the React development server:

Bash

cd ~/Desktop/SjAnaniasPLP/MERN/Week6_TestingDebugging/Assignment/week-6-test-debug-assignment-3-Stax/client
pnpm start
This will compile the React application and automatically open it in your default web browser, usually at http://localhost:3000.

How to Use the Application
Once both the backend and frontend are running, open your browser to http://localhost:3000.

Initial View: You will see the "Bug List" page with navigation links "Bug List" and "Report New Bug". Initially, it will state "No bugs reported yet. Report one!".

Report a New Bug:

Click on "Report New Bug".

Fill in the form fields (Title, Description, Status, Priority).

Click "Report Bug".

You will receive a "Bug reported successfully!" alert and be redirected back to the "Bug List" page, where your new bug will be visible.

Verification: You can confirm the new bug appears in your bugtracker_db -> bugs collection in MongoDB Compass.

Edit a Bug:

On the "Bug List" page, click the "Edit" button next to a bug.

The form will pre-populate with the bug's current details.

Make your desired changes and click "Update Bug".

The bug will be updated in the list and in your MongoDB database.

View Bug Details:

On the "Bug List" page, click the title of any bug.

This will navigate you to a dedicated page showing all the details for that specific bug.

Delete a Bug:

On the "Bug List" page, click the "Delete" button next to a bug.

You will be prompted with a confirmation. Confirm the action.

The bug will be removed from the list and from your MongoDB database.

Debugging Journey & Solutions (Common Issues)
During the development and testing of this application, several common MERN stack issues were encountered and resolved:

Blank Page on Client (Initial Load):

Root Cause: Often due to syntax errors in client/public/manifest.json or incorrect paths/references to assets like logo192.png.

Solution: Corrected JSON syntax in manifest.json and ensured proper or removed references to assets that were not present or causing issues. Verified index.html was minimal and correct.

Uncaught TypeError: Cannot read properties of null (reading 'componentStack') at ErrorBoundary.jsx:

Root Cause: The ErrorBoundary component was attempting to access properties of this.state.error or this.state.errorInfo before an error had actually occurred, or when they were null.

Solution: Modified ErrorBoundary.jsx to correctly initialize its state and conditionally render error details only when hasError is true and error / errorInfo are not null.

Error: Element type is invalid: expected a string... but got: object.:

Root Cause: This frequently occurred when a React component (e.g., BugList.jsx, BugForm.jsx, BugDetails.jsx) was imported into App.jsx but was not properly exported using export default ComponentName; from its own file.

Solution: Ensured export default was correctly used at the end of each functional component file.

Module not found: Error: Can't resolve 'axios':

Root Cause: The axios package, used for HTTP requests, was not installed in the client's node_modules.

Solution: Ran pnpm install axios in the client directory.

TypeError: Bug.find is not a function on Server:

Root Cause: The Bug object imported into bugController.js was not a valid Mongoose Model, meaning mongoose.model('Bug', bugSchema) was likely missing or incorrect in server/src/models/Bug.js.

Solution: Verified that module.exports = mongoose.model('Bug', bugSchema); was present and correct in the Bug model file.

Credits
This project was developed as part of the PLP MERN Stack assignment, involving extensive debugging to achieve full functionality.