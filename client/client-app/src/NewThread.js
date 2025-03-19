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

    function SignUp() {
      changeScreen(1);
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
                        <h2>Please sign up or log in to create a new thread!</h2>
                      </div>
                      <div className="box-bottom">
                        <p className="text">
                          You need to be logged in to access this page.
                        </p>
                        <p className="text">
                        Please 
                          <span className="underline" onClick={SignUp}>Sign up</span> 
                          or 
                          <span className="underline" onClick={Login}>Log in</span> 
                          to continue.
                        </p>
                        
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