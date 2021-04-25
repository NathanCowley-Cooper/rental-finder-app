//Import Componenets
import { Notify } from "./notify.js";
import { Auth } from "./Auth.js";

//Create Appp Compnenet
const App = {
    //Properties
    name: "Rental Finder App",
    version: "2.0.0",
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
            window.scrollTo(0, 0);
            App.loadNav();
            App.loadFooter();
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

        //Create Mobile Burger Menu
        let burger = document.createElement('div');
        burger.className='burger';
        header.appendChild(burger);

        //Create Nav List
        let ul = document.createElement('ul');
        ul.className='nav__list';
        navAnchor.appendChild(ul);

        ul.innerHTML = `
        <li class="nav__item">
            <a href="#">Home</a>
        </li>
        <li class="nav__item">
            <a href="#rentals">Rentals</a>
        </li>
        <li class="nav__item">
            <a href="#contact">Contact</a>
        </li>`;
        if(Auth.authenticated){
            //Signed In - Show item Favourites, Profile & Sign Out
            ul.innerHTML +=`
            <li class="nav__item">
                <a href="#saved-rentals" id = "nav-item-saved" >Saved Rentals</a>
            </li>
            <li class="nav__item">
                <a href="#user-profile" >My Profile</a>
            </li>

            <button class="logout-btn button login-style">SIGN OUT</button>`;

        //Login------------------
            const logoutPageBtn = document.querySelector('.logout-btn');
        //On Click
            logoutPageBtn.addEventListener('click', () => {
            //Link to Login Page
                location.href = "#logout";
            })
        }else{
            //Not Signed In - Show Sign Up & Sign In
            ul.innerHTML +=`
            <li class="nav__item">
                <a href="#create-account">Sign Up</a>
            </li>
            
            <button class="authenticate-btn button login-style">SIGN IN</button>`;

            //Login------------------
            const loginPageBtn = document.querySelector('.authenticate-btn');
            //On Click
            loginPageBtn.addEventListener('click', () => {
                //Link to Login Page
                location.href = "#login";
            })
        };

        burger.innerHTML = `
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>`;


        App.refreshNav();
        App.navSlide();
    },

    loadFooter: () => {
        //grab the template
        let footer = document.querySelector('.main--footer');

        footer.innerHTML = `
        <div class="margin-5">
        <div class="container footer-content">

                <div class="footer-row">
                    <h5>Website Disclaimer</h5>
                    <h6>This website has been created as part of an assignment in an approved course of study for Curtin University and contains copyright images not created by the author. All copyright material used remains copyright of the respective owners and has been used here pursuant to Section 40 of the Copyright Act 1968 (Commonwealth of Australia).
                    </h6>
                    <h6>No part of this work may be reproduced without consent of the original copyright owners. See code comments for references.
                    </h6>
                </div>

                <div class="footer-row">
                    <h5>Contact</h5>

                        <h6 class="m-0">Phone: (08) 6247 6299</h6>
                        <h6 class="m-2">Email: info@rental.finder.com.au</h6>

                        <h6 class="m-0">Address: 102 Avoca St. Sydney, NSW 2035</h6>

                </div>

                <div class="footer-row">
                    <h5>Info</h5>
                    <div class="flex">
                        <h6 class="m-1 align-left">Monday:</h6>
                        <h6 class="m-1 align-right">8am-5pm</h6>
                    </div>
                    <div class="flex">
                        <h6 class="m-1 align-left">Tuesday:</h6>
                        <h6 class="m-1 align-right">8am-5pm</h6>
                    </div>
                    <div class="flex">
                        <h6 class="m-1 align-left">Wednesday:</h6>
                        <h6 class="m-1 align-right">8am-5pm</h6>
                    </div>
                    <div class="flex">
                        <h6 class="m-1 align-left">Thursday:</h6>
                        <h6 class="m-1 align-right">8am-5pm</h6>
                    </div>
                    <div class="flex">
                        <h6 class="m-1 align-left">Friday:</h6>
                        <h6 class="m-1 align-right">8am-5pm</h6>
                    </div>
                    <div class="flex">
                        <h6 class="m-1 align-left">Saturday:</h6>
                        <h6 class="m-1 align-right">CLOSED</h6>
                    </div>
                    <div class="flex">
                        <h6 class="m-1 align-left">Sunday:</h6>
                        <h6 class="m-1 align-right">CLOSED</h6>
                    </div>
                </div>
            </div>
        </div>`;


    },

    //Nav Menu Hamburger Setup
    navSlide: () =>{
        //Define Links
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('#main-nav');
        const navLinks = document.querySelectorAll('#main-nav a');

        burger.addEventListener('click', () =>{
            //Open Nav Menu
            nav.classList.toggle('open');
            
            //Menu Links Animation
            navLinks.forEach(a => {
                a.classList.toggle('fade')
            });

        //Burger Animation
        burger.classList.toggle('toggle');
    });
        
    },
    

    refreshNav: () => {
        //get the current path
        let currentPath = location.hash || '#';
        let navItems = document.querySelectorAll('#main-nav > ul > li > a')
        navItems.forEach((navLink) => {
            if(navLink.getAttribute('href') == currentPath){
                navLink.classList.add('active');
            }
        });
    },  

}


export { App } //Export APP Componenet