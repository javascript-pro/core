// scenes/core.ts

/* 
Using the gsap animation library, this is the scene manager script
it should have an init function which will be called on useEffect in the 
Flash component
*/

import {moveTo} from '../ActionScript';

const clips = [
    "redux",
    "rehydrate-ad",
];

export const init = (divId: string) => {
    reset();
}

// const 

const reset = () => {
    console.log("core.ts > reset", clips);
    
    // moveTo("rehydrate-ad", "center middle")
}