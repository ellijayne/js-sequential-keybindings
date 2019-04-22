document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //The options object: A really nice way of providing parameters for functions is by providing the object with the properties which hold the parameter values. It is most useful in cases where there are many parameters to be passed to the function and especially in cases where those parameters are optional and represent some sort of configuration for the function.

    const options = {
        eventType: 'keydown',
        keystrokeDelay: 1000
    };

    keyChecker(updateBackground, options);

    function keyChecker(callback, options) {
        const charList ='abcdefghijklmnopqrstuvwxyz0123456789';

        //using options object here: 
        const eventType = options && options.eventType || 'keydown';
        const keystrokeDelay = options && options.keystrokeDelay || 1000;

        //Add the state management - No, this won’t be redux or any other state management library, it would be silly to add the whole library for such small script. We will simply organize our variables which hold the state of the script, the buffer and lastKeyTime, into one object and update it on every change.

        let state = {
            buffer: [],
            lastKeyTime: Date.now()
        };

       
        // non ES^ would be document.addEventListener('keydown', function (event) {});
        // we are providing the event parameter to the event handler callback function. We will need that event parameter to check which key is being pressed.

        document.addEventListener('keydown', event => {
            const key = event.key.toLowerCase();
            const currentTime = Date.now();
            let buffer = [];

            //Limit the time interval between key presses
            if (currentTime - state.lastKeyTime > keystrokeDelay) {
                //This line is resetting the buffer in the case where more time has passed between keystrokes than the keystrokeDelay defines.
                buffer = [key];
            } else {
                //This line is using the spread operator ... to fill the new array with the values from the state buffer, and then we add the current key to the array. With that, the buffer is updated.
                buffer = [...state.buffer, key];
            }

           
           
            // console.log(event); this shows what properties are available to us in event. 

            //only want alphanumeric keys:
            if (charList.indexOf(key) === -1) return;

            

            //Saving the entered key sequence:
            // buffer.push(key);   this is now managed by state!
            // lastKeyTime = currentTime;
            state = {buffer: buffer, lastKeyTime: currentTime};
            //the above line is  updating the state by assigning the new object with new buffer and lastKeyTime values.

            
            //we can define a function that we can pass to the keyMapper function and then execute it from there. - see updateBackground() below.

            callback(buffer);


        })
    } //keyChecker()

    function updateBackground(keySequence) {

        //the images are named the same as the key sequences, so all we need to do is to read the input, make it a string, and set that as the url for the background image.

        const container = document.querySelector('#background');
            container.style.backgroundImage = `url(images/${keySequence.join('')}.jpg)`;

            updateUI(keySequence);
        }
        
        function updateUI(keySequence) {
            const userInput = keySequence.join('');
            const keySequences = {
                'idfa': 'All Weapons + Ammo',
                'idkfa': 'All Weapons + Ammo + Keys',
                'idbeholds': 'Beserk Pack',
                'idclev31': 'Bonus Level'
            };
            const userInputDisplay = document.querySelector('#user_input');
            userInputDisplay.textContent = userInput;
        
            const cheatMessage = document.querySelector('#cheat_message');
            cheatMessage.textContent = keySequences[userInput] || 'Nothing';
    }
});
