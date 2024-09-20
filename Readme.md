## Course Selection API - Quick Reference

This API enables users to manage courses by marking or unmarking them, as well as managing user authentication and fetching user details. Below is a brief description of the endpoints, their functionality, and related controllers.

---

### 1. **Course Management Endpoints**

#### **POST /courses/new**
- **Description**: Creates a new course.
- **Controller Function**: `createCourse`
- **Protected**: Yes (Requires Authentication)
- **Request Body**:
  ```json
  {
    "title": "Course Title",
    "videoLink": "Course Video Link",
    "topic": "Course Topic",
    "level": "Course Level"
  }
  ```
- **Response**: Success message with the created course details.

#### **GET /courses/all**
- **Description**: Retrieves all courses.
- **Controller Function**: `getAllCourses`
- **Protected**: Yes (Requires Authentication)
- **Response**: List of all available courses.

#### **POST /course/mark**
- **Description**: Marks a specific course for the user.
- **Controller Function**: `markCourse`
- **Protected**: Yes (Requires Authentication)
- **Request Body**:
  ```json
  {
    "userId": "User ID",
    "courseId": "Course ID"
  }
  ```
- **Response**: Success message with updated course selection.

#### **POST /course/unmark**
- **Description**: Unmarks a specific course for the user.
- **Controller Function**: `unmarkCourse`
- **Protected**: Yes (Requires Authentication)
- **Request Body**:
  ```json
  {
    "userId": "User ID",
    "courseId": "Course ID"
  }
  ```
- **Response**: Success message with updated course selection.

#### **POST /course/markbySection**
- **Description**: Marks all courses in a section for the user.
- **Controller Function**: `markCoursesBySection`
- **Protected**: Yes (Requires Authentication)
- **Request Body**:
  ```json
  {
    "userId": "User ID",
    "section": "Section Name"
  }
  ```
- **Response**: Success message with updated course and section selection.

#### **POST /course/unmarkbySection**
- **Description**: Unmarks all courses in a section for the user.
- **Controller Function**: `unmarkCoursesBySection`
- **Protected**: Yes (Requires Authentication)
- **Request Body**:
  ```json
  {
    "userId": "User ID",
    "section": "Section Name"
  }
  ```
- **Response**: Success message with updated course and section selection.

#### **GET /dashboard/stats**
- **Description**: Retrieves course selection statistics for the user.
- **Controller Function**: `getStatsByUser`
- **Protected**: Yes (Requires Authentication)
- **Response**: User-specific statistics about marked courses and sections.

---

### 2. **Authentication Endpoints**

#### **POST /register**
- **Description**: Registers a new user.
- **Controller Function**: `registerUser`
- **Protected**: No
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "User Email",
    "password": "User Password"
  }
  ```
- **Response**: Success message with user details.

#### **POST /login**
- **Description**: Authenticates a user and returns a token.
- **Controller Function**: `loginUser`
- **Protected**: No
- **Request Body**:
  ```json
  {
    "email": "User Email",
    "password": "User Password"
  }
  ```
- **Response**: Authentication token and user details.

#### **GET /me**
- **Description**: Retrieves the authenticated user's details.
- **Controller Function**: `getUserDetails`
- **Protected**: Yes (Requires Authentication)
- **Response**: Details of the authenticated user.

#### **GET /profile/:id**
- **Description**: Retrieves another user's details by their ID.
- **Controller Function**: `getUserDetails`
- **Protected**: Yes (Requires Authentication)
- **Response**: Details of the requested user.

---

## Authentication Middleware
- **`authMiddleware`**: Protects routes by ensuring that the user is authenticated.

---

### Example Requests

#### Marking a Course
```bash
curl -X POST http://localhost:3000/course/mark \
  -H 'Content-Type: application/json' \
  -d '{"userId": "123", "courseId": "abc"}'
```

#### Registering a New User
```bash
curl -X POST http://localhost:3000/register \
  -H 'Content-Type: application/json' \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

--- 

This README serves as a quick reference for understanding the API structure and the functionality of each endpoint and controller.