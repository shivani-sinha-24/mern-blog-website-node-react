# mern-blogs-frontend

This is a simple blog application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to create, read, update, and delete (CRUD) blog posts. The backend API is secured using JSON Web Tokens (JWT), and the frontend is built using React. The application also supports file uploads using AWS S3, state management with Redux Thunk, and UI styling with Bootstrap.

# Live Url of mern-blog-website-node-react repo on vercel- https://mern-blog-website-node-react-a1zk.vercel.app/

# Github link- https://github.com/shivani-sinha-24/mern-blog-website-node-react


# Features
User authentication using JWT
Create, Read, Update, and Delete (CRUD) operations for blog posts
File uploads handled by AWS S3
Client-side routing using React Router
API integration and state management using Redux Thunk
Responsive and simple UI styled with Bootstrap

# Technologies Used
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, AWS S3 SDK
Frontend: React.js, React Router, Axios, Redux, Redux Thunk, Bootstrap
Others: Vercel (for deployment), GitHub (for version control)

# Installation
Prerequisites
Node.js
MongoDB (either local or MongoDB Atlas)
AWS S3 account with a configured bucket

# Backend
1. Clone the repository:
git clone https://github.com/shivani-sinha-24/mern-blog-website-node-react.git
cd mern-blog-website-node-react

2. Install dependencies:
cd backend
npm install

3. Create a .env file in the backend directory and add the following variables:
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region

4. Start the backend server:
npm start
The backend server will be running on http://localhost:3009.

# Frontend

1. Navigate to the frontend directory:
cd ../frontend

2. Install dependencies:
npm install

3. Start the frontend server:
npm start
The frontend server will be running on http://localhost:3000.

# Backend API
Endpoints
POST /user/signup: Register a new user
POST /user/login: Login and receive a JWT token
POST /user/get-user: Get detail of logged in user
POST /blog: Create a new blog post (requires JWT)
GET /blog: Retrieve all blog posts
GET /blog/:id  Retrieve a single blog post by ID
PUT /blog/:id  Update a blog post by ID (requires JWT)
DELETE /blog/:id  Delete a blog post by ID (requires JWT)

# Frontend
# State Management
The application uses Redux for state management, with Redux Thunk as middleware for handling asynchronous API calls.
Actions and reducers are structured to handle the loading, success, and error states for API requests.
# UI Styling
The application uses Bootstrap for styling the frontend, ensuring a responsive and modern UI.
Bootstrap components are utilized for forms, buttons, layouts, and more to enhance the user experience.

# File Uploads
Files (e.g., images) can be uploaded when creating or editing a blog post.
The uploaded files are stored in an AWS S3 bucket.
The backend handles the S3 upload process using the AWS SDK for JavaScript.
The S3 file URLs are then stored in MongoDB as part of the blog post document.

# Authentication
The application uses JWT for authentication.
After successful login, the JWT is stored in localStorage and is used to authenticate subsequent requests to protected routes.

# Error Handling
The backend API uses Express middleware to handle errors globally.
Proper error messages are returned with appropriate HTTP status codes.

# Security Considerations
Passwords are hashed using bcrypt before being stored in the database.
JWTs are used to secure API routes.
Input validation is implemented to prevent malicious data from being processed.
AWS credentials and other sensitive information are stored in environment variables.

# Performance
The application is optimized for performance with minimal re-renders on the frontend.
MongoDB is indexed to speed up queries.
Images and other assets are optimized for faster load times.
File uploads to AWS S3 are handled efficiently to ensure scalability.

# Design Decisions
MERN Stack: Chosen for its popularity, ease of use, and full-stack JavaScript environment.
JWT Authentication: Provides a stateless and secure way to manage user sessions.
Redux Thunk: Allows for efficient handling of asynchronous actions, particularly for API calls.
AWS S3: Used for scalable and secure storage of files, such as images associated with blog posts.
Bootstrap: Selected for its ease of use and wide range of pre-built UI components, enabling rapid and responsive design.