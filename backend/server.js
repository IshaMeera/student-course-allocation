const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const studentRoutes = require('./routes/StudentRoutes');
const courseRoutes = require('./routes/CourseRoute');
const allocationRoutes = require('./routes/AllocationRoute');
const reportRoutes = require('./routes/ReportRoute');
const dashboardRoutes = require('./routes/DashboardRoute');
const aiRoutes = require('./routes/AiRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/allocation', allocationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});