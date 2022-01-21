import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountAPI from '../../apis/Account';
import Account from '../../common/models/Account';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import AccountInfo from '../../components/AccountInfo';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';
import LoadingComponent from '../../components/LoadingComponent';


const AccountDashboard = () => {
    const { accountId } = useParams();
    const [account, setAccount] = useState<Account>();
    const [loaded, setLoaded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    const fetchAccount = async () => {
        try {
            setAccount((await AccountAPI.getById(accountId || '')).data);
        } catch {
            setNotFound(true);
        }
    };

    useEffect(() => {
        if (loaded) fetchAccount()
    }, [loaded, accountId]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {loaded && account && (
                <div className={styles.container}>
                    <AccountInfo
                        account={account}
                        onSuccess={() => navigate(-1)}
                        onFailure={() => setWaiting(false)}
                        onSubmit={() => setWaiting(true)}
                    />
                    <div className={styles.pane}></div>
                </div>
            )}
            {loaded && notFound && (
                <LoadingComponent
                    text={'This member is not available.'}
                />
            )}
            {waiting && (
                <WaitingForTransaction />
            )}
        </>
    );
};

export default AccountDashboard;