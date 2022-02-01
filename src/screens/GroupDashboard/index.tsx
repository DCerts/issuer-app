import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupAPI from '../../apis/Group';
import Account, { EMPTY } from '../../common/models/Account';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import GroupInfo from '../../components/GroupInfo';
import LoadingComponent from '../../components/LoadingComponent';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';


const GroupDashboard = () => {
    const { groupId } = useParams();
    const [account, setAccount] = useState<Account>(EMPTY);
    const [group, setGroup] = useState<Group>();
    const [loaded, setLoaded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    const fetchGroup = async () => {
        try {
            const id = Number.parseInt(groupId || '');
            setGroup((await GroupAPI.getGroup(id)).data);
        } catch {
            setNotFound(true);
        }
    };

    useEffect(() => {
        if (loaded) fetchGroup()
    }, [loaded, groupId]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} setAccount={setAccount} />
            {loaded && group && (
                <div className={styles.container}>
                    <GroupInfo
                        role={account.role}
                        group={group}
                        onSuccess={() => navigate(-1)}
                        onFailure={() => setWaiting(false)}
                        onSubmit={() => setWaiting(true)}
                    />
                    <div className={styles.pane}>
                        {group.available && group.members.includes(account.id) && (
                            <>
                                <MainFeatureIcon
                                    title={'Batches'}
                                    to={`/groups/${groupId}/batches`}
                                    icon={'https://cdn-icons-png.flaticon.com/128/4471/4471014.png'}
                                />
                                <MainFeatureIcon
                                    title={'Certificates'}
                                    to={`/groups/${groupId}/certificates`}
                                    icon={'https://cdn-icons-png.flaticon.com/128/4471/4471012.png'}
                                />
                                <MainFeatureIcon
                                    title={'Unknown'}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
            {loaded && notFound && (
                <LoadingComponent
                    text={'This group is not available.'}
                />
            )}
            {waiting && (
                <WaitingForTransaction />
            )}
        </>
    );
};

export default GroupDashboard;