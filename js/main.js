document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let buffer = [];
    let lastKeyTime = Date.now();

    //below is ES6, this would have been original document.addEventListener('keydown', function (event) {});
    // we are providing the event parameter to the event handler callback function. We will need that event parameter to check which key is being pressed.

   document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        const charList ='abcdefghijklmnopqrstuvwxyz0123456789';
       
        // console.log(event); this shows what properties are available to us in event. 

        //only want alphanumeric keys:
        if (charList.indexOf(key) === -1) return;

        //Limit the time interval between key presses
        
        const currentTime = Date.now();
        // 1000 miniseconds / 1 second
        if (currentTime - lastKeyTime > 1000) {
            buffer = [];
        }

        //Saving the entered key sequence:
        buffer.push(key);
        lastKeyTime = currentTime;

        //the images are named the same as the key sequences, so all we need to do is to read the input, make it a string, and set that as the url for the background image.

        const container = document.querySelector('#background');
        container.style.backgroundImage = `url(images/${buffer.join('')}.jpg)`;


     
   })
});
