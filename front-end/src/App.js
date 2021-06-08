import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//uploade above stuff from npm.
import "./App.css";
import AuthService from "./services/auth.service";
import Register from "./pages/usersignup";
import Login from "./pages/signin";
import Home from "./pages/home";
import Profile from "./pages/profile";
import BoardUser from "./components/board-user.component";
import Student from "./pages/student";
import Student_profile from "./components/student_routes";
//nav bar helps to navigate from page to page with authorizations to login or sign up etc. 
class App extends Component {
    constructor(props) {
        //create state
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }
    //get user if it exists from the jwt.sign for browser history. I don't use cookies for this app.
    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            
            });
        }
    }
    //logout
    logOut() {
        AuthService.logout();
    }

    render() {
        //render navbar and pages according to information sent from backend and jwt.
        const { currentUser} = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Home
          </Link>
                    <div className="navbar-nav mr-auto">
                        

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        
                        <div className="navbar-nav ml-auto">
                            {currentUser.role === "student" ? 
                                (
                                    <li className="nav-item">
                                        

                            <Link  
                                    to={{
                                    pathname: "/student_routes",
    
                                    state: { current: currentUser }
                                   }}
                                            className="nav-link"   >
                                            
                                        {currentUser.role}
                                    </Link>
                                </li>
                                ) : (
                            <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link" >
                                    {currentUser.name}
                                </Link>
                            </li>
                                )
                            }
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                </a>
                            </li>
                        </div>
                    ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                </Link>
                                </li>
                            </div>
                        )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/user" component={BoardUser} />
                        <Route path="/student/" component={Student} />
                        <Route exact path="/student_routes" component={Student_profile} />
                        
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;