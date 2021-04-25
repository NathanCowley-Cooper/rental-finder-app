//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Message } from '../components/contactMessage.js';

//Create Page Controller
function contactPageController(){
    //Craete Data Using Moustache
    let data = {
        intro: "Get In Touch!",  
    }
    //Load Page Data
    App.loadPage ('Contact', 'template-page-contact', data, () =>{
        
        //Render MapBox
        var map = L.mapbox.map('map', 'mapbox.outdoors', {
            accessToken: 'pk.eyJ1IjoibGZvcmRoYW0iLCJhIjoiY2s5ejM1cGFqMDY5dTNobWt4Zm96aXVkdCJ9.FidPVWO-jIPaltOb7y353g'
        });
        
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
    });
}

export { contactPageController } //Export Page Componenet