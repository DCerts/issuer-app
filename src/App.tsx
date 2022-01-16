import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorComponent';
import Routes from './Routes';
import './App.scss';


const App = () => {
    return (
        <Routes />
    );
};

export default App;