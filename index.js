//Import  Controllers ------------------------------
import { App } from './components/App.js';
import { Auth } from './components/Auth.js';

//Import Page Controllers----------------------
import { rentalsPageController } from './page-controllers/rentals.js';
import { homePageController } from './page-controllers/home.js';
import { userLoginPageController } from './page-controllers/login.js';
import { savedPageController } from './page-controllers/saved.js';
import { contactPageController } from './page-controllers/contact.js';
import { createAccountPageController } from './page-controllers/createAccount.js';
import { userProfilePageController } from './page-controllers/UserProfile.js';
import { addRentalPageController } from './page-controllers/addRental.js';


//Routes--------------------------------
//# (Home)
App.addRoute('#', homePageController);

// //#rentals
// App.addRoute('#rentals', rentalsPageController);

// //#saved-rentals
// App.addRoute('#saved-rentals', savedPageController);

// //#contact
// App.addRoute('#contact', contactPageController);

// //#login
// App.addRoute('#login', userLoginPageController);

// //#Create Account
// App.addRoute('#create-account', createAccountPageController);

// //#user Profile
// App.addRoute('#user-profile', userProfilePageController);

// //#add rental
// App.addRoute('#add-rental', addRentalPageController);

// //#Logout
// App.addRoute('#logout', () => {
//     Auth.logout();
// });

//Load App------------------------------
document.addEventListener("DOMContentLoaded", App.init ); 