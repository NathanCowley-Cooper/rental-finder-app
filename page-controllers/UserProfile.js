//Import  Controllers ------------------------------
import { App } from '../components/App.js';
import { User } from '../components/User.js';

//Create Page Controller
function userProfilePageController(){
    
    //Insert Data Using Moustache
    let data = {
        
        intro: "User Profile",        
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        mobile: User.mobile,
        dob: User.dob,
        smoker: '',

        myPic: "images/user-icon.png"

    };
    if (data.smoker == true){
        data.smoker = 'Yes';
    } else {
        data.smoker = 'No';
    }
    //Load Page Data
    App.loadPage ('User Profile', 'template-page-userProfile', data, () =>{
        //Create Edit Button
        let editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.classList.add('button');
        editButton.innerText = "EDIT";
        //Render to user_row_four
        let editDiv = document.querySelector('.userProfile > #myProfile > #userProfileContent > #user_row_four');
        editDiv.appendChild(editButton);

        //Create Delete Button
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.classList.add('button');
        deleteButton.innerText = "DELETE";
        //Render to user_row_four
        let deleteDiv = document.querySelector('.userProfile > #myProfile > #userProfileContent > #user_row_four');
        deleteDiv.appendChild(deleteButton);

    });
}

export { userProfilePageController } //Export Page Controller