import React from 'react';

import {GetLoggedInUser} from '../App.js';

export default function LogOut() {
    const handleLogOut = () => {
        sessionStorage.removeItem('user');
        // You can also redirect the user to the login page or home page after logout
        // window.location.href = '/login';
    };

    return (
        <button onClick={handleLogOut}>
            Log Out
        </button>
    );
}