import { useState, createContext, useContext } from 'react';

import './App.css';

import {AccountContext, AccountChangeContext, ScreenStateContext} from './App.js';

import Navigator from './modules/Navigator.js';

import signpic from './img/signpic.png';

export default function SignUp() {
    const accountType = useContext(AccountContext);
    const changeType = useContext(AccountChangeContext);
    const changeScreen = useContext(ScreenStateContext);

    const [activeButton, setActiveButton] = useState("student");
    const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



    const handleButtonClick = (buttonType) => {
      setActiveButton(buttonType);
    };

    let send = false;

      function checkData(data) {
        if(data === null || data === "") {
          alert("Please fill in all the fields");
          send = false;
        }
      }
    
      function sendData() {
        send = true;
        let data = {
          fname: checkData(document.getElementById("fname").value),
          lname: checkData(document.getElementById("lname").value),
          password: checkData(document.getElementById("password").value),
          email: checkData(document.getElementById("email").value),
          type: accountType
        }
        if(send === true){
          post(data);
        }
      }
    
      function post(val) {
        fetch(sessionStorage.getItem("server_address")+"/registerNewUser", {
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
                          <div className='content'>
                          <img src={signpic} alt="signpic" className="signpic"/>
                          </div>
                            
                                {/* <h3>Create Account</h3>
                            <div className="input-container">
                            <label for="fname">First Name:</label>
                            <input id="fname" type="text" placeholder="Enter your first name" />
                            <label for="lname">Last Name:</label>
                            <input id="lname" type="text" placeholder="Enter your last name"/>
                            <label for="password">Password:</label>
                            <input id="password" type="text" placeholder="Enter your password"/>  
                            <label for="email">Email:</label>
                            <input id="email"  type="text" placeholder="Enter your email"/>
                            <button className="btn-send" onClick={sendData}>Submit</button>
                        </div> */}
                      
                    </div>
                </div>

              <div className="split left">
                    <div className="center">
                    
                        <div className="page-title">
                            <h2>Join the Community</h2>
                        </div>


                        <div className="inputbox">
                            <input id="fname" type="text" placeholder="Enter your first name" />
                            <input id="lname" type="text" placeholder="Enter your last name"/>
                            <input type="text" id="email" className="email" placeholder="Email"/>
                            
                            <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            className="password"
                            placeholder="Password"
                          />

                          <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        
                        <div class="button-group-container">
                        <div class="button-group">
                        <button
                                        className={`button-group-btn ${
                                          activeButton === "student" ? "active" : ""
                                        }`}
                                        onClick={() => handleButtonClick("student")}
                                      >
                                        Student
                                      </button>
                                      <button
                                        className={`button-group-btn ${
                                          activeButton === "parent" ? "active" : ""
                                        }`}
                                        onClick={() => handleButtonClick("parent")}
                                      >
                                        Parent
                                      </button>
                                      <button
                                        className={`button-group-btn ${
                                          activeButton === "teacher" ? "active" : ""
                                        }`}
                                        onClick={() => handleButtonClick("teacher")}
                                      >
                                        Teacher
                                      </button>
                        </div>
                      </div>

                        <button className="buttonn" onClick={sendData} >Sign In</button>
                        <div className="border-line">
                        <span>Or login</span>
                    </div>

                        
                    <div className="login-container">
                      <p className="login-text">Have an account? </p>
                      <p className="smalltext">Login here</p>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </body>
      );
}