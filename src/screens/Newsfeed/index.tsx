import React, { useEffect, useState } from 'react';
import NewsAPI from '../../apis/News';
import { DatumType, NewsDatum } from '../../common/models/News';
import { BATCH_CREATED_NEWS, GROUP_CREATED_NEWS } from '../../common/constants/NewsConstants';
import AuthFilter from '../../components/AuthFilter';
import LoadingComponent from '../../components/LoadingComponent';
import NewsIcon from '../../components/NewsIcon';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import { Account, Role } from '../../common/models';
import { EMPTY } from '../../common/models/Account';
import styles from './index.module.scss';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';


const Newsfeed = () => {
    const [account, setAccount] = useState<Account>(EMPTY);
    const [loaded, setLoaded] = useState(false);
    const [news, setNews] = useState<NewsDatum<DatumType>[] | undefined>();

    useEffect(() => {
        const getNews = async () => {
            try {
                const groupCreatedNews = account.role === Role.SCHOOL
                    ? (await NewsAPI.getNews(GROUP_CREATED_NEWS)).data
                    : [];
                const batchCreatedNews = (await NewsAPI.getNews(BATCH_CREATED_NEWS)).data;
                setNews([...groupCreatedNews, ...batchCreatedNews]);
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
            <AuthFilter
                setLoaded={setLoaded}
                setAccount={setAccount}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && news && (
                    <div className={styles.container}>
                        {(news.length > 0) && news.map((value, index) => (
                            <NewsIcon
                                type={value.type}
                                datum={value.datum}
                                key={index}
                            />
                        ))}
                        {news.length == 0 && (
                            <LoadingComponent
                                text={'You are up to date.'}
                            />
                        )}
                    </div>
                )
            }
        </>
    );
};

export default Newsfeed;