//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Notify } from '../components/notify.js';
import { Rental } from '../components/Rental.js';

//Create Page Controller
function RentalsPageController(){
    //Insert Data Using Moustache
    let data = {
        intro: "Rental Houses",
        subHeading: "View Available Rentals Below!"      
        //firstName: User.firstName,
        //lastName: User.lastName,
        //email: User.email,

    }

    //Load Page Data
    App.loadPage('Rental Properties | Rental Finder', 'template-page-rentals', data, () => {
        //get #divs rentals list
        const rentalsListDiv = document.querySelector('#rentals-list');

        //get div #rentals-list-filters
        const rentalsListFiltersDiv = document.querySelector('#rentals-list-filters');

        //render suburb buttons
        Rental.getSuburbs()
        .then(suburbs => {
            //loop through each suburb and create a button
            suburbs.forEach(suburb => {
                //create button
                let suburbBtn = document.createElement('button');
                suburbBtn.className = 'button filter-btn';
                suburbBtn.innerText = suburb.name;
                //append suburb Btn to Filters Div
                rentalsListFiltersDiv.appendChild(suburbBtn);

                //click event
                suburbBtn.addEventListener('click', () => {
                    //remove is-active from all button
                    let allSuburbBtns = document.querySelectorAll('.filter-btn');
                    allSuburbBtns.forEach(btn =>{
                        btn.classList.remove('is-active');
                    });
                    
                    //make button active
                    suburbBtn.classList.toggle('is-active');

                    rentalsListDiv.innerHTML = '';
                    //Backend API call - get rentals only from certain suburb
                    Rental.getInSuburb(suburb._id)
                    .then (rentals => {
                        console.log("rentals returned!");
                        rentals.forEach(rental => {
                            // look through Rentals array
                            const rentalObj = Rental.createRentalObj(rental);
                            rentalsListDiv.append(rentalObj.el);                
                        });
                    })
                    .catch (err => {
                        console.log(err);
                        Notify.show('Problem Filtering Rentals');
                    });
                })
            });
        })
        .catch(err => {
            console.log(err);
        })

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

        //Create a Clear Filters Button
        let clearFiltersBtn = document.createElement('button');
        clearFiltersBtn.className = 'button filter-btn';
        clearFiltersBtn.innerText = 'All Suburbs';
        rentalsListFiltersDiv.appendChild(clearFiltersBtn);
        //click
        clearFiltersBtn.addEventListener('click', () => {
            //remove is-active from all button
            let allSuburbBtns = document.querySelectorAll('.filter-btn');
            allSuburbBtns.forEach(btn =>{
                btn.classList.remove('is-active');
            });
            rentalsListDiv.innerHTML = '';
            getAllRentals();
        });
        

        // get all rentals
        function getAllRentals(){
        Rental.get()
            .then (rentals => {
                console.log("rentals returned!");
                rentals.forEach(rental => {
                // look through Rentals array
                const rentalObj = Rental.createRentalObj(rental);
                rentalsListDiv.append(rentalObj.el);                
                });
            })
            .catch (err => {
                console.log(err);
                Notify.show('Problem Loading Rentals');
            });
        }
        //Run Function
        getAllRentals()
        });  

}

export { RentalsPageController } //Export page Controller