import { useState, createContext, useContext } from 'react';

import './App.css';
import {AccountContext, AccountChangeContext, ScreenStateContext} from './App.js';

import Navigator from './modules/Navigator.js';

export default function SignUp() {
    const accountType = useContext(AccountContext);
    const changeType = useContext(AccountChangeContext);
    const changeScreen = useContext(ScreenStateContext);
    function changeStudent() {
        changeType("student");
      }
    
      function changeParent() {
        changeType("parent");
      }
    
      function changeTeacher() {
        changeType("teacher");
      }
    
      function sendData() {
        let data = {
          fname: document.getElementById("fname").value,
          lname: document.getElementById("lname").value,
          password: document.getElementById("password").value,
          email: document.getElementById("email").value,
          type: accountType
        }
    
        post(data);
      }
    
      function post(val) {
        fetch("http://127.0.0.1:8000/registerNewUser", {
          method: "POST",
          body: JSON.stringify(val),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((json) => toLogin(json));
      }

      function toLogin(json) {
        console.log(json);
        changeScreen(2);
      }
    
      return(
        <body>
          <Navigator />
          <div className="Sign">
            <div className="container">
                <div class="split right">
                        <div className="center">
                                <h3>Create Account</h3>
                            <div className="input-container">
                            <label for="fname">First Name:</label>
                            <input id="fname" type="text" placeholder="Enter your first name" />
                            <label for="lname">Last Name:</label>
                            <input id="lname" type="text" placeholder="Enter your last name"/>
                            <label for="password">Password:</label>
                            <input id="password" type="text" placeholder="Enter your password"/>  
                            <label for="email">Email:</label>
                            <input id="email"  type="text" placeholder="Enter your email"/>
                        </div>
                    </div>
                </div>

              <div className="split left">
                    <div className="center">
                          <div className="btn-container">
                            <label for="btn"><b>Current Account Type:</b> {accountType}</label>
                              <button className="btn" onClick={changeStudent}>
                                  <span>Student</span>
                              </button>
                              <button className="btn" onClick={changeParent}>
                                  <span>Parent</span>
                              </button>
                              <button className="btn" onClick={changeTeacher}>
                                  <span>Teacher</span>
                              </button>
                              <button className="btn-send" onClick={sendData}>Submit</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      );
}