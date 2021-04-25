//Import Componenets
import { App } from "./App.js";
import { Notify } from "./notify.js";
import { User } from "./User.js";

//Create Auth Componenet
const Auth = {
    //Default Not Logged In
    authenticated: false,

    login: (userData) => {
        //send userData to backend API using fetch - POST
        fetch('https://rental-finder-api.herokuapp.com/api/auth/login',{
            method: 'post',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(userData)
        })
        .then(res => {
            if(res.status != 200) {
                //Problem Logging In
                res.json().then(res=> {
                    Notify.show(res.message);
                });
            }else{
                //Login Success
                res.json().then(res =>{
                //1.save the token to the local storage
                    localStorage.setItem('token', res.token);
                    //2. Set Auth.authenticated as True
                    Auth.authenticated = true;
                    //3.Set User Info In User
                        User.firstName = res.user.first_name;
                        User.lastName = res.user.last_name;
                        User.email = res.user.email;
                        User.mobile = res.user.mobile;
                        User.smoker = res.user.smoker;
                        User.dob = res.user.date_of_birth;
                    //4. Redirect To Homepage
                    location.hash = '#rentals';
                    //5. Show Welcome Message
                    Notify.show(`Welcome ${User.firstName}`); 
                    console.log(res.user.first_name)

                });
            }
        })
        //Console Log and Notify Error
        .catch( err => {
            console.log(err);
            Notify.show('Problem Logging In');
        })

    },

    check: (callback) => {
        // 1. Check if the Token Exists in Local Storage
        if (localStorage.getItem('token') ){
            //validate token using backend API - Make a fetch request (GET)
            fetch('https://rental-finder-api.herokuapp.com/api/auth/validate', {
                headers: { "Authorization": `Bearer ${localStorage.token}` }
            })
            .then(res => {
                if(res.status != 200){
                    // Token validation failed

                    // Set Auth.authenticated to false
                    Auth.authenticated = false;
                    // Remove the local token
                    localStorage.removeItem('token');
                    // Redirect to Home
                    location.hash='#';
                    Notify.show('Invalid Token, Please Login');
                    if ( typeof callback == 'function'){
                        callback();
                    }else{
                        //token Valid
                        res.json().then(res => {
                            console.log("user Authorised");
                            //Set Auth.authenticated = true
                            Auth.authenticated = true;
                            //set the user info(res.user)
                            User.firstName = res.user.first_name;
                            User.lastName = res.user.last_name;
                            User.email = res.user.email;
                            User.mobile = res.user.mobile;
                            User.smoker = res.user.smoker;
                            User.dob = res.user.date_of_birth;

                            //callback
                            if ( typeof callback == 'function'){
                                callback();
                            }

                        })
                    }

                }
            })
            //Console Log and Notify Error
            .catch(err => {
                console.log(err);
                Notify.show("Problem Authorising");
                if ( typeof callback == 'function'){
                    callback();
                }
            })

        }else{
            //No Local token
            Notify.show("No Local Token, Please Login");
            //redirect to Login page
            location.hash = '#login';
            if ( typeof callback == 'function'){
                callback();
            }

        }


    },

    logout: () => {
        //remove local token
        localStorage.removeItem('token');
        //set Auth.authenticated to false
        Auth.authenticated = false;
        //redirect to sign in page
        location.hash = '#';
        Notify.show('You have been Logged Out!');
    }
}


export { Auth } //Export Auth Componenet