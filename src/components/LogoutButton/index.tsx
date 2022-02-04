import React from 'react';
import AuthAPI from '../../apis/Auth';
import { JWT_KEY } from '../../common/constants/AuthConstants';
import { homeRoute } from '../../Routes';
import GoBackButton from '../GoBackIcon';


const LogoutButton = () => {
    const logout = async () => {
        try {
            await AuthAPI.logout();
            localStorage.removeItem(JWT_KEY);
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