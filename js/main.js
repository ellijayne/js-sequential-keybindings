document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //below is ES6, this would have been original document.addEventListener('keydown', function (event) {});
    // we are providing the event parameter to the event handler callback function. We will need that event parameter to check which key is being pressed.

   document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        const charList ='abcdefghijklmnopqrstuvwxyz0123456789';
       
        // console.log(event); this shows what properties are available to us in event. 

        //only want alphanumeric keys:
        if (charList.indexOf(key) === -1) return;
        console.log(key);
     
   })
});
