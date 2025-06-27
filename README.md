# 🔐 User Authentication System (Node.js + MySQL)

This is a simple authentication system built with **Node.js**, **Express**, **MySQL**, and **JWT**, supporting the following features:

- Signup
- Login
- Forgot Password (Email-based)
- Reset Password

---

## 🗄️ Database Setup

Run the following SQL commands to set up your database and table:

```sql
CREATE DATABASE your_database_name;
USE your_database_name;

CREATE TABLE UserTable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  resetToken VARCHAR(255),
  resetExpires DATETIME
);





🚀 API Endpoints
✅ 1. Signup API
Endpoint: POST http://localhost:5000/user/signup

Body (JSON):
{
  "firstName": "Shivam",
  "lastName": "Bhawel",
  "email": "shivam@test.com",
  "password": "123456"
}


✅ 2. Login API
Endpoint: POST http://localhost:5000/user/login

Body (JSON):
{
  "email": "shivam@test.com",
  "password": "123456"
}
Response:
{
  "token": "..."
}


✅ 3. Forgot Password API
Endpoint: POST http://localhost:5000/user/forgot-password

Body (JSON):
{
  "email": "shivam@test.com"
}

Response:
{
  "msg": "Mail sent"
}


✅ 4. Reset Password API
Endpoint: POST http://localhost:5000/reset-password/:token
(Replace :token with the raw token received in email)

Example URL:

http://localhost:5000/reset-password/b5d4f38e45ed7...
Body (JSON):
{
  "password": "newpassword123"
}

Response:
{
  "msg": "Password changed"
}


🧪 How to Test
Use Postman to test the above APIs. Make sure your server is running on port 5000 and MySQL is properly configured.

🛠️ Environment Variables (.env)

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
FRONT_URL=http://localhost:3000
MAIL_USER=youremail@gmail.com
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_PASS=youremail_password
