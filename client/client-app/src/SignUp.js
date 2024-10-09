import { useState, createContext, useContext } from 'react';

import './App.css';
import {AccountContext, AccountChangeContext, ScreenStateContext} from './App.js';

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
        changeScreen(1);
      }
    
      return(
        <div className="SignUp">
          <div id="upper">
            <h3>Create Account</h3>
            <b>First Name:</b>
            <div className="inputStyle">
            <input id="fname" type="text"/>
            <br/>
            <b>Last Name:</b>
            <input id="lname"  type="text"/>
            <br/>
            <b>Password:</b>
            <input id="password"  type="text"/>
            <br/>
            <b>Email:</b>
            <input id="email"  type="text"/>
            <br/>
            </div>
          </div>
          <div>
            <div>
              <p><b>Current Account Type:</b> {accountType}</p>
              <button className="buttonStyle" onClick={changeStudent}>Student</button>
              <button className="buttonStyle" onClick={changeParent}>Parent</button>
              <button className="buttonStyle" onClick={changeTeacher}>Teacher</button>
            </div>
            <button className="buttonStyle" onClick={sendData}>Submit</button>
          </div>
        </div>
      );
}