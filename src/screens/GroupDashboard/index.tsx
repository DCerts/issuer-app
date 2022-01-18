import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import GroupInfo from '../../components/GroupInfo';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';


const GroupDashboard = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<Group>();
    const [loaded, setLoaded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate();

    const fetchGroup = async () => {
        try {
            const id = Number.parseInt(groupId || '');
            setGroup((await GroupAPI.getGroup(id)).data);
        } catch {}
    };

    useEffect(() => {
        if (loaded) fetchGroup();
    }, [loaded, groupId]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {loaded && group && (
                <div className={styles.container}>
                    <GroupInfo
                        group={group}
                        onSuccess={() => navigate(-1)}
                        onFailure={() => setWaiting(false)}
                        onSubmit={() => setWaiting(true)}
                    />
                    <>
                        {group.available && (
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
                    </>
                </div>
            )}
            {waiting && (
                <WaitingForTransaction />
            )}
        </>
    );
};

export default GroupDashboard;