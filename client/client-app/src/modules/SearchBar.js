import { useState, useContext } from 'react';
import {ScreenContext, ScreenStateContext} from '../App.js';
import '../App.css';

export default function SearchBar() {
    const screen = useContext(ScreenContext);

    const [search, searchWord] = useState("none");

    function searchButton() {
        let data = document.getElementById("searchbar").value;

        sessionStorage.setItem("search_tag", data);
        searchWord(data);
        window.location.reload();
    }

    if(screen === 0 || screen === 3) {
        return (
            <>
            <input type="text" placeholder="Search.." name="search" id="searchbar"></input>
            <button onClick={searchButton}>search</button>
            </>
        );
    }
}
