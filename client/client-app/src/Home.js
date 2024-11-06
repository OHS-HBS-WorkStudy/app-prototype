import { useState, createContext, useContext } from 'react';

import {ScreenStateContext} from './App.js';
import './App.css';
import Navigator from './modules/Navigator.js';
import ThreadList from './modules/ThreadList.js';

export default function Home() {
    return(
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
                <Navigator />
                <ThreadList />
        </html>
    )
}