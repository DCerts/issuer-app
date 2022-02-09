import React, { useEffect, useState } from 'react';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import { Account, Role } from '../../common/models';
import AuthFilter from '../../components/AuthFilter';
import { allAccountsRoute, dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import LogoutButton from '../../components/LogoutButton';
import NewsAPI from '../../apis/News';
import { EMPTY } from '../../common/models/Account';
import styles from './index.module.scss';
import { BATCH_CREATED_NEWS, GROUP_CREATED_NEWS } from '../../common/constants/NewsConstants';
import PetsAnimalPack from '../../icons/PetsAnimalPack';
import NavigationBar from '../../components/NavigationBar';


const Dashboard = () => {
    const [account, setAccount] = useState<Account>(EMPTY);
    const [loaded, setLoaded] = useState(false);
    const [newsCount, setNewsCount] = useState<number>();

    useEffect(() => {
        const getNews = async () => {
            try {
                const groupCreatedNews = account.role === Role.SCHOOL
                    ? (await NewsAPI.getNews(GROUP_CREATED_NEWS)).data
                    : [];
                const batchCreatedNews = (await NewsAPI.getNews(BATCH_CREATED_NEWS)).data;
                const news = [...groupCreatedNews, ...batchCreatedNews];
                if (news && news.length) setNewsCount(news.length);
            } catch {}
        };

        if (loaded) getNews();
    }, [loaded]);

    return (
        <>
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
            <AuthFilter setLoaded={setLoaded} setAccount={setAccount} />
            {
                loaded && (
                    <div className={styles.container}>
                        {account.role === Role.SCHOOL && (
                            <>
                                <MainFeatureIcon
                                    title={'Members'}
                                    icon={PetsAnimalPack.getIcon('Zebra')}
                                    to={allAccountsRoute.path}
                                />
                            </>
                        )}
                        <MainFeatureIcon
                            title={'Newsfeed'}
                            icon={PetsAnimalPack.getIcon('Chicken')}
                            descriptions={[]}
                            to={newsfeedRoute.path}
                            notificationCount={newsCount}
                        />
                        <MainFeatureIcon
                            title={'Groups'}
                            icon={PetsAnimalPack.getIcon('Leopard')}
                            to={joinedGroupsRoute.path}
                        />
                    </div>
                )
            }
        </>
    );
};

export default Dashboard;