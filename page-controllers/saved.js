//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Notify } from '../components/notify.js';
import { Rental } from '../components/Rental.js';
import { User } from '../components/User.js';

//Create Page Controller
function savedPageController(){
    //Insert Data Using Moustache
    let data = {
        intro: "Saved Rentals",
        subHeading: "View your Saved Rentals Below!"      
    }

    //Load Page Data
    App.loadPage ('Saved', 'template-page-saved', data, () =>{

        // get div#rentalss-list
        const rentalsListDiv = document.querySelector('#rentals-list');

        // check if user has any saved rentals
        if(User.savRentals.length == 0){
            //no saved - show message
            rentalsListDiv.innerHTML= '<p>No Saved Rentals Yet!</p>'
            
        }else{
            Rental.getByIds(User.savRentals)
            .then (rentals => {
            // console.log(rental);
                console.log("Rental returned!");
                rentals.forEach(rental => {
                    // loop through rentals array
                    const rentalObj = Rental.createRentalObj(rental);
                    rentalsListDiv.append(rentalObj.el);                
                });
            })
            //Catch Error
            .catch (err => {
                console.log(err);
                Notify.show('Problem Loading Saved Rentals');
            });
        }
    });

}

export { savedPageController } //Export Page Controller