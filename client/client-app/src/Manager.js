import {useState, useContext} from 'react';

import { ScreenContext, ScreenStateContext } from './App';

import SignUp from './SignUp.js';
import Login from './Login.js';
import Home from './Home.js';

export default function Manager() {
    const screenState = useContext(ScreenContext);

    switch(screenState) {
        case 1:
            return(
                <div>
                    <SignUp />
                </div>
            );
        case 2:
            return(
                <div>
                    <Login />
                </div>
            );
        default:
            return(
                <Home />
            )
    }
}