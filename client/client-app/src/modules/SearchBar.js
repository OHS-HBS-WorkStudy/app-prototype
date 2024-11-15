import { useContext, useState } from 'react';
import {ScreenContext, ScreenStateContext} from '../App.js';
import '../App.css';

export default function SearchBar() {
    const screen = useContext(ScreenContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => {
        setIsOpen(prevState => !prevState);
    };

    const [SearchBar, setSearchBar] = useState("search-container");
    const [SearchBar1, setSearchBar1] = useState('');



    window.addEventListener("resize", function(){
        var w = window.innerWidth;

    

        if (w <= 600) {
            setSearchBar("link-container");
            setSearchBar1("a");
        }else {
            setSearchBar("search-container");
            setSearchBar1('');
        }
      });






    if(screen === 0 || screen === 3) {
        return (
            <div className={SearchBar}>

        <div className={`searchbar ${isOpen ? "open" : ""}`}  id={SearchBar1}>
            <div className="box">
                <div className={`search-box ${isOpen ? "open" : ""}`}>
                    {isOpen && (
                        <input type="text" placeholder="Type here..." />
                    )}
                    <label onClick={toggleSearch} className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
        </div>
        );
    }
}
