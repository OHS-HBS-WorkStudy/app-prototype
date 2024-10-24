import logo from './logo.svg';
import './App.css';

import { useState, createContext } from 'react';

import Manager from './Manager.js';

export const AccountContext = createContext(0);
export const AccountChangeContext = createContext(0);

export const ScreenContext = createContext(0);
export const ScreenStateContext = createContext(0);

function App() {
  const [accountType, changeType] = useState("none");
  const [screenState, changeScreen] = useState(0);

  function switchScreen(val) {
    changeScreen(val);
    sessionStorage.setItem("current_screen", val);
  }
  

  return(
    <AccountContext.Provider value={accountType}>
      <AccountChangeContext.Provider value={changeType}>
        <ScreenContext.Provider value={screenState}>
          <ScreenStateContext.Provider value={switchScreen}>
            <Manager />
          </ScreenStateContext.Provider>
        </ScreenContext.Provider>
      </AccountChangeContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
