const mongoose = require('mongoose');

const courseScheme = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    totalSeats:{
        type: Number,
        required: true,
        min: 1,
    },
    reservedSeats: {
        GENERAL:{
            type: Number,
            default: 0,
        },
        OBC: {
            type: Number,
            default: 0,
        },
        SC: {
            type: Number,
            default: 0,
        },
        ST: {
            type: Number,
            default: 0,
        }
    },
    filledSeats: {
       GENERAL:{
            type: Number,
            default: 0,
        },
        OBC: {
            type: Number,
            default: 0,
        },
        SC: {
            type: Number,
            default: 0,
        },
        ST: {
            type: Number,
            default: 0,
        }
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Course', courseScheme);