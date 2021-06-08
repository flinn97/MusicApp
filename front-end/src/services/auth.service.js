import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
//be sure to upload axios. This is my controller for everything that I do for the backend.
class AuthService {
    login(email, password) {
        //login with email and password. set jwt sign in localStorage.
        console.log(email, password);
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                //console.log(response.data);
                return response.data;
            });
    }
    setPastFirstTime(id, password) {
        //for first time students changing password.
        return axios.post(API_URL + "past", {
            id,
            password,
        });
    }

    logout() {
        //delete jwt sign.
        localStorage.removeItem("user");
    }
    addStudent(user, first, last, email, double, separate) {
        //add student to the database using axios.
        //console.log(user);
        //console.log(email, password);
        return axios
            .post(API_URL + "student", {
                user, first, last, email, double, separate,
            });
    }

    getStudents(user) {
        //get all students from the database for that teacher.
       //console.log(user);
        
        return axios
            .post(API_URL + "getStudents", {
                user,
            })
            
            
            
        

    }
    AddHomework(id, homework) {
        //add homework for student. Homework appears on students page.
        //console.log(name, email, password);
        return axios.post(API_URL + "homework", {
            id,
            homework,
        });
        //console.log(response.data);



    }
    register(name, email, password) {
        //Teacher login. Name email password. Probably going to separate to first name and last name.
        //console.log(name, email, password);
        return axios.post(API_URL + "signup", {
            name,
            email,
            password
        });
            //console.log(response.data);
           
            
        
    }

    getCurrentUser() {
        //gets whatever jwt was saved in local service. 
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();