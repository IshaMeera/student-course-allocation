const Student = require("../models/Student");
const Course = require("../models/Course");

const generateReport = async() => {
    const totalStudents = await Student.countDocuments();

    const allocatedStudents = await Student.countDocuments({
        allocatedStatus: "Allocated"
    });

    const unallocatedStudents = totalStudents - allocatedStudents;

    const courses = await Course.find();

    const courseStatistics = courses.map((course) => {
        const filledSeats = course.filledSeats.GENERAL +
            course.filledSeats.OBC +
            course.filledSeats.SC + 
            course.filledSeats.ST
        return{
            courseId: course._id,
            courseName: course.courseName,
            totalSeats: course.totalSeats,
            filledSeats,
            availableSeats: course.totalSeats - filledSeats,
            allocatedStudents: filledSeats
        }
    });

    const allocatedStudentList = await Student.find({
        allocatedStatus: "Allocated"
    });

    const categorySummary = {
        GENERAL: 0,
        OBC: 0,
        SC: 0,
        ST: 0
    }

    allocatedStudentList.forEach((student)=>{
        categorySummary[student.category]++;
    })

    const firstPreferenceMissed = await Student.find({
        allocatedStatus: "Allocated",
        allocatedPreference: {$gt: 1}
    })
    .populate("allocatedCourse")
    .select("studentId name marks category allocatedPreference allocatedCourse");

    let highestRejectionCourse = null;
    let maxRejectionRate = -1;

    for(const course of courses){
        const interestedStudents = await Student.countDocuments({
            preferences: course._id
        });
        const allocatedStudents = await Student.countDocuments({
            allocatedCourse: course._id
        });
        const rejectedStudents = interestedStudents - allocatedStudents;

        const rejectionRate = interestedStudents === 0
            ? 0
            : (rejectedStudents / interestedStudents) * 100;

            if(rejectionRate > maxRejectionRate) {
                maxRejectionRate = rejectionRate;

                highestRejectionCourse = {
                    courseId: course._id,
                    courseName: course.courseName,
                    interestedStudents,
                    allocatedStudents,
                    rejectedStudents,
                    rejectionRate: Number(rejectionRate.toFixed(2))
            }
        }
    }

    return{
        summary:{
            totalStudents,
            allocatedStudents,
            unallocatedStudents
        },
        courseStatistics,
        categorySummary,
        firstPreferenceMissed,
        highestRejectionCourse
    }
}

module.exports = {generateReport};