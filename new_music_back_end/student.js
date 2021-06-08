const User = require("./users.js");
const Student = require("./StudentSchema.js");
const argon2 = require("argon2");
const Account = require("./AccountSchema");

//Controlls fuctionality needed for students.

var generator = require('generate-password');

var password = generator.generate({
    length: 10,
    numbers: true
});

// add student
exports.addstudent = async (req, res) => {
    try {

        //console.log(req.body.double);
        //edge case for when two students are on one account.
        if (req.body.double) {
            await Student.updateOne({ email: req.body.email }, {
                doubleAccount: true, 

            });
            
            const student = new Student({
                firstName: req.body.first,
                lastName: req.body.last,
                email: req.body.email,
                lesson: "lesson",
                teacherID: req.body.user.id,
                role: "student",
                homework: "my homework",
                pastFirstTime: false,
                doubleAccount: true,
            });




            await student.save();

            //update array within the teacher schema
            await User.updateOne({
                _id: req.body.user.id
            }, {
                $push: { students: student }
            }
            );
            //Update account or add account for student.
            const findaccount = await Account.findOne({
                email: req.body.email,
            });
            if (findaccount) {
                await Account.updateOne({
                    email: req.body.email
                }, {
                    $push: { account: student }
                }
                );
            }

            else {
                const account = new Account({
                    email: req.body.email,
                    teacherID: req.body.teacherID,
                    password: password,
                    role: "student",
                    pastFirstTime: false,
                });
                await account.save();

                const saveStudent = await Student.find({ email: req.body.email });
                for (i = 0; i < saveStudent.length; i++) {
                    await Account.updateOne({
                        email: req.body.email
                    }, {
                        $push: { students: saveStudent[i] }
                    }
                    );
                }

            }

            await Student.updateMany({ email: req.body.email }, { password: "" });
            //the above was for an edge case where you may have two students with same account.

            

            return res.sendStatus(200);

        }

        let existing_email = await Student.findOne({
            email: req.body.email,
        });
        //needed for popup on the front end.
        if (existing_email && !req.body.double && !req.body.separate) {
            //console.log("I got here");
            return res.send({
                existing_email: true,
            });

        }
       
        //normal student adding for non double accounts.
        const student = new Student({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            lesson: "lesson",
            teacherID: req.body.user.account._id,
            password: password,
            role: "student",
            homework: "my homework",
            pastFirstTime: false,
            doubleAccount: false,
        });
        //console.log(req.body);
        await student.save();
        
        await User.updateOne({
            _id: req.body.user.id
        }, {
            $push: { students: student }
        }
        );

        const account = new Account({
            email: req.body.email,
            teacherID: req.body.teacherID,
            password: password,
            role: "student",
            pastFirstTime: false,
        });
        await account.save();

        const saveStudent = await Student.find({ email: req.body.email });
        for (i = 0; i < saveStudent.length; i++) {
            await Account.updateOne({
                email: req.body.email
            }, {
                $push: { account: saveStudent[i] }
            }
            );
        }

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};





exports.getthem = async (req, res) => {
    //allows the front end teacher to access all of their students.
    try {

        //console.log("lets try this", req.body);




        let student = await Student.find({
            teacherID: req.body.user,
        });

       
        return res.send(student);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}





exports.addHomwork = async (req, res) => {
    //allows teacher to add homework for students.
    try {
        //console.log(req.body.homework);
        
        await Student.updateOne({ _id: req.body.id }, {
            homework: req.body.homework,
        });
    }
        catch (err) {
            console.log(err);
        }
}

exports.pastFirstTime = async (req, res) => {
    //This allows the student when they log in for the first time to change their password.
    //I need to add an edge case here where the student has that same email as the teacher.
    //I also need to make sure that if a student ever has two different teachers that use the app that their account can be duo for the teacher but not the other way arround.
    try {
        var cryptpass = await argon2.hash(req.body.password);
        await Account.updateOne({ _id: req.body.id }, {
            password: cryptpass,
            pastFirstTime: true,
            
        });
    }
    catch (err) {
        console.log(err);
    }
}


