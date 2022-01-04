import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorComponent';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import Account, { Issuer } from './apis/Account';


const App = () => {
    const [account, setAccount] = useState<Issuer>();
    const [authenticated, setAuthenticated] = useState(false);

    const fetchAccount = async () => {
        try {
            const issuer = (await Account.get()).data;
            setAccount(issuer);
            setAuthenticated(true);
        } catch {}
    };

    if (!account) fetchAccount();

    return (
        <ErrorBoundary FallbackComponent={ErrorComponent}>
            {
                !authenticated && (
                    <Home setAuthenticated={setAuthenticated} />
                )
            }
            {
                authenticated && (
                    <Dashboard account={account} />
                )
            }
        </ErrorBoundary>
    );
};

export default App;