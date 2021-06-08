import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Route from "./routeFunc";
import StudentArray from "./student_array.js";
//works as a routing function for the student. Some tricky code here.
export default class Student_routes extends Component {
    //set state needed for backend usage.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentsMounting = this.componentsMounting.bind(this);
        this.profile = this.profile.bind(this);
        this.goals = this.goals.bind(this);
        this.handlePage = this.handlePage.bind(this);


        this.state = {
            currentUser: AuthService.getCurrentUser(),
            password1: "",
            password2: "",
            profile: false,
            needPassword: true,
            pastFirstTime: this.props.history.location.state.current.pastFirstTime,
            currentPage: "",
            default: [],


        };
       
    }
    //logged in for a student this mounting step will help pick the first student in the account as the landing page.
    componentDidMount() {
        const account = [];
        for (let i = 0; i < this.state.currentUser.account.length; i++) {
            
            account.push(this.state.currentUser.account[i]);

        }
        if (this.state.currentPage === "") {
            this.setState({
                currentPage: account[0],
            })
        }
        
    }
    //may or may not use this one.
    componentsMounting() {

        if (this.state.currentUser.pastFirstTime) {

            return true;
        }
        else {

            return false;
        }
    }
       

    //helps handle all state changes.
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //will be used with buttons later. It's used when there are multiple students on one account.
    handlePage = (student) => {
     
        this.setState({
            currentPage: student,
        })
    }
    //this is used when the student logs in for the first time.
    handleLogin = (e) => {
        this.setState({
            profile: true,
            needPassword: false,
            pastFirstTime: true,
        });
        AuthService.setPastFirstTime(this.state.currentUser.id, this.state.password1);
        
    }


    //if profile is picked then it shows the profile page.
    profile=(e) => {
        this.setState({
            profile: true,

        });
    }
    //if goals are picked then it shows the goals page.
    goals = (e) => {
        this.setState({
            profile: false,

        });
    }
    //tricky render actually. Essentially if its the first time that the student has logged in they need to put in a new password. Otherwise the normal with show up.
    render() {
        
        return (

            <div>
                {this.state.pastFirstTime ? (
                    <div>
                        <StudentArray handlePage={this.handlePage} props = { this.state.currentUser } />
                        <button className="change-button" onClick={this.profile}>profile</button>
                        <button className="change-button" onClick={this.goals}>Goals</button>
                        <Route props={this.state} handleChange={this.handleChange} handleLogin={this.handleLogin} />
                        </div>
                        ):(

                <Route props={this.state} handleChange={this.handleChange} handleLogin={this.handleLogin}/>
                        )}
            </div>
        );
    }
}