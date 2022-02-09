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
import NotFound from './screens/NotFound';
import Test from './screens/Test';


export const homeRoute = {
    text: 'Home',
    path: '/',
    element: <Home />
};

export const dashboardRoute = {
    text: 'Home',
    path: '/dashboard',
    element: <Dashboard />
};

export const createGroupRoute = {
    text: 'New Group',
    path: '/groups/new',
    element: <CreateGroup />
};

export const createAccountRoute = {
    text: 'New Member',
    path: '/accounts/new',
    element: <CreateAccount />
};

export const joinedGroupsRoute = {
    text: 'Groups',
    path: '/groups',
    element: <JoinedGroups />
};

export const allAccountsRoute = {
    text: 'Members',
    path: '/accounts',
    element: <AllAccounts />
};

export const createdBatchesRoute = {
    text: 'Batches',
    path: '/groups/:groupId/batches',
    element: <CreatedBatches />
};

export const createdCertificatesRoute = {
    text: 'Certificates',
    path: '/groups/:groupId/certificates',
    element: <CreatedCertificates />
};

export const groupDashboardRoute = {
    text: 'Group Info.',
    path: '/groups/:groupId',
    element: <GroupDashboard />
};

export const createBatchRoute = {
    text: 'New Batch',
    path: '/groups/:groupId/batches/new',
    element: <CreateBatch />
};

export const createCertificateRoute = {
    text: 'New Certificate',
    path: '/groups/:groupId/certificates/new',
    element: <CreateCertificate />
};

export const accountDashboardRoute = {
    text: 'Member Info.',
    path: '/accounts/:accountId',
    element: <AccountDashboard />
};

export const certificateDashboardRoute = {
    text: 'Certificate Info.',
    path: '/certificates/:regNo',
    element: <CertificateDashboard />
};

export const batchDashboardRoute = {
    text: 'Batch Info.',
    path: '/batches/:regNo',
    element: <BatchDashboard />
};

export const newsfeedRoute = {
    text: 'News',
    path: '/newsfeed',
    element: <Newsfeed />
};

export const testRoute = {
    text: 'Test',
    path: '/test',
    element: <Test />
};

export const notFoundRoute = {
    text: 'Not Found',
    path: '*',
    element: <NotFound />
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
        batchDashboardRoute,
        notFoundRoute // let it be the last route
    ]);

    return (
        <>{routes}</>
    );
};

export default Routes;