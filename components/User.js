//Import Components
import{ App } from "./App.js";
import{ Notify } from "./notify.js";

//Create User Components
const User = {
    firstName: null,
    lastName: null,
    email: null,
    mobile: null,
    smoker: null,
    date_of_birth: null,
    password: null,
    lastLogin: null,
    savRentals: [],

    
    //Create User
    create: (userData) => {
        //send userData to backend API using fetch - POST
        //console.log(userData);
        fetch('https://rental-finder-api.herokuapp.com/api/users', {
        method:'post',
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify (userData)
        })
        .then(res =>{
            if(res.status !=201){
                Notify.show("Problem creating New User")
            }else{
                //User Created Succesfully
                Notify.show("Succesfully Created New User")
                //redirect User to sign In Page #signIn
                location.hash = '#login'
                Notify.show("Please Log In")

            }
        })
        //Catch Error
        .catch(err => {
            console.log(err);
            Notify.show("Problem creating New User")
        })

    },
    //Add Rental to Save 
    addRentalsToSav: (id) => {
        console.log(`Adding Rental ${id} to Saved Properties`)
        //
        User.savRentals.push(id);
        console.log(User.savRentals);

    },
    //Rmove Rental from Sav
    removeRentalsFromSav: (id) => {
        console.log(`Removing rental ${id} from Saved Properties`);
        const index = User.savRentals.indexOf(id);
        if(index > -1 ) {
            User.savRentals.splice(index, 1);
        }
        console.log(User.savRentals);
    },


    
}


export { User } //Export UserComponents