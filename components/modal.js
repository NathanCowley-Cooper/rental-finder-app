//Import Components
import{ App } from "./App.js";
import anime from './../node_modules/animejs/lib/anime.es.js';
import { Rental } from "./Rental.js";

//Create Modal Component
const Modal = {
    //Show Close Button
    showCloseBtn: true,

    show: (content) => {
        //Create overlayDiv
        let overlayDiv = document.createElement('div');
        overlayDiv.className = 'modal-overlay';
        //append to rootEl
        App.rootEl.appendChild(overlayDiv);

        //Craete ModalDiv
        let modalDiv = document.createElement('div');
        modalDiv.className = 'modal';
        //Create modalContent
        let modalContent = document.createElement ('div');
        modalContent.className = 'modal-content';
        

        //Insert Content
        modalContent.innerHTML = content;

        //createmodalCloseBtn
        let modalCloseBtn = document.createElement('button');
        modalCloseBtn.className = 'modal-close-btn';
        modalCloseBtn.innerHTML = '&times;';

        //append modalContent to modalDiv
        modalDiv.appendChild(modalContent);

        //If showCloseBtn = true, append modalCloseBtn too
        if (Modal.showCloseBtn === true){
            modalDiv.appendChild(modalCloseBtn);
        }

        //append modalDiv to rootEl
        App.rootEl.appendChild(modalDiv);

        //animate modalDiv entrance using anime.js
        // anime({
        //     targets: modalDiv,
        //     keyframes: [
        //         {opacity: 0, top: '30%', duration: 0},
        //         {opacity: 1, top: '0%', duration: 500}
        //     ]
        // })

        //add event listener to modalCloseBtn
        modalCloseBtn.addEventListener('click', (e) => {
            Modal.remove();
        });

        //add esc key press function to trigger Modal.remove()
        Modal.modalEscKey = (e) => {
            if (e.keyCode == 27){
                console.log("esc key");
                Modal.remove();
            }
        }

        //listen for esc key press
        document.addEventListener('keydown', Modal.modalEscKey);

        var map = L.mapbox.map('map', 'mapbox.outdoors', {
            accessToken: 'pk.eyJ1IjoibGZvcmRoYW0iLCJhIjoiY2s5ejM1cGFqMDY5dTNobWt4Zm96aXVkdCJ9.FidPVWO-jIPaltOb7y353g'
        });

    },

    remove: () => {
        //get overlaydiv & modalDiv
        let overlayDiv = document.querySelector('.modal-overlay');
        let modalDiv = document.querySelector('.modal');

        //overlayDix exit Animation
        anime({
            targets: overlayDiv, 
            opacity: 0, 
            duration: 300,
            easing: 'linear',
            complete:() => {
                overlayDiv.remove();
            }
        });

        //modalDiv exit Animation
        anime({
            targets: modalDiv, 
            opacity: 0, 
            duration: 300,
            top: '60%',
            complete:() => {
                modalDiv.remove();
            }
        });

        //Stop listening for esc key
        document.removeEventListener('keydown', Modal.modalEscKey);

    }

}

export { Modal } //Export Modal Component