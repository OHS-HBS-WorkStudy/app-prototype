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
        <html className="scroll">
        <div className="Home">
            <div>
                <h1 id="title">Anonymous Academy</h1>
                <div className="send-right">
                    <p className="btn-send" onClick={SignUp}>Sign-Up</p>
                    <p  className="btn-send" onClick={Login}>Log-in</p>
                </div>
            </div>
            <div className='thread'>
            <ThreadList />
            </div>
        </div>
        </html>
    )
}