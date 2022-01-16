import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import dotenv from 'dotenv';


declare global {
    interface Window {
        ethereum: any;
        contract: any;
    }
}


dotenv.config();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);