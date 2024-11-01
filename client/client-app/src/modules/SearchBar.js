import { useContext } from 'react';
import {ScreenContext, ScreenStateContext} from '../App.js';
import '../App.css';

export default function SearchBar() {
    const screen = useContext(ScreenContext);

    if(screen === 0 || screen === 3) {
        return (
            <>
            <input type="text" placeholder="Search.." name="search"></input>
            </>
        );
    }
}
