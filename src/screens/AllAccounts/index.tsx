import React, { useEffect, useState } from 'react';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import AuthFilter from '../../components/AuthFilter';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';
import NewsIcon from '../../components/NewsIcon';
import { createAccountRoute, dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
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
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
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
                                special={true}
                            />
                        )}
                        {(accounts.length > 0) && accounts.map((acc, index) => (
                            <NewsIcon
                                title={acc.id}
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