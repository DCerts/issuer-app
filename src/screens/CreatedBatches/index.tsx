import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BatchAPI from '../../apis/Batch';
import Batch from '../../common/models/Batch';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import LoadingComponent from '../../components/LoadingComponent';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';
import NewsIcon from '../../components/NewsIcon';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import styles from './index.module.scss';


const CreatedBatches = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<Group>();
    const [loaded, setLoaded] = useState(false);
    const [batches, setBatches] = useState<Batch[] | undefined>();

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                if (group) {
                    setBatches((await BatchAPI.getCreatedBatches(group.id)).data);
                }
            } catch {}
        };

        if (loaded) fetchBatches();
    }, [loaded]);

    return (
        <>
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
            <AuthFilter
                setLoaded={setLoaded}
                setGroup={setGroup}
                group={Number.parseInt(`${groupId}`)}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && (
                    <div className={styles.container}>
                        <NewsIcon
                            title={'Create a new batch'}
                            hoverTitle={'Create one now!'}
                            url={`/groups/${groupId}/batches/new`}
                            special={true}
                        />
                        {batches && (batches.length > 0) && batches
                            .map((batch, index) => (
                                <NewsIcon
                                    highlight={batch.issued}
                                    warnable={!batch.issued}
                                    title={batch.regNo}
                                    url={`/batches/${batch.regNo}`}
                                    key={index}
                                />
                            )
                        )}
                        {(!batches || !batches.length) && (
                            <LoadingComponent
                                text={'You have not issued any batches yet.'}
                            />
                        )}
                    </div>
                )
            }
        </>
    );
};

export default CreatedBatches;