//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Rental } from '../components/Rental.js';

//Create Page Controller
function addRentalPageController(){
    
    
    //Load Page Data
    App.loadPage ('Add Rental | Rental Finder', 'template-page-add-rental', {}, () =>{
        //get create rental form
        let rentalForm = document.querySelector('#form-add-rental');
        console.log(rentalForm)
        // submit event
        rentalForm.addEventListener('submit', (event) => {
            console.log('click')
            // prevent form from loading new page
            event.preventDefault();
            //create empty object
            let rentalDataObj = {};
            //create standard formData object
            let formData = new FormData(rentalForm);
            //loop through formData entries
            for(let field of formData.entries()){
                rentalDataObj[field [0]] = field[1]
            }
            // send the form data object to User.Create
            console.log(rentalDataObj)
            Rental.create(rentalDataObj);

        });
    });
}

export { addRentalPageController } //Export Page Controller