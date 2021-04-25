//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Notify } from '../components/notify.js';
import { Rental } from '../components/Rental.js';
import { User } from '../components/User.js';

//Create Page Controller
function savedPageController(){
    //Insert Data Using Moustache
    let data = {
        intro: "Saved Rental Houses",
        subHeading: "View your Saved Rentals Below!"      
    }

    //Load Page Data
    App.loadPage ('Saved | Rental Finder', 'template-page-saved', data, () =>{

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

export { savedPageController } //Export Page Controller