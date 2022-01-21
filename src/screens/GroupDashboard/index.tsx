import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupAPI from '../../apis/Group';
import Account, { EMPTY } from '../../common/models/Account';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import GroupInfo from '../../components/GroupInfo';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';


const GroupDashboard = () => {
    const { groupId } = useParams();
    const [account, setAccount] = useState<Account>(EMPTY);
    const [group, setGroup] = useState<Group>();
    const [loaded, setLoaded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate();

    const fetchGroup = async () => {
        try {
            const id = Number.parseInt(groupId || '');
            setGroup((await GroupAPI.getGroup(id)).data);
        } catch {
            navigate(-1);
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
                                    title={'Certificates'}
                                />
                                <MainFeatureIcon
                                    title={'Unknown'}
                                />
                                <MainFeatureIcon
                                    title={'Unknown'}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
            {waiting && (
                <WaitingForTransaction />
            )}
        </>
    );
};

export default GroupDashboard;