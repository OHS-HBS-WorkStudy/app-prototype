import { useState, createContext, useContext } from 'react';

import './App.css';

import {AccountContext, AccountChangeContext, ScreenStateContext} from './App.js';
import Navigator from './modules/Navigator.js';

export default function SignUp() {
      const changeScreen = useContext(ScreenStateContext);
      function sendData() {
        let data = {
          password: document.getElementById("password").value,
          email: document.getElementById("email").value,
        }
    
        post(data);
      }
    
      function post(val) {
        fetch("http://127.0.0.1:8000/confirmUser", {
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
        console.log(json);
        changeScreen(0);
      }
    
      return(
        <body>
        <Navigator />
            <div className="Login">
              <div className="loginScreen">

                <div class="spilt left">
                  <div class="center">
                    <h1>Welcome Back to the website</h1>
                    </div>
                </div>


                <div class="spilt right">
                  <div class="center">
                  <h3>Log In</h3>
                  <div class="inputStyle">
                    <div>
                      <b>Email:</b>
                      <input class="inputStyle" id="email" type="text"/>
                      <br />
                      <b>Password:</b>
                      <input class="inputStyle"  id="password" type="text"/>
                    </div>
                    <br />
                    <button className="btn-send" onClick={sendData}>Log In</button>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
        </body>
      );
}