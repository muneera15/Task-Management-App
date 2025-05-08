📝 Task Management App
A full-stack Task Management Application built with the MERN stack that enables users to manage their projects and associated tasks efficiently. Includes authentication, CRUD functionality, and a responsive UI.

📸 Screenshots

 Login Page : (frontend/public/screenshots/Login.png)
 Signup Page : (frontend/public/screenshots/Signup.png)
 Projects-Dashboard : (frontend/public/screenshots/Projects-dashboard.png)
 Tasks : (frontend/public/screenshots/Project-Tasks.png)

🚀 Features
🔐 User Authentication (Login, Signup with JWT)

📁 Create, Edit, Delete Projects and Tasks

✅ View and manage tasks (per project)

🎨 Responsive and clean UI (TailwindCSS)

🧠 Protected Routes

🔃 Live updates on actions (Edit/Delete)

📦 RESTful API integration

🛠️ Tech Stack
Frontend:
React.js
TailwindCSS
React Router DOM

Backend:
Node.js
Express.js
MongoDB (Mongoose)
JWT (Authentication)

📂 Folder Structure

frontend/
│
├── src/
│   ├── components/       Reusable UI components (Navbar, InputBox, Button, etc.)
│   ├── pages/            # Route-specific pages (Login, Projects, Tasks)
│   ├── utils/            # Axios instance
│   ├── App.jsx
│   └── main.jsx
│
└── public/
⚙️ Getting Started
Prerequisites
Node.js & npm
MongoDB (local or Atlas)
Git

Installation
1. Clone the Repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

2. Setup Backend
cd backend
npm install
Create a .env file in the backend directory:
Edit
PORT= port
MONGO_URI= your_mongodb_connection_string
JWT_SECRET= your_jwt_secret

Start the server:
npm run dev

3. Setup Frontend
cd frontend
npm install
npm run dev

🔑 Environment Variables
For the backend (.env):

Key	        Description
PORT	    Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT signing

👩‍💻 Author
Muneera Shaik
📧 muneerashaik03@gmail.com
🔗 https://www.linkedin.com/in/muneera-shaik
