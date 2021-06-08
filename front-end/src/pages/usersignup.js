import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
//this component allow for teacher sign up.
//using the react-validation to help with arguments.
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
class signUp extends Component {
    //state creation.
    constructor(props) {
        super(props);
        this.handleSub = this.handleSub.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            //successful: false,
           // message: ""
        };
    }


    //handles any change within state.
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

  //when the submit button is pushed it uses the controller to sign up the teacher on the backend. then it shoots teacher to the profile page.
    handleSub(e) {
        e.preventDefault();
        //var data = this.state;
        
        AuthService.register(
            this.state.name,
            this.state.email,
            this.state.password
        ).then(response => {
            
            this.setState({
                name: response.data.name,
                email: response.data.email,
                id: response.data.id,
            });
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                //console.log("igothere");

            //console.log(response.data);

            this.props.history.push("/profile");
           window.location.reload();
                
                

            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        //render signup form using the react-validation stuff.
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleSub}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
export default signUp

