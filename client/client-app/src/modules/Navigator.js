import { useContext, useState, useEffect } from 'react';
import { ScreenStateContext } from '../App.js';
import SearchBar from './SearchBar.js';
import '../App.css';

export default function Navigator() {
    const changeScreen = useContext(ScreenStateContext);

    const [isSearchBar, setSearchBar] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            const screenCheck = window.innerWidth <= 600;
            if (screenCheck !== isSearchBar) {
                setSearchBar(screenCheck);  
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isSearchBar]);  

    function SignUp() {
        changeScreen(1);
    }

    function Login() {
        changeScreen(2);
    }

    function NewThread() {
        changeScreen(4);
    }

    function AccountPage() {
        changeScreen(5);
    }

    function HomePage() {
        sessionStorage.removeItem("search_tag");
        changeScreen(0);
        window.location.reload();
    }

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('dark-mode') === 'enabled';
      });

      useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
        localStorage.setItem('dark-mode', darkMode ? 'enabled' : 'disabled');
      }, [darkMode]);
    

      const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };

      const [isHovered, setIsHovered] = useState(false);

      const handleMouseEnter = () => setIsHovered(true); 
      const handleMouseLeave = () => setIsHovered(false); 

    return (
        <div>
            <div className="top-nav">
                <h1 className="title">
            <div id="hov" onClick={HomePage} isHovered={isHovered}>Anonymous Academy</div>
            </h1>
            <SearchBar />
            </div>
        <div        
        className={`navigator ${isHovered ? 'menu-open' : ''}`} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <nav className="sidebar">
  

          {/* <button onClick={toggleDarkMode}>Butttttton</button>*/}


                    <div className="menu-items">
                            <button id="nav-btn" onClick={HomePage}>
                            <i><svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368">
                                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                                </svg></i>

                                {isHovered && (<h1>Home</h1>)}
                            </button>

                            <button id="nav-btn" onClick={SignUp}>
                                <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg></i>

                                {isHovered && (<h1>Sign-Up</h1>)}
                            </button>

                            <button id="nav-btn" onClick={Login}>
                                <i><svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368">
                                    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
                                </svg></i>
                                
                                {isHovered && (<h1>Login-In</h1>)}
                              </button>

                            <button id="nav-btn" onClick={NewThread}>
                                
                                <i><svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368">
                                  <path d="M160-120v-170l527-526q12-12 27-18t30-6q16 0 30.5 6t25.5 18l56 56q12 11 18 25.5t6 30.5q0 15-6 30t-18 27L330-120H160Zm80-80h56l393-392-28-29-29-28-392 393v56Zm560-503-57-57 57 57Zm-139 82-29-28 57 57-28-29ZM560-120q74 0 137-37t63-103q0-36-19-62t-51-45l-59 59q23 10 36 22t13 26q0 23-36.5 41.5T560-200q-17 0-28.5 11.5T520-160q0 17 11.5 28.5T560-120ZM183-426l60-60q-20-8-31.5-16.5T200-520q0-12 18-24t76-37q88-38 117-69t29-70q0-55-44-87.5T280-840q-45 0-80.5 16T145-785q-11 13-9 29t15 26q13 11 29 9t27-13q14-14 31-20t42-6q41 0 60.5 12t19.5 28q0 14-17.5 25.5T262-654q-80 35-111 63.5T120-520q0 32 17 54.5t46 39.5Z"/>
                                </svg></i>
                                
                                {isHovered && (<h1>Ask a Question!</h1>)}
                              </button>

                            <button id="nav-btn" onClick={AccountPage}>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368">
                                  <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                                </svg>
                                
                                {isHovered && (<h1>Account</h1>)}
                              </button>

                    </div>
      </nav>
    </div>
    </div>
    );
}
