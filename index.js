//Import  Controllers ------------------------------
import { App } from './components/App.js';
import { Auth } from './components/Auth.js';

//Import Page Controllers----------------------
import { RentalsPageController } from './page-controllers/rentals.js';
import { HomePageController } from './page-controllers/home.js';
import { UserLoginPageController } from './page-controllers/login.js';
import { SavedPageController } from './page-controllers/saved.js';
import { ContactPageController } from './page-controllers/contact.js';
import { CreateAccountPageController } from './page-controllers/createAccount.js';
import { UserProfilePageController } from './page-controllers/UserProfile.js';
import { AddRentalPageController } from './page-controllers/addRental.js';


//Routes--------------------------------
//# (Home)
App.addRoute('#', HomePageController);

//#rentals
App.addRoute('#rentals', RentalsPageController);

//#saved-rentals
App.addRoute('#saved-rentals', SavedPageController);

//#contact
App.addRoute('#contact', ContactPageController);

//#login
App.addRoute('#login', UserLoginPageController);

//#Create Account
App.addRoute('#create-account', CreateAccountPageController);

//#user Profile
App.addRoute('#user-profile', UserProfilePageController);

//#add rental
App.addRoute('#add-rental', AddRentalPageController);

//#Logout
App.addRoute('#logout', () => {
    Auth.logout();
});

//Load App------------------------------
document.addEventListener("DOMContentLoaded", App.init ); 