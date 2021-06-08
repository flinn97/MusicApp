import React, { Component } from "react";
//this is the student profile page. It doesn't do much right now but will. Right now just shows the homework.
export default class Student_profile extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            currentStudent: this.props.props.props.currentPage,
            


        };
    }


    render() {

        return (
            <div>
                <p>Homework:</p>
                <p>{this.props.props.props.currentPage.homework}</p>
                
            </div>
        );
    }
}
