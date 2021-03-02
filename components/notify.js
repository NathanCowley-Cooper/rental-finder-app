//Import Components
import{ App } from "./App.js";
// import anime from './../node_modules/animejs/lib/anime.es.js';

//Create Notify component
const Notify = {
    showDuration: 3000,
    container: null,

    init: () => {
        //Create Notifications Container Dv and Append to Body
        Notify.container = document.createElement ('div');
        Notify.container.setAttribute('id','notifications');
        document.body.appendChild(Notify.container);
    },

    show: (message) => {
        // Create notificationsEntryDiv and set class
        const notificationsEntryDiv = document.createElement ('div');
        notificationsEntryDiv.className = 'notification-entry';
    
        // set innerHTML to connect to message
        notificationsEntryDiv.innerHTML = message;

        // Append notificationsEntryDiv to container div
        Notify.container.appendChild(notificationsEntryDiv);

        //animatie notificationEntryDiv using anime.js
        // anime({
        //     targets: notificationsEntryDiv,
        //     keyframes:[
        //         { opacity: 0, top: '50px', duration: 0},
        //         { opacity: 1, top: 0, duration: 600, endDelay: Notify.showDuration},
        //         { opacity: 0, top: '-50px', duration: 600},
        //     ],
        //     //Notification Removes
        //     complete: () =>{
        //         notificationsEntryDiv.remove();
        //     }
        //   });

    },

}

export {Notify} //Export Notify Component