import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainFeatureIcon from '../../components/MainFeatureIcon';
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
            <MainFeatureIcon
                icon={'https://cdn-icons-png.flaticon.com/512/3472/3472620.png'}
                title={'Issue Certificate'}
                description={[
                    'Create and manage your own digital assets',
                    'Create and manage your own digital assets',
                    'Create and manage your own digital assets'
                ]}
                to={'/issuer/create'}
            />
            <MainFeatureIcon
                icon={'https://cdn-icons.flaticon.com/png/512/5077/premium/5077581.png?token=exp=1641368069~hmac=931ebb2c704da26cbf0568a10a0e97fe'}
                title={'Add Group'}
                description={[
                    'Create and manage your own digital assets',
                    'Create and manage your own digital assets',
                    'Create and manage your own digital assets'
                ]}
                to={'/issuer/group/create'}
            />
        </>
    );
};

export default Dashboard;