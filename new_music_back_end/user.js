const controller = require("./controller");
const addStudent = require("./student");
//controller portion
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //various app posts for various functionality. 
    app.post(

        "/api/auth/signup",
        controller.signup

    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/student", addStudent.addstudent);
    app.post("/api/auth/getStudents", addStudent.getthem);
    app.post("/api/auth/homework", addStudent.addHomwork);
    app.post("/api/auth/past", addStudent.pastFirstTime);
    app.delete("api/auth/logout", controller.logout);
};