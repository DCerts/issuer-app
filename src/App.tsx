import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorComponent';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import CreateGroup from './screens/CreateGroup';


const App = () => {
    const homeRoutes = {
        path: '/',
        element: <Home />
    };

    const dashboardRoutes = {
        path: '/dashboard',
        element: <Dashboard />
    };

    const createGroupRoutes = {
        path: '/group/new',
        element: <CreateGroup />
    };

    const routes = useRoutes([
        homeRoutes,
        dashboardRoutes,
        createGroupRoutes
    ]);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorComponent}
        >
            <>{routes}</>
        </ErrorBoundary>
    );
};

export default App;