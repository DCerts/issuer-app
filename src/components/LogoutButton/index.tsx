import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../apis/Auth';
import { homeRoute } from '../../Routes';
import styles from './index.module.scss';


const LogoutButton = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await AuthAPI.logout();
        } catch {} finally {
            navigate(homeRoute.path);
        }
    };

    return (
        <>
            <button className={styles.button} onClick={logout}>
                {'Log out'}
            </button>
        </>
    );
};

export default LogoutButton;