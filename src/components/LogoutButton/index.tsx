import React from 'react';
import AuthAPI from '../../apis/Auth';
import { homeRoute } from '../../Routes';
import GoBackButton from '../GoBackIcon';


const LogoutButton = () => {
    const logout = async () => {
        try {
            await AuthAPI.logout();
        } catch {}
    };

    return (
        <GoBackButton
            to={homeRoute.path}
            onClick={logout}
            text={'Log out'}
        />
    );
};

export default LogoutButton;