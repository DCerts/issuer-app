import React from 'react';
import { useRoutes } from 'react-router-dom';
import CreateGroup from './screens/CreateGroup';
import Dashboard from './screens/Dashboard';
import Home from './screens/Home';
import JoinedGroups from './screens/JoinedGroups';
import Newsfeed from './screens/Newsfeed';


export const homeRoute = {
    path: '/',
    element: <Home />
};

export const dashboardRoute = {
    path: '/dashboard',
    element: <Dashboard />
};

export const createGroupRoute = {
    path: '/group/new',
    element: <CreateGroup />
};

export const joinedGroupsRoute = {
    path: '/groups',
    element: <JoinedGroups />
};

export const newsfeedRoute = {
    path: '/newsfeed',
    element: <Newsfeed />
};

const Routes = () => {
    const routes = useRoutes([
        homeRoute,
        dashboardRoute,
        createGroupRoute,
        joinedGroupsRoute,
        newsfeedRoute
    ]);

    return (
        <>{routes}</>
    );
};

export default Routes;