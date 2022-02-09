import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import styles from './index.module.scss';


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
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