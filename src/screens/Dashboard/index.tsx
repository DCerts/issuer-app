import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account, { Issuer } from '../../apis/Account'


const Dashboard = () => {
    const [account, setAccount] = useState<Issuer>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const issuer = (await Account.get()).data;
                setAccount(issuer);
            } catch {
                navigate('/');
            }
        };

        fetchAccount();
    });

    return (
        <>
            {
                account && (
                    <h1>Hello {account.id}!</h1>
                )
            }
        </>
    );
};

export default Dashboard;