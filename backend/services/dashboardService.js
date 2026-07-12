const {generateReport} = require("./reportService");
const Course = require("../models/Course");

const getDashboardData = async() =>{
    const report = await generateReport();

    const totalCourses = await Course.countDocuments();

    return{
        cards:{
            totalStudents: report.summary.totalStudents,

            allocatedStudents: report.summary.allocatedStudents,

            unallocatedStudents: report.summary.unallocatedStudents,

            totalCourses
        },

        courseStatistics: report.courseStatistics,

        categorySummary: report.categorySummary,
    }
}

module.exports = {getDashboardData};