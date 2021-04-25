//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Message } from '../components/contactMessage.js';

//Create Page Controller
function contactPageController(){
    //Craete Data Using Moustache
    let data = {
        intro: "Contact Us",  
    }
    //Load Page Data
    App.loadPage ('Contact | Rental Finder', 'template-page-contact', data, () =>{
        
        //get sign up form
        let contactForm = document.querySelector('#form-send-message');
        // submit event
        contactForm.addEventListener('submit', (event) => {
            // prevent form from loading new page
            event.preventDefault();
            //create standard formData object
            let formData = new FormData(contactForm);
            //create empty object
            let contactDataObj = {};
            //loop through formData entries
            for(let field of formData.entries()){
                contactDataObj[field [0]] = field[1]
            }
            // send the form data object to User.Create
            Message.create(contactDataObj);

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

        //Get Back to Top Button Button
        const goTopPageBtn = document.querySelector('#btt');
        //On Click
        goTopPageBtn.addEventListener('click', () => {
            //Link to Top
            window.scrollTo(0, 0);
        })
    });
}

export { contactPageController } //Export Page Componenet