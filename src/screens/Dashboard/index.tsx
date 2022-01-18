import React, { useEffect, useState } from 'react';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import { Account, Role } from '../../common/models';
import AuthFilter from '../../components/AuthFilter';
import { createGroupRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import LogoutButton from '../../components/LogoutButton';
import styles from './index.module.scss';
import NewsAPI from '../../apis/News';


const Dashboard = () => {
    const [account, setAccount] = useState<Account>({
        id: '',
        role: Role.ISSUER
    });
    const [loaded, setLoaded] = useState(false);
    const [newsCount, setNewsCount] = useState<number>();

    useEffect(() => {
        const getNews = async () => {
            try {
                const news = (await NewsAPI.getNews()).data;
                if (news && news.length) setNewsCount(news.length);
            } catch {}
        };

        if (loaded && account.role === Role.SCHOOL) getNews();
    }, [loaded, account.role]);

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
                                    descriptions={[]}
                                    to={newsfeedRoute.path}
                                    notificationCount={newsCount}
                                />
                            </>
                        )}
                        <MainFeatureIcon
                            title={'Groups'}
                            to={joinedGroupsRoute.path}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                            to={createGroupRoute.path}
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