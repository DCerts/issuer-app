import React from 'react';
import { useRoutes } from 'react-router-dom';
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

    return (<>{routes}</>);
};

export default App;