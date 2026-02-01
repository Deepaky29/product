# Product Management App

This is a **Full Stack MERN project** 

- **Frontend:** React.js (Vite)  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose)  
- **Deployment:** Backend on Render, Frontend on Vercel  

---

## 🔹 Features

- Login page for authentication  
- Product management: create, read, update, delete products  
- Published and unpublished product views  
- Responsive design based on Figma design  

---

## 🔹 Important Note About Login

> After entering credentials on the login page, **check the browser console** to verify login success.  
> This will help you bypass any frontend redirect issues and make testing easier.  

---

## 🔹 Project Structure

product/
│
├─ client/ # React frontend (Vite)
│ ├─ src/
│ └─ package.json
│
├─ server/ # Node.js + Express backend
│ ├─ routes/
│ ├─ controllers/
│ ├─ models/
│ └─ package.json
│
└─ README.md


---

## 🔹 Setup Instructions

### **Backend**

1. Navigate to the server folder:

bash
cd server
Install dependencies:

npm install
Create a .env file in server/ with the following environment variables:

MONGO_URI=<Your MongoDB connection URI>
Start backend locally:

npm run dev
The server will run on http://localhost:5000 (or PORT specified in .env)

Frontend
Navigate to the frontend folder:

cd client
Install dependencies:

npm install
Update API base URL in your frontend to point to the deployed backend (Render):

const API_BASE_URL = "https://product-2iie.onrender.com";
Start frontend locally:

npm run dev
The app will run on http://localhost:5173

Build frontend for production:

npm run build
🔹 Deployment
Backend: Deployed on Render

Frontend: Deployed on Vercel

Live URLs:

Backend: https://product-2iie.onrender.com

Frontend: https://product-ofu5.vercel.app/

🔹 Notes
Make sure to check the console after login to verify the authentication status.

.gitignore is included to ignore node_modules and .env files.

CRUD operations for products are fully functional with MongoDB persistence.

Follow the Figma design for UI and responsive layout.
