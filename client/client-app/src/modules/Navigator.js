import { useContext } from 'react';
import {ScreenContext, ScreenStateContext} from '../App.js';
import SearchBar from './SearchBar.js';
import '../App.css';

export default function Navigator() {
    const bare = useContext(ScreenContext);
    const changeScreen = useContext(ScreenStateContext);

    function SignUp() {
        changeScreen(1);
    }

    function Login() {
        changeScreen(2);
    }

    function NewThread() {
        changeScreen(4);
    }

    function HomePage() {
        changeScreen(0);
    }

    return (
        <div>
            <nav>
                <h1 id="title" onClick={HomePage}>Anonymous Academy</h1>
                        <input type="checkbox" id="sidebar-active" />
                            <label for="sidebar-active" className="open-sidebar">
                                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                            </label> 

                        <label id="overlay" for="sidebar-active"> </label>
                        <div class="link-container"> 
                            <label for="sidebar-active" className="close-sidebar">
                                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                            </label>
                    <SearchBar />
                <div className="a">
                        <p className="nav-btn" onClick={SignUp}>Sign-Up</p>
                        <p className="nav-btn" onClick={Login}>Log-in</p>
                        <p className="nav-btn" onClick={NewThread}>Ask a Question!</p>
                    </div>
                </div>
            </nav>
        </div>
    );
}