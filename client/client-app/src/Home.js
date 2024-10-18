import { useState, createContext, useContext } from 'react';

import {ScreenStateContext} from './App.js';

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
                <h1>Hello World</h1>
                <p onClick={SignUp}>Sign-Up</p>
                <p onClick={Login}>Log-in</p>
            </div>
        </div>
    )
}