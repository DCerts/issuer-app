import React from 'react';
import { useRoutes } from 'react-router-dom';
import AccountDashboard from './screens/AccountDashboard';
import AllAccounts from './screens/AllAccounts';
import CreateAccount from './screens/CreateAccount';
import CreateGroup from './screens/CreateGroup';
import Dashboard from './screens/Dashboard';
import GroupDashboard from './screens/GroupDashboard';
import Home from './screens/Home';
import JoinedGroups from './screens/JoinedGroups';
import Newsfeed from './screens/Newsfeed';
import Test from './screens/Test';


export const homeRoute = {
    path: '/',
    element: <Home />
};

export const dashboardRoute = {
    path: '/dashboard',
    element: <Dashboard />
};

export const createGroupRoute = {
    path: '/groups/new',
    element: <CreateGroup />
};

export const createAccountRoute = {
    path: '/accounts/new',
    element: <CreateAccount />
};

export const joinedGroupsRoute = {
    path: '/groups',
    element: <JoinedGroups />
};

export const allAccountsRoute = {
    path: '/accounts',
    element: <AllAccounts />
};

export const groupDashboardRoute = {
    path: '/groups/:groupId',
    element: <GroupDashboard />
};

export const accountDashboardRoute = {
    path: '/accounts/:accountId',
    element: <AccountDashboard />
};

export const newsfeedRoute = {
    path: '/newsfeed',
    element: <Newsfeed />
};

export const testRoute = {
    path: '/test',
    element: <Test />
};

const Routes = () => {
    const routes = useRoutes([
        testRoute,
        homeRoute,
        dashboardRoute,
        createGroupRoute,
        createAccountRoute,
        joinedGroupsRoute,
        allAccountsRoute,
        newsfeedRoute,
        groupDashboardRoute,
        accountDashboardRoute
    ]);

    return (
        <>{routes}</>
    );
};

export default Routes;