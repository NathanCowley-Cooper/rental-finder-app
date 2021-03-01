//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { Auth } from '../components/Auth.js';

function homePageController(){
    //Insert Data Using Moustache
    let data = {
        intro: "Welcome to Rental Finder!",
        subHeading: "Click the button below to find a property",    
        
        Heading:"Lets Get Started!",
        pageTitle_1:"Search Rentals",
        pageTitle_2:"Contact Us",
        pageTitle_3:"Create Account",
        rentals_icon: "Images/rental-icon.svg",
        contact_icon: "Images/contact-icon.svg",
        createAccount_icon: "Images/createAccount-icon.svg",

        aboutHeading: "About Us",
        aboutParagraph1: "Rental Finder is a rental company providing you with various property solutions. We have a large database of rental houses and apartment properties around Australia. ",
        aboutParagraph2: "Use Rental Finders advanced serach system to filter properties based on your loaction preferences and bedroom, bathroom and car space needs. ",
        aboutUs_Img: "images/AboutUs.jpg",

        Disclaimer: "Website Disclaimer",
        Disclaimer_body1: "This website has been created as part of an assignment in an approved course of study for Curtin University and contains copyright images not created by the author. All copyright material used remains copyright of the respective owners and has been used here pursuant to Section 40 of the Copyright Act 1968 (Commonwealth of Australia).",
        Disclaimer_body2: "No part of this work may be reproduced without consent of the original copyright owners. See code comments for references."

    }

    //Load Page Data
    App.loadPage ('Home | Welcome to Rental Finder', 'template-page-home', data, () =>{

    //Get View Rental Button
    const viewRentalPageBtn = document.querySelector('.view-rental-page');
    //On Click
        viewRentalPageBtn.addEventListener('click', () => {
            //Link to Rental Page
            location.href = "#rentals";
        })

    //View Rental Page
    const viewRentalPage = document.querySelector('.link-1');
    //On Click
    viewRentalPage.addEventListener('click', () => {
        //Link to Rental Page
        location.href = "#rentals";
    })

    //View Contact page
    const viewContactPage = document.querySelector('.link-2');
    //On Click
    viewContactPage.addEventListener('click', () => {
        //Link to Rental Page
        location.href = "#contact";
    })
    //View Contact page
    const viewCreateaccountPage = document.querySelector('.link-3');
    //On Click
    viewCreateaccountPage.addEventListener('click', () => {
        //Link to Rental Page
        location.href = "#create-account";
    })

    //get sign up form
    let loginForm = document.querySelector('#form-login');
    // submit event
    loginForm.addEventListener('submit', (event) => {
        // prevent form from loading new page
        event.preventDefault();
        //create standard formData object
        let formData = new FormData(loginForm);
        //create empty object
        let formDataObj = {};
        //loop through formData entries
        for(let field of formData.entries()){
            formDataObj[field [0]] = field[1]
        }
        // send the form data object to Auth.SignIn
        Auth.login(formDataObj);

    });

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

    //GSAP Animations-----------------------------
    //heading slide in----------------------------
    const tl = gsap.timeline()
    tl.from('.home-text', {y: 200, opacity: 0, duration: 1, ease: "power2"}, 0.5);
    
    //About Me------------------------------------
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".aboutUs",
            start: "center bottom",
        }
    });
    aboutTl.from('.info', {y: 200, opacity: 0, duration: 0.5, ease: "power2"})
    aboutTl.from('.aboutImg', {x: 300, opacity: 0, duration: 0.5, ease: "power2"})

    //Quick Links-----------------------------------
    const linkTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".Page-QuickLinks",
            start: "center bottom",
        }
    });
    linkTl.from('.link-1', {y: 300, opacity: 0, duration: 0.5, ease: "power2"})
    linkTl.from('.link-2', {y: 300, opacity: 0, duration: 0.5, ease: "power2"})
    linkTl.from('.link-3', {y: 300, opacity: 0, duration: 0.5, ease: "power2"})

    //Login------------------------------------
    const loginTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".login-home",
            start: "center bottom",
        }
    });
    loginTl.from('.login-bar', {y: 200, opacity: 0, duration: 1, ease: "power2"})

    }); 

    

}

export { homePageController } //Export Home Page Controller