import { useState, createContext, useContext } from 'react';

import {ScreenStateContext} from './App.js';
import './App.css';
import Navigator from './modules/Navigator.js';
import ThreadList from './modules/ThreadList.js';

export default function Home() {
    return(
        <html className="scroll">
        <div className="Home">
            <Navigator />
            <div>
            <ThreadList />
            </div>
        </div>
        </html>
    )
}