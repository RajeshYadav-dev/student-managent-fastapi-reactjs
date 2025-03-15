# 🏫 Student Management System

A full-stack student management system built with **FastAPI** (backend) and **React.js** (frontend) to handle student records, authentication, and profile management.

## 🚀 Features

✅ **Student CRUD Operations** - Add, view, update, and delete student records  
✅ **JWT Authentication** - Secure login system for users  
✅ **File Upload** - Upload and manage student profile pictures  
✅ **Pagination** - Efficient data retrieval for large datasets  
✅ **React Frontend** - Bootstrap 5 for styling and React Router for navigation  

---

## 🛠 Tech Stack

### **Backend (FastAPI)**
- FastAPI for API development
- SQLModel + MySQL for database
- Pydantic for data validation
- JWT authentication (OAuth2)
- CORS for frontend-backend communication

### **Frontend (React.js)**
- React.js with functional components
- React Router for navigation
- Bootstrap 5 for UI styling
- Fetch API for backend integration

---

## 📁 Project Structure

backend/ │── src/ │ ├── routers/ │ │ ├── students.py │ │ ├── auth.py │ ├── models/ │ │ ├── student.py │ │ ├── user.py │ ├── services/ │ ├── main.py │── static/uploads/ (for profile pictures) │── .env frontend/ │── src/ │ ├── components/ │ │ ├── StudentList.js │ │ ├── StudentForm.js │ ├── pages/ │ │ ├── Home.js │ │ ├── Login.js │ ├── App.js │── package.json

yaml
Copy
Edit

---

## 🛠 Setup Instructions

### **1️⃣ Backend Setup (FastAPI)**
```bash
# Clone the repository
git clone https://github.com/your-username/student-management.git
cd student-management/backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
