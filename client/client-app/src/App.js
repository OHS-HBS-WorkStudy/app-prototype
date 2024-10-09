import logo from './logo.svg';
import './App.css';

import { useState, createContext } from 'react';

import SignUp from './SignUp.js';

export const AccountContext = createContext(0);
export const AccountChangeContext = createContext(0);

function App() {
  const [accountType, changeType] = useState("none");


  return(
    <AccountContext.Provider value={accountType}>
      <AccountChangeContext.Provider value={changeType}>
        <SignUp />
      </AccountChangeContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
