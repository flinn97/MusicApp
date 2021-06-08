import React, { Component } from "react"




export default class StudentArray extends Component {
   /*
    * */

    render() {
        //
        return (<div>
            {

                this.props.props.account.map((student, index) =>

                    <button className="change-button" key={index} onClick={this.props.handlePage.bind(this, student)}>
                        {student.firstName}
                    </button>

                )
            }
        </div>
        )


    }
}
