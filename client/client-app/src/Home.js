import { useState, createContext, useContext } from 'react';

import {ScreenStateContext} from './App.js';
import './App.css';
import Navigator from './modules/Navigator.js';
import ThreadList from './modules/ThreadList.js';

export default function Home() {
    return(
        <html>
             <Navigator />
        <div className="Home">
        <body>
            <ThreadList />
            </body>
        </div>
        </html>
    )
}