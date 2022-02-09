import React from 'react';
import Routes from './Routes';
import './App.scss';


const App = () => {
    return (
        <>
            <div className={'background'}></div>
            <div className={'container'}>
                <Routes />
            </div>
        </>
    );
};

export default App;