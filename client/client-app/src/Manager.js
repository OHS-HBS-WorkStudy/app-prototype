import {useState, useContext} from 'react';

import { ScreenContext, ScreenStateContext } from './App';

import SignUp from './SignUp.js';
import Login from './Login.js';

export default function Manager() {
    const screenState = useContext(ScreenContext);

    switch(screenState) {
        case 0:
            return(
                <div>
                    <SignUp />
                </div>
            );
        case 1:
            return(
                <div>
                    <Login />
                </div>
            );
    }
}