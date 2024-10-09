import { useState, createContext, useContext } from 'react';

import './App.css';

import {AccountContext, AccountChangeContext} from './App.js';

export default function SignUp() {
    const accountType = useContext(AccountContext);
    const changeType = useContext(AccountChangeContext);
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
          .then((json) => console.log(json));
      }
    
      return(
        <div className="signupcontent">
          <h3>Create Account</h3>
          <b>First Name:</b>
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
          <div className="accBut">
            <p><b>Current Account Type:</b> {accountType}</p>
            <button onClick={changeStudent}>Student</button>
            <button onClick={changeParent}>Parent</button>
            <button onClick={changeTeacher}>Teacher</button>
          </div>
          <button onClick={sendData}>Submit</button>
    
        </div>
      );
}