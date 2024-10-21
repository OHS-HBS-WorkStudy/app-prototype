import { useState, createContext, useContext } from 'react';

import {ScreenStateContext} from './App.js';
import './App.css';
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
        <html>
        <div className="Home">
            <div>
                <h1 className="title">Anonymous Academy</h1>
                
                <p onClick={SignUp}>Sign-Up</p>
                <p onClick={Login}>Log-in</p>
            </div>
            <div className='thread'>
            <ThreadList />
            </div>
        </div>
        </html>
    )
}