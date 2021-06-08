import React, { Component } from "react"
import AuthService from "../services/auth.service";

//this is the student page that shows for the teacher. It shows the teacher various information about the student as well as a function to add homework.
export default class Student extends Component {
    //create state
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.AddHomework = this.AddHomework.bind(this);

        this.state = {
            
            homework: "",
            

        };
    }
    //change whatever is needed in the state
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //Uses controller to change the homework of the student.
    AddHomework(e) {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.location.state.detail._id);
        AuthService.AddHomework(this.props.location.state.detail._id, this.state.homework);
        
    }
    //render student information.
    render() {
        return (

            <div>

                <p>{this.props.location.state.detail.firstName}</p>
                <p>{this.props.location.state.detail.lastName}</p>
                <p>{this.props.location.state.detail._id}</p>
                <p>{this.props.location.state.detail.password}</p>

                <div className="form-group">
                    <label htmlFor="assignment">Homework:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assingment"
                        required
                        onChange={this.handleChange}
                        name="homework"
                    />
                </div>


                <div>
                    <button className="btn btn-primary btn-block" value="submit" onClick={this.AddHomework}>Add Homework</button>
                </div>

            </div>
        );
    }
};
