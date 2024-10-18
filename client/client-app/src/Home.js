import { useState, createContext, useContext } from 'react';

import {ScreenStateContext} from './App.js';

import ThreadList from './modules/ThreadList.js';

export default function Home() {
    const changeScreen = useContext(ScreenStateContext);

    function SignUp() {
        changeScreen(1);
    }

    function Login() {
        changeScreen(2);
    }
    return(
        <div>
            <div >
                <h1>Anonymous Academy</h1>
                <p onClick={SignUp}>Sign-Up</p>
                <p onClick={Login}>Log-in</p>
            </div>

            <ThreadList />
        </div>
    )
}