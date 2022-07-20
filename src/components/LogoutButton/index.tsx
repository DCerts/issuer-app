import React from 'react';
import AuthAPI from '../../apis/Auth';
import API from '../../apis/Base';
import { homeRoute } from '../../Routes';
import GoBackIcon from '../GoBackIcon';


const LogoutButton = () => {
    const logout = async () => {
        try {
            await AuthAPI.logout();
            API.clearToken();
        } catch {}
    };

    return (
        <GoBackIcon
            to={homeRoute.path}
            onClick={logout}
            text={'Log out'}
        />
    );
};

export default LogoutButton;