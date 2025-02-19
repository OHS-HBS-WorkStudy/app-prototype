import { useState, createContext, useContext } from 'react';

import './App.css';


import {AccountContext, AccountChangeContext, ScreenStateContext, GetLoggedInState, LoggedinState} from './App.js';
import Navigator from './modules/Navigator.js';

export default function SignUp() {
      const changeScreen = useContext(ScreenStateContext);
      const loggedin = useContext(LoggedinState);
      const getLoggedIn = useContext(GetLoggedInState);
      function sendData() {
        let data = {
          password: document.getElementById("password").value,
          email: document.getElementById("email").value,
        }
    
        post(data);
      }
    
      function post(val) {
        fetch(sessionStorage.getItem("server_address")+"/confirmUser", {
          method: "POST",
          body: JSON.stringify(val),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((json) => toHome(json));
      }

      function toHome(json) {
        sessionStorage.setItem("user", JSON.stringify(json));
        getLoggedIn(true);
        console.log(json, loggedin);
        changeScreen(0);
      }
    
      return(
          <body>
            <Navigator />
            <div className="Login">
                <div className="container">
                    <div className="split left">
                        <div className="center">
                            <h1>Welcome Back to the Website</h1>
                        </div>
                    </div>

                    <div className="split right">
                        <div className="center">
                                <h3>Log In</h3>
                            <div className="input-container">
                                <label for="email">Email:</label>
                                <input id="email" type="text" placeholder="Enter your email" />

                                <label for="password">Password:</label>
                                <input id="password" type="text" placeholder="Enter your password" />

                                <button className="btn-send" onClick={sendData}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
      );
}