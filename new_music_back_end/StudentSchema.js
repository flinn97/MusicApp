const mongoose = require('mongoose');
//structure fro student.
const Student = mongoose.model(
        "Student",
        new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            lesson: String,
            teacherID: String,
            password: String,
            role: String,
            homework: String,
            pastFirstTime: Boolean,
            doubleAccount: Boolean,

    
        })
);

module.exports = Student; 
