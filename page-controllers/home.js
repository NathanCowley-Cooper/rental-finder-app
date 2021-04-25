//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Modal } from '../components/Modal.js';

//Create Home Page Controller
function homePageController(){
    //Insert Data Using Moustache
    let data = {
        intro: "Welcome to Rental Finder!",
        subHeading: "Click the button below to find a property",    
        
        Heading_1:"Search Rentals",
        Heading_2:"Contact Us",
        Heading_3:"Login",
        Heading_4:"Create an Account"

    }
    //Load Page Data
    App.loadPage ('Home', 'template-page-home', data, () =>{
        
    //Get View Rental Button
    const viewRentalPageBtn = document.querySelector('.view-rentalPage-btn');
    //On Click
        viewRentalPageBtn.addEventListener('click', () => {
            //Link to Rental Page
            location.href = "#rentals";
        })
    }); 

}

export { homePageController } //Export Home Page Controller