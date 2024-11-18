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
        changeScreen(0);
    }

    return (
        <div>
            <nav>
                <h1 id="title" className="title1" onClick={HomePage}>
                    Anonymous Academy
                </h1>

                <div className={`searchbar ${isSearchBar ? "" : "navbar"}`}>
                        {!isSearchBar && <SearchBar />}
                </div>

                <input type="checkbox" id="sidebar-active" />
                <label htmlFor="sidebar-active" className="open-sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                </label>

                <label id="overlay" htmlFor="sidebar-active"> </label>
                <div className="link-container">
                    <label htmlFor="sidebar-active" className="close-sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </label>

                    <div id="a">
                    <div className={`searchbar ${isSearchBar ? "navlist" : ""}`}>
                        {isSearchBar && <SearchBar />}
                    </div>
                        <p className="nav-btn" onClick={SignUp}>Sign-Up</p>
                        <p className="nav-btn" onClick={Login}>Log-in</p>
                        <p className="nav-btn" onClick={NewThread}>Ask a Question!</p>
                        <p className="nav-btn" onClick={AccountPage}>Account</p>
                    </div>
                </div>
            </nav>
        </div>
    );
}
