import React, { useContext } from 'react';

import { GetLoggedInState, ScreenStateContext } from '../App.js';
import apostrophe from './Adipose.js';

export default function LogOut() {
    const getLoggedIn = useContext(GetLoggedInState);
    const screenState = useContext(ScreenStateContext);

    const handleLogOut = () => {
        sessionStorage.removeItem('user');
        screenState(0)
        getLoggedIn(false);
        // You can also redirect the user to the login page or home page after logout
        // window.location.href = '/login';
    };

    return (
        <button onClick={handleLogOut} className='login-button'>
            Log Out
        </button>
    );
}