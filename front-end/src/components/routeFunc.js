import React from "react";
import StudentProfile from "../pages/student_profile";
import NewPassword from "./newPassword";
import Goals from "../pages/goals";
//this is the routes page. If profile button is clicked. Profile turns true and the route shows the profile page. Then if goals are picked then it turns profile false and goals true.
function route(props) {
    if (!props.props.pastFirstTime) {
        return <NewPassword props={props}  />;

    }
    else if (props.props.profile) {
        return <StudentProfile props={props} />;
    }
    else {
        return <Goals props={props}/>;
    }
}
export default route;
//I need to make sure that once a user puts in the new password the state changes for past first time permenatly.