const mongoose = require('mongoose');
//structure for teachers. 
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "student"
               
            },
        ],
        name: String,
        email: String,
        password: String,
        role: String,


    })
);

module.exports = User; 