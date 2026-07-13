# AI-Powered Student Course Allocation System

A full-stack university course allocation system that automatically assigns students to courses based on marks, category-based reservation, course preferences, and application date.

The system also includes reporting dashboards and an AI assistant for querying allocation insights.

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI
- Google Gemini API

---

## Features

- Student management
- Course and seat management
- Category-wise reserved seats
- Automated course allocation
- Preference-based course assignment
- Allocation recalculation
- Dashboard with charts and statistics
- Allocation reports and rejection analysis
- AI assistant for report-based questions

---

## Project Structure

```text
frontend/
├── app/
├── components/
├── services/
└── types/

backend/
├── controller/
├── models/
├── routes/
├── services/
└── config/
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Configure the backend API URL in the frontend environment file.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Database Schema

### Student

```text
studentId
name
marks
category
preferences[]
allocatedCourse
allocatedPreference
allocatedStatus
applicationDate
allocatedDate
```

### Course

```text
courseName
totalSeats
reservedSeats
  ├── GENERAL
  ├── OBC
  ├── SC
  └── ST

filledSeats
  ├── GENERAL
  ├── OBC
  ├── SC
  └── ST
```

MongoDB references are used between students and courses for preferences and allocated courses.

---

## API Documentation

### Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student |
| POST | `/api/students` | Create student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

### Courses

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |

### Allocation

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/allocation/recalculate` | Run allocation process |

### Reports and Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/reports` | Allocation reports |

### AI Assistant

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/query` | Ask questions about allocation reports |

Example:

```json
{
  "question": "Which students did not receive their first preference?"
}
```

---

## Architecture Design

The application follows a layered architecture:

```text
Next.js Frontend
        ↓
Express REST API
        ↓
Service / Business Logic
        ↓
Mongoose Models
        ↓
MongoDB Atlas
```

Allocation and reporting logic are separated into service modules to keep controllers lightweight and improve maintainability.

---

## AI Integration Approach

The Gemini API is used as a report-aware AI assistant.

The backend generates the latest allocation report and provides it to the AI model as context.

The AI is instructed to:

- Answer only from report data.
- Avoid inventing information.
- Return a fallback response when sufficient data is unavailable.
- Keep answers concise.

This grounding approach reduces hallucination and keeps AI responses relevant to the allocation system.

---

## Security Considerations

- Environment variables are used for database and AI credentials.
- `.env` files are excluded from source control.
- Backend validation is applied before storing data.
- AI API credentials remain on the backend.
- AI responses are restricted to provided report context.

---

## Challenges and Solutions

### Student ID conflicts after deletion

Using document count to generate student IDs caused duplicate IDs after records were deleted.

**Solution:** The highest existing student ID is identified and incremented.

### Duplicate course preferences

Students could select the same course multiple times.

**Solution:** Duplicate preferences are prevented in the frontend.

### Allocation visibility

A success message alone did not clearly show allocation results.

**Solution:** Allocation summary cards and allocated/unallocated student lists were added.

### AI hallucination risk

General AI responses could provide unrelated information.

**Solution:** The AI is grounded using generated report data and instructed to answer only from the supplied context.

