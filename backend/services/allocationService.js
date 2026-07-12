const Student = require('../models/Student');
const Course = require('../models/Course');

const runAllocation = async() => {
    //reset all students
    await Student.updateMany(
        {},
        {
            allocatedCourse: null,
            allocatedPreference: null,
            allocatedStatus: 'Not Allocated'
        }
    )
    //reset all courses
    await Course.updateMany(
        {},
        {
            $set: {
                "filledSeats.GENERAL": 0,
                "filledSeats.OBC": 0,
                "filledSeats.SC": 0,
                "filledSeats.ST": 0,
            }
        }
    )

    const students = await Student.find()
        .populate('preferences')
        .sort({
            marks: -1,
            applicationDate: 1
        });

    const courses = await Course.find();
    
    const courseMap = {};
    courses.forEach((course) => {
        courseMap[course._id.toString()] = course;
    })

    let allocatedCount = 0;
    let unallocatedCount = 0;

    for(const student of students){
        let isAllocated = false;
        console.log(`\nProcessing Student: ${student.name}`);

        for(const preference of student.preferences){
            console.log(`Checking preference: ${preference.courseName}`);

            const course = courseMap[preference._id.toString()];

            if(!course){
                continue;
            }

            const category = student.category;

            const availableSeats = course.reservedSeats[category] - course.filledSeats[category];

            console.log(`${course.courseName} | ${category} | Available Seats: ${availableSeats}`);

            if(availableSeats > 0){
                console.log( `${student.name} allocated to ${course.courseName}`);

                student.allocatedCourse = course._id;

                student.allocatedPreference = student.preferences.findIndex(
                    pref => pref._id.toString() === course._id.toString()
                ) + 1;

                student.allocatedStatus = "Allocated";
                course.filledSeats[category]++;
                allocatedCount++;
                isAllocated = true;
                await student.save();
                await course.save();
                break;
            }
        }
        if(!isAllocated){
            console.log(`${student.name} could not be allocated.`);
            student.allocatedStatus = "Not Allocated";
            await student.save();
            unallocatedCount++;
        }
    }

    console.log("Student order:");
    students.forEach((student) => {
        console.log(`Student: ${student.name}, Marks: ${student.marks}, Application Date: ${student.applicationDate}`);
    })
    // console.log("\nCourse Map:");
    // console.log(courseMap);

    return{
        totalStudents: students.length,
        totalCourses: courses.length,
        allocatedCount,
        unallocatedCount
    }
}

module.exports = {
    runAllocation
}