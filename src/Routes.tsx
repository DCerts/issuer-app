import React from 'react';
import { useRoutes } from 'react-router-dom';
import AccountDashboard from './screens/AccountDashboard';
import AllAccounts from './screens/AllAccounts';
import BatchDashboard from './screens/BatchDashboard';
import CertificateDashboard from './screens/CertificateDashboard';
import CreateAccount from './screens/CreateAccount';
import CreateBatch from './screens/CreateBatch';
import CreateCertificate from './screens/CreateCertificate';
import CreatedBatches from './screens/CreatedBatches';
import CreatedCertificates from './screens/CreatedCertificates';
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

export const createdBatchesRoute = {
    path: '/groups/:groupId/batches',
    element: <CreatedBatches />
};

export const createdCertificatesRoute = {
    path: '/groups/:groupId/certificates',
    element: <CreatedCertificates />
};

export const groupDashboardRoute = {
    path: '/groups/:groupId',
    element: <GroupDashboard />
};

export const createBatchRoute = {
    path: '/groups/:groupId/batches/new',
    element: <CreateBatch />
};

export const createCertificateRoute = {
    path: '/groups/:groupId/certificates/new',
    element: <CreateCertificate />
};

export const accountDashboardRoute = {
    path: '/accounts/:accountId',
    element: <AccountDashboard />
};

export const certificateDashboardRoute = {
    path: '/groups/:groupId/certificates/:regNo',
    element: <CertificateDashboard />
};

export const batchDashboardRoute = {
    path: '/groups/:groupId/batches/:regNo',
    element: <BatchDashboard />
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
        createBatchRoute,
        createCertificateRoute,
        joinedGroupsRoute,
        allAccountsRoute,
        createdBatchesRoute,
        createdCertificatesRoute,
        newsfeedRoute,
        groupDashboardRoute,
        accountDashboardRoute,
        certificateDashboardRoute,
        batchDashboardRoute
    ]);

    return (
        <>{routes}</>
    );
};

export default Routes;