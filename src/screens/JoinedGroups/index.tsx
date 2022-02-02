import React, { useEffect, useState } from 'react';
import GroupAPI from '../../apis/Group';
import { Account, Role } from '../../common/models';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import NewsIcon from '../../components/NewsIcon';
import PetsAnimalPack from '../../icons/PetsAnimalPack';
import { createGroupRoute } from '../../Routes';
import styles from './index.module.scss';


const JoinedGroups = () => {
    const [loaded, setLoaded] = useState(false);
    const [account, setAccount] = useState<Account>();
    const [groups, setGroups] = useState<Group[] | undefined>();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setGroups((await GroupAPI.getJoinedGroups()).data);
            } catch {}
        };

        if (loaded) fetchGroups();
    }, [loaded]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} setAccount={setAccount} />
            {
                loaded && groups && (
                    <div className={styles.container}>
                        {account && account.role === Role.SCHOOL && (
                            <NewsIcon
                                title={'You need a new group, don\'t you?'}
                                hoverTitle={'Create one now!'}
                                url={createGroupRoute.path}
                            />
                        )}
                        <div className={styles.pane}>
                            {(groups.length > 0) && groups.map((group, index) => (
                                <MainFeatureIcon
                                    id={group.id}
                                    title={group.name}
                                    to={`/groups/${group.id}`}
                                    key={index}
                                    icon={PetsAnimalPack.getRandomIcon()}
                                />
                            ))}
                            {!groups.length && (
                                <LoadingComponent
                                    text={'You have not joined any groups yet.'}
                                />
                            )}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default JoinedGroups;