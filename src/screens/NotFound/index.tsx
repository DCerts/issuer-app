import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import { dashboardRoute } from '../../Routes';
import styles from './index.module.scss';


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <GoBackButton text={'Back'} />
            <LoadingComponent
                text={'Whoops! This page is not available.'}
                cancelText={'Go Home!'}
                onCancel={() => {
                    navigate(dashboardRoute.path);
                }}
            />
        </>
    );
};

export default NotFound;