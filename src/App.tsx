import React, { useState } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorComponent';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';


const App = () => {
    const homeRoutes = {
        path: '/',
        element: <Home />
    };

    const dashboardRoutes = {
        path: '/dashboard',
        element: <Dashboard />
    };

    const routes = useRoutes([homeRoutes, dashboardRoutes]);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorComponent}
        >
            <>{routes}</>
        </ErrorBoundary>
    );
};

export default App;