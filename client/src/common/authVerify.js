import React, { useEffect } from 'react';
import { history } from '../helpers/history';

const parseJWT = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
        return null;
    }
}

const AuthVerify = (props) => {
    useEffect(() => history.listen(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const decodeJWT = parseJWT(user.accessToken);
            if (decodeJWT.exp * 1000 < Date.now()) { 
                props.logout();
            }
        }
    }));
    return (
        <div></div>
    )
}

export default AuthVerify;