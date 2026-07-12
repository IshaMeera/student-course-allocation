const Student = require('../models/Student');
const Course = require('../models/Course');

const createStudent = async (req, res) => {
    try{
        const {name, marks, category, preferences} = req.body;
        const students = await Student.find().select("studentId");

        const lastStudent = await Student.findOne()
            .sort({ studentId: -1 })
            .select("studentId");

            let studentId = "STU001";

            if (lastStudent) {
            const lastNumber = parseInt(
                lastStudent.studentId.replace("STU", ""),
                10
            );

            studentId = `STU${String(lastNumber + 1).padStart(3, "0")}`;
        }

        const existingStudent = await Student.findOne({ studentId });
        if(existingStudent){
            return res.status(409).json({
                success: false,
                message: 'Student with this ID already exists',
            })
        }

        const student = await Student.create({studentId, name, marks, category, preferences})

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to create student',
            error: err.message,
        })
    }
}

const getStudents = async (req, res) => {
    try{
        const students = await Student.find().populate("preferences allocatedCourse");

        res.status(200).json({
            success: true,
            message: 'Students fetched successfully',
            count: students.length,
            data: students,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to fetch students',
            error: err.message,
        })
    }
}

const getStudentById = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id).populate("preferences allocatedCourse");

        if(!student){
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            })
        }
        res.json({
            success: true,
            data: student,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student',
            error: err.message,
        })
    }
}

const updateStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if(!student){
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            })
        }
        res.json({
            success: true,
            message: 'Student updated successfully',
            data: student,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to update student',
            error: err.message,
        })
    }
}

const deleteStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);

        if(!student){
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            })
        }
        res.json({
            success: true,
            message: 'Student deleted successfully',
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to delete student',
            error: err.message,
        })
    }
}

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
}