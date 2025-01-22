import Navigator from "./modules/Navigator.js";
import React, { useState, useEffect } from 'react';

import LogOut from "./modules/Logout.js";

export default function AccountPage() {
    let data = JSON.parse(sessionStorage.getItem("user"));

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("dark-mode") === "enabled";
      });
    
      useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };
    

    return(
        <div>
            <Navigator/>
            <div className="nav-space"></div>
            <body>
            <div className="account">
            
            <div className="center">

               

            <button className="dark" onClick={toggleDarkMode}>button</button>
            {/* <h1>{data.first_name} {data.last_name}</h1>
            <h2>{data.type}</h2>  */}

            <LogOut />
                </div>
                </div>
                
            </body>
        </div>
    );
}