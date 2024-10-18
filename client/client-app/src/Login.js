import { useState, createContext, useContext } from 'react';

import './App.css';

import {AccountContext, AccountChangeContext} from './App.js';

export default function SignUp() {
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
          .then((json) => console.log(json));
      }
    
      return(
        <body>
        <div className="Login">
          <div id='center'>
          <div className="inputStyle">
          <h3>Log In</h3>
          <b>Email:</b>
          <input id="email" type="text"/>
          <b>Password:</b>
          <input id="password" type="text"/>
          </div>
          <button className="buttonStyle" onClick={sendData}>Log In</button>
          </div>
        </div>
        </body>
      );
}