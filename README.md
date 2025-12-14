# Assignment-MasterO-Backend

## Project Setup Steps

1. `npm install`
2. Run `dbInit.js` to initialize the MySQL database.
3. Run the app using `npm start`.

**Note:** Define PORT and JWT_SECRET in the environment file (.env).

## API Usage

### AUTH

- **Register**: 
  - **Method:** POST
  - **Endpoint:** `http://localhost:5000/auth/register`
  - **Body:** `{ "name": "string", "email": "string", "password": "string", "role": "admin" or "employee" }`

- **Login**:
  - **Method:** POST
  - **Endpoint:** `http://localhost:5000/auth/login`
  - **Body:** `{ "email": "string", "password": "string" }`
  - **Response:** A JWT token is generated. Set it in the Authorization header as `Bearer <token>` for authenticated requests.

### TASKS

- **Create Task**:
  - **Method:** POST
  - **Endpoint:** `http://localhost:5000/tasks`
  - **Usage:** Creates a task that can be assigned to a user.
  - **Body:** `{ "title": "string", "description": "string", "assigned_to": number, "due_date": "YYYY-MM-DD" }`
  - **Note:** Admin only.

- **Get All Tasks**:
  - **Method:** GET
  - **Endpoint:** `http://localhost:5000/tasks`
  - **Usage:** Fetches all tasks.
  - **Note:** Admin only.

- **Get Task by ID**:
  - **Method:** GET
  - **Endpoint:** `http://localhost:5000/tasks/:id`
  - **Usage:** Get details of a specific task.

- **Update Task**:
  - **Method:** PUT
  - **Endpoint:** `http://localhost:5000/tasks/:id`
  - **Usage:** Update title, description, or status of a task.
  - **Body:** `{ "title": "string", "description": "string", "status": "pending|in_progress|completed" }`
  - **Note:** Admin can update any task; employees can update their own task status.

### USERS

- **Get All Users**:
  - **Method:** GET
  - **Endpoint:** `http://localhost:5000/users`
  - **Usage:** Fetches all users.
  - **Note:** Admin only.

## Error Handling

The API uses centralized error handling. Common responses:
- **400 Bad Request:** Invalid input (e.g., invalid status).
- **401 Unauthorized:** Invalid credentials or missing token.
- **403 Forbidden:** Insufficient permissions.
- **500 Internal Server Error:** Server issues.

## Environment Variables

Create a `.env` file in the root directory:
```
PORT=5000
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

## Technologies Used

- Node.js
- Express.js
- MySQL2
- JWT for authentication
- bcrypt for password hashing
