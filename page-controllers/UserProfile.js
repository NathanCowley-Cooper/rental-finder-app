//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { User } from '../components/User.js';

//Create Page Controller
function userProfilePageController(){
    
    //Insert Data Using Moustache
    let data = {
        intro: "User Profile",        
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        mobile: User.mobile,
        dob: User.dob
    }
    //Load Page Data
    App.loadPage ('User Profile', 'template-page-userProfile', data, () =>{
    
    });
}

export { userProfilePageController } //Export Page Controller