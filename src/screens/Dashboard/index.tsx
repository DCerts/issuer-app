import React, { useEffect, useState } from 'react';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import { Account, Role } from '../../common/models';
import AuthFilter from '../../components/AuthFilter';
import { joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import LogoutButton from '../../components/LogoutButton';
import styles from './index.module.scss';
import NewsAPI from '../../apis/News';
import { EMPTY } from '../../common/models/Account';


const Dashboard = () => {
    const [account, setAccount] = useState<Account>(EMPTY);
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
                                    icon={'https://cdn-icons-png.flaticon.com/128/4470/4470996.png'}
                                    descriptions={[]}
                                    to={newsfeedRoute.path}
                                    notificationCount={newsCount}
                                />
                            </>
                        )}
                        <MainFeatureIcon
                            title={'Groups'}
                            icon={'https://cdn-icons-png.flaticon.com/128/4471/4471005.png'}
                            to={joinedGroupsRoute.path}
                        />
                        <MainFeatureIcon
                            title={'Unknown'}
                            icon={'https://cdn-icons-png.flaticon.com/128/4471/4471010.png'}
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