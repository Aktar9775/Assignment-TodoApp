# 📝 Secure Todo Web Application (Role-Based Authentication)

This project is a **full-stack Todo Web App** built using **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**.  
Users can register, log in, and manage their todos securely. The app is designed with **role-based access control**, where admin users can view or manage other users’ todos.

---
## Important Note :
-  To Active Admin Panel Press =>   ctrl + shift + B
-  To Active Admin Panel one user role should be 'admin'
## UI:
<img width="250" height="300" alt="Screenshot 2025-10-30 012803" src="https://github.com/user-attachments/assets/067f8f35-e525-496c-bcb7-4397610ac5c2" />
 <img width="250" height="300" alt="Screenshot 2025-10-30 012824" src="https://github.com/user-attachments/assets/3dadd81e-3d1f-4a30-a405-24ce957aa034" />
<img width="250" height="300" alt="Screenshot 2025-10-30 012836" src="https://github.com/user-attachments/assets/c28a7a00-51b1-4196-8f99-e45fdbc45db0" />
<img width="250" height="300" alt="Screenshot 2025-10-30 012741" src="https://github.com/user-attachments/assets/8d468cac-225b-4c77-b7d6-e27efb19f407" />

## 🚀 Project Overview

### Features
- 🔐 User registration and login with JWT authentication  
- 🧩 Role-based access control (`user`, `admin`)  
- 🗂️ CRUD operations for Todos  
- 📅 Each todo supports title, description, due date, category, and completion status  
- 🌐 MongoDB Atlas integration  
- ⚙️ Environment-based configuration  
- 🧱 Express middleware for validation and error handling  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Aktar9775/Assignment-TodoApp.git
cd Assignment-TodoApp
```
### 2️⃣ Install dependencies
```bash
npm install
```
### Create a .env file in the project root
```
PORT=5000
MONGO_URI=mongodb+srv://sohelnousad_db_user:Z7p7ugRNhMzQwVMy@cluster0.yp14v2p.mongodb.net/secure_todo_db?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```
## 🧩 How to Run the App
### SERVER
```
CD SERVER
npm run dev
```
### CLIENT
```
CD CLIENT
npm run dev
```
## Tech Stack
| Layer          | Technology              |
| -------------- | ----------------------- |
| Frontend       | React.js (planned)      |
| Backend        | Node.js, Express.js     |
| Database       | MongoDB Atlas           |
| Authentication | JWT + bcrypt            |
| Validation     | express-validator       |


