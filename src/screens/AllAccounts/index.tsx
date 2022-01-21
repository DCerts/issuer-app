import React, { useEffect, useState } from 'react';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import NewsIcon from '../../components/NewsIcon';
import { createAccountRoute, dashboardRoute } from '../../Routes';
import styles from './index.module.scss';


const AllAccounts = () => {
    const [loaded, setLoaded] = useState(false);
    const [account, setAccount] = useState<Account>();
    const [accounts, setAccounts] = useState<Account[] | undefined>();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setAccounts((await AccountAPI.getAll()).data);
            } catch {}
        };

        if (loaded) fetchAccounts();
    }, [loaded]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                setAccount={setAccount}
                role={Role.SCHOOL}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && accounts && (
                    <div className={styles.container}>
                        {account && account.role === Role.SCHOOL && (
                            <NewsIcon
                                title={'Create a new account'}
                                hoverTitle={'Create one now!'}
                                url={createAccountRoute.path}
                                highlight={true}
                            />
                        )}
                        {(accounts.length > 0) && accounts.map((acc, index) => (
                            <NewsIcon
                                title={acc.id}
                                hoverTitle={acc.name || ''}
                                url={`/accounts/${acc.id}`}
                                key={index}
                            />
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default AllAccounts;