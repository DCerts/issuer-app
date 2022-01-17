import React, { useEffect, useState } from 'react';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import styles from './index.module.scss';


const JoinedGroups = () => {
    const [loaded, setLoaded] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setGroups((await GroupAPI.getJoinedGroups()).data);
            } catch {}
        };

        fetchGroups();
    }, []);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {
                loaded && (
                    <div className={styles.container}>
                        {(groups.length > 0) && groups.map((group, index) => (
                            <MainFeatureIcon
                                id={group.id}
                                title={group.name}
                                to={`/groups/${group.id}`}
                                key={index}
                            />
                        ))}
                        {!groups.length && (
                            <LoadingComponent
                                text={'You have not joined any groups yet.'}
                            />
                        )}
                    </div>
                )
            }
        </>
    );
};

export default JoinedGroups;