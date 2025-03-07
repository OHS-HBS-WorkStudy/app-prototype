import NewThreadInput from "./modules/NewThreadInput.js";
import Navigator from './modules/Navigator.js';
import './CSS/NewThreadPage.css';

import React, { useState, useEffect, useContext } from 'react';
import { ScreenStateContext } from './App.js';

export default function NewThread() {
    const changeScreen = useContext(ScreenStateContext);
    
    
    function Login() {
        changeScreen(2);
    }

    let data = JSON.parse(sessionStorage.getItem("user"));

    return(
        <> 
            <Navigator />
            <body>
            {data === null && (
                <div className="overlay">
                <div className="box-holder">
                    <div className="overlay-box">
                    <div className="box-content">
                        <div className="box-top">
                        <h2>Please log in to access your account</h2>
                        </div>
                    <div className="box-bottom">
                        <p className="text">You need to log in to access this page. Please <div className="underline" onClick={Login}>log in</div> to continue.</p>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {data !== null && (
                <div>
                <h1>Create new Thread</h1>

                <NewThreadInput />
                </div>
            )}
            </body>
        </>
    );
}