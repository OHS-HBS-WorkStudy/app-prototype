import {useState, useContext} from 'react';

import { ScreenContext, ScreenStateContext } from './App';

import SignUp from './SignUp.js';
import Login from './Login.js';
import ThreadPage from './ThreadPage.js';
import NewThread from './NewThread.js';
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
        case 3:
            return(
                <div>
                    <ThreadPage />
                </div>
            )
        case 4:
            return(
                <div>
                    <NewThread />
                </div>
            )
        default:
            return(
                <Home />
            )
    }
}