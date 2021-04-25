//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Notify } from '../components/notify.js';
import { Auth } from '../components/Auth.js';

//Create Page Controller
function UserLoginPageController(){
    
    //Load Page Data
    App.loadPage ('Sign In | Rental Finder', 'template-page-login', {}, () =>{
        //get sign up form
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


        //Back To Top Button
        function returnTop(){
            const btt = document.getElementById('btt');
            if ( window.pageYOffset > 800 ) {
                btt.classList.add("active-btn");
            } else {
                btt.classList.remove("active-btn");
            }
        }
        window.onscroll = function() {
            returnTop();
        }
    });

}

export { UserLoginPageController }//Export Page Controller

