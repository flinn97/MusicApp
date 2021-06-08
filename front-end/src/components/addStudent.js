import React, { Component } from "react";
//this component details my dialog help component
class Popup extends Component{
    //using the functions sent from the profile page allows me to send back student information typed in to profile and then to the backend. 
    handleChange = (event) => {
        this.props.handleChange(event);
        
    }
    AddStudents = (e) => {
        this.props.AddStudents(e);
        this.props.handleClose();
    }
    
    render() {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstName">Student First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first"
                                required
                                onChange={this.handleChange}
                                name="first"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Student Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last"
                                required
                                onChange={this.handleChange}
                                name="last"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Student Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                onChange={this.handleChange}
                                name="email"
                            />
                        </div>


                        <div>
                            <button className="btn btn-primary btn-block" value="submit" onClick={this.AddStudents}>Add Student</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
};

export default Popup;