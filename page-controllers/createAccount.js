//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { User } from '../components/User.js';
import { Notify } from "../components/notify.js";

//Create Page Controller
function CreateAccountPageController(){
    
    //Insert Data Using Moustache
    let data = {
        intro: "Please login..."        
    }
    
    //Load Page Data
    App.loadPage ('Sign Up | Rental Finder', 'template-createAccount', {}, signUpEvent )
}

function signUpEvent() {
    let signUpForm = document.getElementById('form-create-account');
    // listen for sign up form submission
    signUpForm.addEventListener('submit', (e) => {
        // prevent default submit behaviour
        e.preventDefault();
        // create empty form data object
        let formDataObj = {}
        // create new form data using signup form input data
        let formData = new FormData(signUpForm);
        for(let entry of formData.entries()) {
            formDataObj[entry[0]] = entry[1];
        }
        // run User.create with form data 
        User.create(formDataObj);
    });
}


export { CreateAccountPageController } //Export Page Component