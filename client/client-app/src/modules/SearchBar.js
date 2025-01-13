import { useContext, useState, useEffect } from 'react';
import {ScreenContext, ScreenStateContext} from '../App.js';
import '../App.css';

export default function SearchBar() {
    const screen = useContext(ScreenContext);
    const [searchbarValue, setSearchbarValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    console.log(isOpen);
  
    const [search, searchWord] = useState("none");

    document.onkeydown = keydown

    function keydown(e) {
        var keycode;
        if (window.event)
        {
            keycode = window.event.key;
        }
        else if (e)
        {
            keycode = e.which;
        }

        console.log(keycode);

        if(keycode === 'Enter' && isOpen === true) {
            searchButton();
        }
        
    }

    function searchButton() {
        let data = document.getElementById("searchbar").value;

        sessionStorage.setItem("query", data);
        window.location.reload();
    }

    const toggleSearch = () => {
        if (windowWidth > 600) {
            setIsOpen(prevState => !prevState);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (windowWidth <= 600) {
                setIsOpen(true)
            } 
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowWidth]); 

    if(screen === 0 || screen === 3) {
        return (

        <div className={`searchbar ${isOpen ? "open" : ""}`} >
            <div className="box">
                <div className={`search-box ${isOpen ? "open" : ""}`}>
                    {isOpen && (
                        <input 
                        id="searchbar"
                        type="text" 
                        placeholder="Type here..." 
                        value={searchbarValue} 
                        onChange={(e) => setSearchbarValue(e.target.value)} 
                        />
                    )}
                    <label onClick={toggleSearch} className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
        );
    }
}
