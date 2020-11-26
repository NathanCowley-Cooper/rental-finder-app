//Import Componenets
import{ App } from "./App.js";
import { userLoginPageController } from "../page-controllers/login.js";
import { User } from './User.js';
import { Notify } from './notify.js';
import { Modal } from "./modal.js";
import { Auth } from "./Auth.js";

//Create Rental component
const Rental = {
    address: null,
    availability: null,
    bedrooms: null,
    bathrooms: null,
    car_spaces: null,
    pets_allowed: null,
    security_system: null,
    swimming_pool: null,
    price: null,
    cover_image: null,
    rental_info: null,

    //Get Rental Data from Backend
    get: () => {
        //return a promise
        return new Promise ((resolve,reject) => {
            //fetch rentals.json
            fetch('https://rental-finder-api.herokuapp.com/api/rentals')
            .then(res => res.json())
            .then(rentals => {
                resolve(rentals);
            })
            .catch(err => {
                reject(err);
            })
        });
    },

    //Get Rental Properties
    getByIds: (ids) => {
        //return a promise
        return new Promise ((resolve,reject) => {
            //fetch rental
            let url = new URL('https://rental-finder-api.herokuapp.com/api/rentals');
            let params ={ ids: ids};
            url.search = new URLSearchParams(params).toString();
            
            fetch(url)
            .then(res => res.json())
            .then(rentals => {
                resolve(rentals);
            })
            .catch(err => {
                reject(err);
            })
        });
    },



    //Get Rental Filter Data
    getInSuburb: (suburbId) => {
        console.log(suburbId)
        //return a promise
        return new Promise((resolve, reject) => {
            
            //fetch filter data
            let url = new URL('https://rental-finder-api.herokuapp.com/api/rentals');            
            let params = { suburb: suburbId};
            url.search = new URLSearchParams(params).toString();
            console.log(url.search)

            fetch (url)
            .then (res => res.json())
            .then (rentals => {
                resolve(rentals);
            })

            .catch(err => {
                reject(err);
            })
        });
    },



    //Get Suburbs
    getSuburbs: () => {
        //return a promise

        return new Promise((resolve, reject) => {
            //fetch rentals.json
            fetch ('https://rental-finder-api.herokuapp.com/api/suburbs')
            .then (res => res.json())
            .then (suburbs => {
                resolve(suburbs);
            })

            .catch(err => {
                reject(err);
            })
        });
    },

    createRentalObj: (data) => {
        //create empty Object
        const rentalObj = {};
        //set data from Parameter
        rentalObj.data = data;
        //get template HTML
        rentalObj.template = document.querySelector("#template-rental-entry").innerHTML;
        //create Element
        rentalObj.el = document.createElement('div');

        //render
        rentalObj.render = () => {
            //set div class name
            rentalObj.el.className = 'rental-entry';
            //set rental id to data.id
            rentalObj.el.setAttribute('id', `rental-${rentalObj.data._id}`);
            
            //If Rental is in saved (User.sav.Rentals)
            if(User.savRentals.includes(rentalObj.data._id) ){
                rentalObj.el.classList.add('is-saved');
            }

            //render HTML using mustache templete
            rentalObj.el.innerHTML = Mustache.render(rentalObj.template, rentalObj.data);
            //check if rental is in the user templete
            //run events
            rentalObj.events();
            
        }

        //events
        rentalObj.events = () => {
            const viewRentalBtn = rentalObj.el.querySelector('.view-rental-btn');
            viewRentalBtn.addEventListener('click', () => {
                Rental.showModal(rentalObj);
            })
        }

        //render rental entry
        rentalObj.render();
        //return rental Obj
        return rentalObj;


    },

    showModal: (rentalObj) => {
        let rentalShow = {
            address: rentalObj.data.address, 
            bedrooms: rentalObj.data.bedrooms,
            bathrooms: rentalObj.data.bathrooms,
            car_spaces: rentalObj.data.car_spaces,
            pets_allowed: '',
            security_system: '',
            swimming_pool: '',
            price: rentalObj.data.price,
            cover_image: rentalObj.data.cover_image,
            rental_info: rentalObj.data.rental_info
        };
        if (rentalObj.data.pets_allowed == true){
            rentalShow.pets_allowed = '';
        } else {
            rentalShow.pets_allowed = 'No';
        }
        if (rentalObj.data.security_system == true){
            rentalShow.security_system = '';
        } else {
            rentalShow.security_system = 'No';
        }
        if (rentalObj.data.swimming_pool == true){
            rentalShow.swimming_pool = '';
        } else {
            rentalShow.swimming_pool = 'No';
        }
        //Get Modal Template
        const modalTemplate = document.querySelector('#template-rental-modal').innerHTML;
        //render modal content with mustache
        const modalContent = Mustache.render(modalTemplate, rentalShow);
        //Show Modal
        Modal.show(modalContent);
        
        if(Auth.authenticated){
            //create save btn 
            let saveBtn = document.createElement('button');
            saveBtn.classList.add('sav-btn');
            saveBtn.classList.add('button');
            saveBtn.innerText = "Save Rental";
            //Render to modal_row 1 div
            let contentDiv = document.querySelector('.rental-modal > .content-modal > .modal_row-1');
            contentDiv.appendChild(saveBtn);
            if(User.savRentals.includes(rentalObj.data._id) ){
                //Get the Sav Button
                let savBtn = document.querySelector('.modal .sav-btn');
                //Change text to Remve from Saved
                savBtn.innerText = "Remove from Saved";
            }
        }
        
        

        //If User is Authenticated
        if (Auth.authenticated) {
            let savBtn = document.querySelector('.modal .sav-btn');
            //On Click
            savBtn.addEventListener('click', () => {
                //if the Rental is already in User.saved
                if(User.savRentals.includes(rentalObj.data._id) ){
                    //remove from User.savRentals  using User.removeRentalFromSavs()
                    User.removeRentalsFromSav(rentalObj.data._id);
                    Notify.show(`${rentalObj.data.address} was removed from Saved`)
                }
                else{
                    User.addRentalsToSav(rentalObj.data._id);
                    Notify.show(`${rentalObj.data.address} was added to Saved`)
                    //add Rental to User.savRentals using User.addRentalToSavs()
    
    
                }
                //
                rentalObj.render();

                //Remove Modal
                Modal.remove();
    
                
                
            })
        }
        
        

    }
}

export { Rental } //Export Rental Component