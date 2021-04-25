//Import Components
import{ App } from "./App.js";
import{ Notify } from "./notify.js";

//Create Message Component
const Message = {
    your_name: null,
    email: null,
    mobile: null,
    messageSubject: null,
    yourMessage: null,

    create: (messageData) => {
        //send userData to backend API using fetch - POST
        console.log(messageData);
        //Grab Messages from Backend
        fetch('https://rental-finder-api.herokuapp.com/api/messages', {
        method:'post',
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify (messageData)
        })
        .then(res =>{
            if(res.status !=201){
                Notify.show("An Error Occured Sending New Message")
            }else{
                //User Created Succesfully
                Notify.show("Your Message has been Sent")
            }
        })
        //Console Log and Notify Error
        .catch(err => {
            console.log(err);
            Notify.show("Problem creating New Message")
        })
    },
    
}


export { Message } //Export Message Component