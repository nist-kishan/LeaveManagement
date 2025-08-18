# Leave Management System (MERN Stack MVP)

A modern, full-stack Leave Management System built for startups to streamline employee and leave management. This MVP allows HR teams to add employees, process leave applications, and track leave balances efficiently through a clean and responsive React frontend powered by a robust Node.js + Express backend API with MongoDB database.

---

## Features

- Add, view, and delete employees with key details (name, email, department, joining date).
- Employees can apply for leave within their allowed balance.
- HR can approve or reject leave requests with real-time leave balance updates.
- Prevent overlapping leave requests and enforce leave policies.
- View leave balances per employee on demand.
- Responsive and user-friendly interface styled with modern CSS.
- Backend API with thorough validations and error handling.

---

## Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React, Vite, React Router, CSS |
| Backend   | Node.js, Express, Mongoose (MongoDB ORM) |
| Database  | MongoDB (Atlas or local)            |
| Deployment| Vercel (frontend), Render/Heroku/EC2 (backend) |

---

## Folder Structure
```
/leave-management-system
│
├── /backend                    # Backend source code
│   ├── /controllers           # Route handler logic per resource
│   │    ├── employeeController.js
│   │    └── leaveController.js
│   ├── /models                # Mongoose schemas & models
│   │    ├── Employee.js
│   │    └── Leave.js
│   ├── /routes                # Express routes grouped by feature
│   │    ├── employeeRoutes.js
│   │    └── leaveRoutes.js
│   |              
│   |── db.js     # Configuration files like DB connection
│   ├── .env                   # Environment variables (ignored in git)
│   ├── package.json
│   ├── server.js              # Express entry point
│   └── README.md              # Backend README (optional)
│
├── /frontend                  # Frontend React app
│   ├── /src
|   |        └── api.js        # API utility functions (apiFetch)
│   │                
│   │   │    
│   │   ├── /assets           # Static images, fonts, icons, etc.
│   │   ├── /components       # Reusable UI components
│   │   │    ├── AddEmployee.jsx
│   │   │    ├── EmployeeList.jsx
│   │   │    ├── LeaveRequests.jsx
│   │   │    ├── Navbar.jsx
│   │   │    ├── LandingPage.jsx
│   │   │    ├── EmployeesPage.jsx
│   │   │    ├── ApplyLeave.jsx   # Planned
│   │   │    └── RequestsPage.jsx
│   │   │    ├── AddEmployee.css
│   │   │    ├── EmployeeList.css
│   │   │    └── Navbar.css
│   │   ├── /pages            # Page-level components (views)

│   │   ├── /styles           # CSS or SCSS files
│   │   │    ├── App.css

│   │   ├── App.jsx           # Root React app component with routing
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global CSS reset/typography
│   ├── .env                  # Environment variables for Vite (API base URL)
│   ├── package.json
│   └── README.md             # Frontend README (optional)
│
├── .gitignore                # Common ignores (node_modules, env files)
├── README.md                 # Project root README (full project info)
└── LICENSE                   # License file (e.g. MIT)

```
---

## Setup and Run Locally

### Prerequisites

- Node.js installed (v16+ recommended)
- MongoDB instance running or MongoDB Atlas cluster available

### Backend

1. Navigate to backend directory:
   
cd backend

2. Install dependencies:

npm install

3. Create `.env` file with:

MONGO_URI=your_mongodb_connection_string
PORT=5000
INITIAL_LEAVE_BALANCE=20


4. Start server in development mode:

npm run dev


5. Backend API will be available at:  
`http://localhost:5000/api`

---

### Frontend

1. Navigate to frontend directory:

cd frontend
2. install dependencies:


npm install
3. Create `.env` file:

VITE_API_BASE=http://localhost:5000/api


4. Start dev server:

npm run dev

5. Frontend will be running at:  
`http://localhost:5173` (or shown in console)

---

## API Endpoints

### Employee APIs
| Method | Endpoint                       | Description                 |
|--------|--------------------------------|-----------------------------|
| POST   | `/api/employees`               | Add a new employee          |
| GET    | `/api/employees`               | List all employees          |
| GET    | `/api/employees/:id`           | Get employee details        |
| GET    | `/api/employees/:id/balance`  | Get leave balance           |
| DELETE | `/api/employees/:id`           | Delete employee             |

### Leave APIs
| Method | Endpoint                        | Description                 |
|--------|--------------------------------|-----------------------------|
| POST   | `/api/leaves`                  | Apply for leave             |
| GET    | `/api/leaves`                  | List leave requests         |
| PATCH  | `/api/leaves/:id/status`       | Approve or reject leave     |

---

## Important Functionalities and Validations

- Prevent leave applications before employee’s joining date.
- Validate that end date is not before start date.
- Check sufficient leave balance before applying or approving leave.
- Prevent overlapping active (pending/approved) leave requests for the same employee.
- Email uniqueness enforced on employee creation.
- Leave balance deduction is atomic during approval.
- Proper HTTP status codes and error messages returned on failure.

---

## Deployment

### Frontend

- Hosted on **Vercel**.
- Uses environment variable `VITE_API_BASE` to point to backend API URL.

### Backend

- Hosted on **Render**, **Heroku**, **Railway**, or similar platform.
- Connected to **MongoDB Atlas** or your MongoDB instance.
- CORS configured to allow frontend domain.

---

## How to Use

1. Add an employee with basic details.
2. View the list of all employees.
3. Apply for leave (once ApplyLeave form is integrated).
4. HR reviews leave requests and updates status.
5. Track leave balances anytime from employee list.

---

## Future Enhancements

- Add Apply Leave frontend form for employees.
- Role-based authentication and authorization.
- Leave cancellation and modification flows.
- Email and notification system.
- Leave accrual and carry-forward policies.
- Pagination and enhanced UI/UX improvements.
- Robust concurrency handling with DB transactions.

---
## Screenshots 
<img width="1914" height="966" alt="Screenshot 2025-08-18 105842" src="https://github.com/user-attachments/assets/18e2aba5-16d6-4bb6-8145-7f5494da71a0" />
<img width="1899" height="902" alt="Screenshot 2025-08-18 105927" src="https://github.com/user-attachments/assets/b99ab644-e9da-4bb9-9c21-5fc98e7455b2" />
<img width="830" height="662" alt="Screenshot 2025-08-18 110128" src="https://github.com/user-attachments/assets/02c22652-1da9-4426-8852-263425de77d8" />
<img width="788" height="726" alt="Screenshot 2025-08-18 110344" src="https://github.com/user-attachments/assets/e2c7e2c7-b227-482e-8f38-4d8113ecbc53" />
<img width="924" height="473" alt="Screenshot 2025-08-18 110418" src="https://github.com/user-attachments/assets/91d60fbc-ecfb-4de5-bfe2-3caa1ccf59c5" />
<img width="757" height="396" alt="Screenshot 2025-08-18 110540" src="https://github.com/user-attachments/assets/50bb5a27-7221-4bf7-bff8-68dcebd5d558" />

## Contributing

Pull requests and issues are welcome! Please fork the repo, work on features or fixes, and submit PRs.

---

## License

This project is open source under the MIT License.

---

## Contact

For questions or support, please contact Aman Kumar at amankumarpatwa26@gmail.com.

---

Thank you for reviewing this Leave Management System MVP!  
Your feedback and contributions are appreciated. 🚀

