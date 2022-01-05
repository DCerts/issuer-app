import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account, { Issuer } from '../../apis/Account'


const Dashboard = () => {
    const [account, setAccount] = useState<Issuer>();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const issuer = (await Account.get()).data;
                setAccount(issuer);
                setLoaded(true);
            } catch {
                navigate('/');
            }
        };

        fetchAccount();
    }, [loaded]);

    return (
        <>
            {
                loaded && account && (
                    <h1>Hello {account.name}!</h1>
                )
            }
        </>
    );
};

export default Dashboard;