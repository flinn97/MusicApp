import React, { Component } from "react"



//simply sets state and maps every student found in the current list of students to a button that is clickable.
export default class funcbotton extends Component {
 
    profile(student) {
        this.props.history.push({
            pathname: "/student",
            state: { detail: student }
        });
    
    }
      

    render() {
    return (<div>
        {
            this.props.students.map((student, index) =>

                <button className="btn btn-block" key={index} onClick={this.profile.bind(this, student)}>
                        {student.firstName}
                    </button>

                )
        }
    </div>
        )
                   

    }
}
