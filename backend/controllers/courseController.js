const Course = require('../models/Course');

const createCourse = async(req, res) => {
    try{
        const {courseName, totalSeats, reservedSeats} = req.body;

        const existingCourse = await Course.findOne({courseName});

        if(existingCourse){
            return res.status(400).json({message: 'Course already exists'});
        }

        const totalReservedSeats = (reservedSeats.GENERAL || 0) + (reservedSeats.OBC || 0) + (reservedSeats.SC || 0) + (reservedSeats.ST || 0);

        if(totalReservedSeats > totalSeats){
            return res.status(400).json({message: 'Total reserved seats cannot exceed total seats'});
        }

        const course = await Course.create(req.body);

        res.status(201).json({message: 'Course created successfully', course});
    }catch(err){
        res.status(500).json({message: 'Failed to create course', error: err.message});
    }
}

const getCourses = async(req, res) => {
    try{
        const courses = await Course.find();

        res.status(200).json({message: 'Courses fetched successfully', courses, count: courses.length});
    }catch(err){
        res.status(500).json({message: 'Failed to fetch courses', error: err.message});
    }
}

const getCouseById = async(req, res) => {
    try{
        const course = await Course.findById(req.params.id);
        
        if(!course){
            return res.status(404).json({message: 'Course not found'});
        }

        res.json({message: 'Course fetched successfully', course});
    }catch(err){
        res.status(500).json({message: 'Failed to fetch course', error: err.message});
    }
}

const updateCourse = async(req, res) => {
    try{
        if(req.body.reservedSeats && req.body.totalSeats){
            const totalReserved = (req.body.reservedSeats.GENERAL || 0) + (req.body.reservedSeats.OBC || 0) + (req.body.reservedSeats.SC || 0) + (req.body.reservedSeats.ST || 0);

            if(totalReserved > req.body.totalSeats){
                return res.status(400).json({message: 'Total reserved seats cannot exceed total seats'});
            }
    }

    const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    )
    if(!course){
        return res.status(404).json({message: 'Course not found'});
    }

    return res.status(200).json({message: 'Course updated successfully', course});
}catch(err){
    res.status(500).json({message: 'Failed to update course', error: err.message});
}
}

const deleteCourse = async(req, res) => {
    try{
        const course = await Course.findByIdAndDelete(req.params.id);

        if(!course){
            return res.status(404).json({message: 'Course not found'});
        }
        return res.status(200).json({message: 'Course deleted successfully', course});
    }catch(err){
        res.status(500).json({message: 'Failed to delete course', error: err.message});
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCouseById,
    updateCourse,
    deleteCourse
}