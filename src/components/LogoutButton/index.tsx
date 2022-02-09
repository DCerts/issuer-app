import React from 'react';
import AuthAPI from '../../apis/Auth';
import { JWT_KEY } from '../../common/constants/AuthConstants';
import { homeRoute } from '../../Routes';
import GoBackIcon from '../GoBackIcon';


const LogoutButton = () => {
    const logout = async () => {
        try {
            await AuthAPI.logout();
            localStorage.removeItem(JWT_KEY);
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