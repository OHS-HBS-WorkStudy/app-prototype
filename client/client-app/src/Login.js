import { useState, useContext } from 'react';
import './App.css';
import { AccountContext, AccountChangeContext, ScreenStateContext, GetLoggedInState, LoggedinState } from './App.js';
import Navigator from './modules/Navigator.js';

import loginpic from './img/loginpic.png'

export default function SignUp() {
  const changeScreen = useContext(ScreenStateContext);
  const loggedin = useContext(LoggedinState);
  const getLoggedIn = useContext(GetLoggedInState);

  function sendData() {
    let data = {
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
    };
    post(data);
  }

  function post(val) {
    fetch(sessionStorage.getItem("server_address") + "/confirmUser", {
      method: "POST",
      body: JSON.stringify(val),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => toHome(json));
  }

  function toHome(json) {
    if(json.length > 0) {
      console.log(json);
      sessionStorage.setItem("user", JSON.stringify(json));
      getLoggedIn(true);
      console.log(json, loggedin);
      changeScreen(0);
    }else {
      alert("Wrong email or password");
    }
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 10 - 5; 
    const y = (e.clientY / window.innerHeight) * 10 - 5; 
    setPosition({ x, y });
  };

  return (
    <body>
      <Navigator />
      <div className="Login">
        <div className="container">
          <div
            className="split right"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
          >
            <div
              className="content"
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                transition: 'transform 0.3s ease',
              }}
            >
              <img src={loginpic} />
            </div>
          </div>

          <div className="split left">
            <div className="page-title">
              <h2>Welcome Back!</h2>
            </div>
            <div className="inputbox">
              <input type="text" id="email" name="email" placeholder="Email" />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
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
            <button onClick={sendData} className="buttonn">
              Sign In
            </button>
            <div className="border-line">
              <span>Or Sign Up</span>
            </div>
            <div className="login-container">
              <p className="login-text">Don't have an account? </p>
              <p className="smalltext">Sign Up here</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}