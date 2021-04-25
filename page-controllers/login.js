//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Notify } from '../components/notify.js';
import { Modal} from '../components/modal.js';
import { User } from '../components/User.js';
import { Auth } from '../components/Auth.js';

//Create Page Controller
function userLoginPageController(){
    
    //Load Page Data
    App.loadPage ('Login', 'template-page-login', {}, () =>{
        //get sign up form
        let loginForm = document.querySelector('#form-login');
        // submit event
        loginForm.addEventListener('submit', (event) => {
            // prevent form from loading new page
            event.preventDefault();
            //create standard formData object
            let formData = new FormData(loginForm);
            //create empty object
            let formDataObj = {};
            //loop through formData entries
            for(let field of formData.entries()){
                formDataObj[field [0]] = field[1]
            }
            // send the form data object to Auth.SignIn
            Auth.login(formDataObj);

        });
    });

}

export { userLoginPageController }//Export Page Controller

