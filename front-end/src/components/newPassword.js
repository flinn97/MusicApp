import React, { Component } from "react";
//import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


export default class Student_routes extends Component {
    
    render() {
        console.log(this.props.props);
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.props.props.handleLogin}
                        ref={c => {
                            //this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="password1">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password1"
                                //value= {this.props.props.password}
                                onChange={this.props.props.handleChange}
                                //validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password2">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password2"
                                //value={this.state.password}
                                onChange={this.props.props.handleChange}
                                //validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                >
                                Change Password
                            </button>
                        </div>

                        
                    </Form>
                </div>
            </div>
        );
    }
}