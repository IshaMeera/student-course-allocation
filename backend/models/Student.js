const { application } = require('express');
const mongoose = require('mongoose');

const studentScheme = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true,
        enum: ['GENERAL', 'OBC', 'SC', 'ST']
    },
    allocatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    preferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ],
    applicationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    allocatedCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: null
    },
    allocatedPreference: {
        type: Number,
        default: null
    },
    allocatedStatus: {
        type: String,
        enum: ['Allocated', 'Not Allocated'],
        default: 'Not Allocated'
    },
},
    {
    timestamps: true,
    }
)

module.exports = mongoose.model('Student', studentScheme);