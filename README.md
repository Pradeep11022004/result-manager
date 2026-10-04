# Student Result Manager

Student Result Manager is a beginner-friendly full-stack application for managing student marks, calculating totals, averages, and grades, and practicing Java full-stack interview concepts.

## Features

- Add, view, update, and delete students
- Search students by name
- Filter students by department
- Automatically calculate total, average, and grade
- Validation for required fields and marks from 0 to 100
- Clean REST API with useful error responses
- Responsive React UI with loading, empty, error, and delete confirmation states

## Technologies

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- React
- Vite
- JavaScript
- CSS
- Fetch API

## Architecture

React frontend calls the Spring Boot REST API. The backend uses a simple layered architecture:

Controller -> Service -> Repository -> JPA/Hibernate -> MySQL

## Project Structure

```text
student-result-manager/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/example/student_result_manager/
│       │   │   ├── StudentResultManagerApplication.java
│       │   │   ├── config/CorsConfig.java
│       │   │   ├── controller/StudentController.java
│       │   │   ├── entity/Student.java
│       │   │   ├── exception/GlobalExceptionHandler.java
│       │   │   ├── exception/ResourceNotFoundException.java
│       │   │   ├── repository/StudentRepository.java
│       │   │   └── service/StudentService.java
│       │   └── resources/application.properties
│       └── test/
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/studentService.js
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── .gitignore
└── README.md
```

## Database Setup

Create the MySQL database:

```sql
CREATE DATABASE college_database;
```

The `students` table is managed by Hibernate using `spring.jpa.hibernate.ddl-auto=update`.

Expected columns:

```text
id
name
department
java_marks
dbms_marks
dsa_marks
web_marks
networks_marks
```

## Backend Setup

From the backend folder:

```bash
cd backend
mvn spring-boot:run
```

Set environment variables before running:

```bash
DB_URL=jdbc:mysql://localhost:3306/college_database
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
FRONTEND_URL=http://localhost:5173
SERVER_PORT=8080
```

On Windows PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/college_database"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
$env:FRONTEND_URL="http://localhost:5173"
mvn spring-boot:run
```

## Frontend Setup

From the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Optional environment variable:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get one student |
| POST | `/students` | Create student |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |
| GET | `/students/search?name=Arun` | Search by name |
| GET | `/students/department/{department}` | Filter by department |

## Postman Testing Steps

1. Start MySQL and create `college_database`.
2. Start the backend on port `8080`.
3. Send a `POST` request to `http://localhost:8080/students`.
4. Use this JSON body:

```json
{
  "name": "Arun Kumar",
  "department": "Computer Science",
  "javaMarks": 88,
  "dbmsMarks": 91,
  "dsaMarks": 84,
  "webMarks": 79,
  "networksMarks": 86
}
```

5. Test `GET /students`, `GET /students/{id}`, `PUT /students/{id}`, `DELETE /students/{id}`, search, and department filter.

## Screenshots

Add screenshots here after running the application locally.

## Deployment

Backend:

1. Create a MySQL database on your hosting provider.
2. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `FRONTEND_URL`.
3. Build with `mvn clean package`.
4. Deploy the generated jar from `backend/target/`.

Frontend:

1. Set `VITE_API_BASE_URL` to the deployed backend URL.
2. Build with `npm run build`.
3. Deploy the `frontend/dist` folder to a static hosting provider.

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial clean Student Result Manager project"
git branch -M main
git remote add origin https://github.com/your-username/student-result-manager.git
git push -u origin main
```

## Future Improvements

- Add authentication for admin users
- Add pagination and sorting
- Add department management
- Add CSV export
- Add unit and integration tests for service and controller layers

## Author

Created by Pradeep K as a Java Full Stack portfolio project.
