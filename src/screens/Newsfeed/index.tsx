import React, { useEffect, useState } from 'react';
import NewsAPI from '../../apis/News';
import { DatumType, NewsDatum } from '../../common/models/News';
import Role from '../../common/models/Role';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import NewsIcon from '../../components/NewsIcon';
import { dashboardRoute } from '../../Routes';
import styles from './index.module.scss';


const Newsfeed = () => {
    const [loaded, setLoaded] = useState(false);
    const [news, setNews] = useState<NewsDatum<DatumType>[] | undefined>();

    useEffect(() => {
        const getNews = async () => {
            try {
                setNews((await NewsAPI.getNews()).data);
            } catch {}
        };

        if (loaded) getNews();
    }, [loaded]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                role={Role.SCHOOL}
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
                        {!news.length && (
                            <LoadingComponent
                                text={'Nothing to check. You are free to go!'}
                            />
                        )}
                    </div>
                )
            }
        </>
    );
};

export default Newsfeed;