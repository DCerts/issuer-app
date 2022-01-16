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
                                    icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                                    title={'Create Group'}
                                    descriptions={[]}
                                    to={createGroupRoute.path}
                                />
                                <MainFeatureIcon
                                    icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                                    title={'Newsfeed'}
                                    descriptions={[]}
                                    to={newsfeedRoute.path}
                                    notificationCount={6}
                                />
                            </>
                        )}
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Groups'}
                            descriptions={[]}
                            to={joinedGroupsRoute.path}
                        />
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[]}
                            to={'/unknown'}
                        />
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[]}
                            to={'/unknown'}
                        />
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[]}
                            to={'/unknown'}
                        />
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[]}
                            to={'/unknown'}
                        />
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[]}
                            to={'/unknown'}
                        />
                    </div>
                )
            }
        </>
    );
};

export default Dashboard;