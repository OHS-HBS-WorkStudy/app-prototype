import logo from './logo.svg';
import './App.css';

import { useState, createContext } from 'react';

import Manager from './Manager.js';

import conf from './configs/dev.json';

export const AccountContext = createContext(0);
export const AccountChangeContext = createContext(0);

export const ScreenContext = createContext(0);
export const ScreenStateContext = createContext(0);

export const LoggedinState = createContext(0);
export const GetLoggedInState = createContext(0);

function App() {
  const [accountType, changeType] = useState("student");
  const [loggedin, getLoggedIn] = useState(checkLoginStatus());
  const [screenState, changeScreen] = useState(check());

  function checkLoginStatus() {
    let user = sessionStorage.getItem("user");
    if(user !== null) {
      console.log("true");
      return true;
    }else {
      console.log("false");
      return false;
    }
  }

  console.log(screenState);

  sessionStorage.setItem("server_address", conf["ip"]);

  function switchScreen(val) {
    changeScreen(val);
    sessionStorage.setItem("current_screen", val);
  }

  function check() {
    let val = Number(sessionStorage.getItem("current_screen"));
    console.log(val);

    if(loggedin === false) {
      return 1;
    }else {
      return val;
    }
  }

  return(
    <AccountContext.Provider value={accountType}>
      <AccountChangeContext.Provider value={changeType}>
        <LoggedinState.Provider value={loggedin}>
          <GetLoggedInState.Provider value={getLoggedIn}>
            <ScreenContext.Provider value={screenState}>
              <ScreenStateContext.Provider value={switchScreen}>
                <Manager />
              </ScreenStateContext.Provider>
            </ScreenContext.Provider>
          </GetLoggedInState.Provider>
        </LoggedinState.Provider>
      </AccountChangeContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
