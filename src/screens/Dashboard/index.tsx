import React, { useState } from 'react';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import { Account, Role } from '../../common/models';
import AuthFilter from '../../components/AuthFilter';
import { createGroupRoute, homeRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import LogoutButton from '../../components/LogoutButton';
import styles from './index.module.scss';


const Dashboard = () => {
    const [account, setAccount] = useState<Account>({
        id: '',
        role: Role.ISSUER
    });
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <LogoutButton />
            <AuthFilter setLoaded={setLoaded} setAccount={setAccount} />
            {
                loaded && (
                    <div className={styles.container}>
                        {account.role === Role.SCHOOL && (
                            <>
                                <MainFeatureIcon
                                    title={'Newsfeed'}
                                    descriptions={[
                                        'You have some notifications!',
                                        'You have some notifications!'
                                    ]}
                                    to={newsfeedRoute.path}
                                    notificationCount={6}
                                />
                                <MainFeatureIcon
                                    title={'Create Group'}
                                    to={createGroupRoute.path}
                                />
                            </>
                        )}
                        <MainFeatureIcon
                            title={'Groups'}
                            to={joinedGroupsRoute.path}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                        />
                    </div>
                )
            }
        </>
    );
};

export default Dashboard;