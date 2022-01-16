import React, { useEffect, useState } from 'react';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import GroupInfo from '../../components/GroupInfo';
import { dashboardRoute } from '../../Routes';


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
            <GoBackButton to={dashboardRoute.path} text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {
                loaded && (
                    <>
                        {groups.map((group, index) => (
                            <div key={index}>
                                <GroupInfo groupId={group.id} />
                            </div>
                        ))}
                    </>
                )
            }
        </>
    );
};

export default JoinedGroups;