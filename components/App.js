//Import Componenets
import { Notify } from "./notify.js";
import { User } from "./User.js";
import { Auth } from "./Auth.js";

//Create Appp Compnenet
const App = {
    //Properties
    name: "Rental Finder App",
    version: "1.0.0",
    author: "Nathan Cowley-Cooper",
    rootEl: document.querySelector("#app"),
    routes: {},
    //Methods
    init: () => {
        Notify.init();
        App.router ();
        window.addEventListener('hashchange', App.router);
    },
    
    //Add Route
    addRoute: (path, pageController) => {
        //Adding an Entry to app.routes
        App.routes[path] = {
            controller: pageController
        }
    },

    router: () => {
        //Grabs the Hash Location from the browser location
        const path = location.hash || '#';
        //Find route for this path, in App.Routes
        const route = App.routes[path]; 
        //If route exists for this path
        if(route){
            //run the route.controller
            route.controller();
        }
        else{
            //load 404 Page
            App.loadPage('404 Page/File Not Found', 'template-page-404', {});
        }
    },

    //Load Page
    loadPage: (title, templateId, data, callback) => {
        //set document title
        document.title = title;

        //grab the template and store in a variable
        let template = document.querySelector(`#${templateId}`).innerHTML;
        let output = Mustache.render(template, data);

        //insert the output HTML into the rootEl

        //Animation
        //fade out App Div
        App.rootEl.className = 'hidden';
        //load in new HTML and Fade In
        setTimeout(function(){
            App.rootEl.innerHTML = output;
            App.rootEl.className = '';
            App.loadNav();
            //run callback
            if(typeof callback== 'function'){
                callback();
            }
        },300);


    },
    
    //Load Nav Bar
    loadNav: () => {
        //grab the template
        let header = document.querySelector('.page-header');
        
        //Create Div Element (Logo)
        let logoAnchor = document.createElement('a');
        //Class Name
        logoAnchor.className='logo';
        //On Click redirect to Home
        logoAnchor.href="#";
        //Append to Header
        header.appendChild(logoAnchor);
        //Create Image Element
        let logoImg = document.createElement('img');
        //Image Class Name
        logoImg.className = 'logo-img';
        //Select Image
        logoImg.setAttribute('src', '../images/logo.png')
        //Appen to Div Class
        logoAnchor.appendChild(logoImg);
        
        //Create Main Nav div
        let navAnchor = document.createElement('nav');
        navAnchor.id='main-nav';
        header.appendChild(navAnchor);
        
        //Main Nav Menu Headings
        let mainNav = document.querySelector('#main-nav');
        mainNav.innerHTML = `
        <a href="#">Home</a>
        <a href="#rentals">Rentals</a>
        <a href="#contact">Contact</a>`;
        if(Auth.authenticated){
            //Signed In - Show item Favourites, Profile & Sign Out
            mainNav.innerHTML +=`
            <a href="#saved-rentals" id = "nav-item-saved" >Saved Rentals</a>
            <a href="#add-rental" >Add Rental</a>
            <a href="#user-profile" >My Profile</a>
            <a href="#logout" >Logout</a>`;
        }else{
            //Not Signed In - Show Sign Up & Sign In
            mainNav.innerHTML +=`
            <a href="#create-account">Create Account</a>
            <a href="#login">Login</a>`;
        };
        App.refreshNav();
    },

    refreshNav: () => {
        //get the current path
        let currentPath = location.hash || '#';
        let navItems = document.querySelectorAll('#main-nav > a')
        navItems.forEach((navLink) => {
            if(navLink.getAttribute('href') == currentPath){
                navLink.classList.add('active');
            }
        });
    }

     
}


export { App } //Export APP Componenet