import React, { Component } from "react";
import AuthService from "../services/auth.service";
import StudentList from '../components/studentList.js';
import AdddStudent from '../components/dialoghelp.js';
import ExistingEmail from '../components/existingEmail.js';
//this is the teachers profile page. A lot of react stuff going on here using state and pass along functions and such. I'll try to explain.

export default class Profile extends Component {
    //we set state and all the needed things here for other components. we bind all the functions.
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.update = this.update.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.doubleAccount = this.doubleAccount.bind(this);
        this.separate = this.separate.bind(this);


        this.state = {
            
            currentUser: AuthService.getCurrentUser(),
            currentStudents: [],
            first: "",
            last: "",
            email: "",
            updated: false,
            doubleAccount: false,
            existing_email: false,
            separate: false,
            

            
        };

    }
    //handles any change for state
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //When a new student is added to the teachers account this function collects all the students and spits them into state.
    update() {
        //console.log("igothere");
        if (this.state.updated) {
            AuthService.getStudents(this.state.currentUser.account._id).then(response => {
                this.setState({
                    currentStudents: response.data,
                });
            });
            this.setState({
                updated: false,
            })
        }
    }
    //this will help populate screen with all the students in the database for the teacher at mount time.
    componentDidMount() {
      
        console.log(this.state.currentUser.account._id);
        AuthService.getStudents(this.state.currentUser.account._id).then(response => {
            console.log(response);
            this.setState({
                
                currentStudents: response.data,
            });
        });
        //console.log(this.state.currentstudents);
        
    }
    //this function will use controller Authservice to add a student with given material in state. Then uses components to reload a view of all the students.
    async addStudent(e) {
        e.preventDefault();
        await this.setState({
            updated: true,
        });

        AuthService.addStudent(
            this.state.currentUser,
            this.state.first,
            this.state.last,
            this.state.email,
            this.state.doubleAccount,
            this.state.separate,


        ).then(response => {
            if (response.data.existing_email) {
                this.setState({
                    existing_email: response.data.existing_email,
                })
            }
            else {
                window.location.reload();
                this.update();
            }
        });
    }
            //allows me to close the popup.
    async handleClose(e){
        await this.setState({
            existing_email: false,
        })
}
    //tells the backend to create another student in the same account.
    async doubleAccount(e) {
        await this.setState({
            doubleAccount: true,

        });
        AuthService.addStudent(
            this.state.currentUser,
            this.state.first,
            this.state.last,
            this.state.email,
            this.state.doubleAccount,
            this.state.separate,


        )
        window.location.reload();
        this.update();

        
    }
    //tells the backend to keep students with the same email as seperate accounts.
    async separate(e) {
        await this.setState({
            separate: true,

        });

        AuthService.addStudent(
            this.state.currentUser,
            this.state.first,
            this.state.last,
            this.state.email,
            this.state.doubleAccount,
            this.state.separate,


        )
        window.location.reload();
        this.update();


    }
   
    //I'm going to render StudentList for the list of students and the line after that only renders as a popup for when a student is added with the same email as another student.
    //I'm passing handleclose doubleAccount and separate to the next component Existing Email.
    render() {
        const { history } = this.props;
        return (
            <div className="container">
                
                <AdddStudent addStudentButton={this.addStudent} handleChange={this.handleChange} />
                
                {this.state.existing_email && (<ExistingEmail handleClose={this.handleClose} doubleAccount={this.doubleAccount} separate={this.separate} />)}

                <StudentList students={this.state.currentStudents} history={history} />
                
        </div>
    

             
                
            
        );
    }
}