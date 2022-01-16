import React, { useEffect, useState } from 'react';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';


interface GroupInfoProps {
    groupId: number
}

const GroupInfo = (props: GroupInfoProps) => {
    const [group, setGroup] = useState<Group>();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setGroup((await GroupAPI.getGroup(props.groupId)).data);
            } catch {}
        };

        fetchGroup();
    }, [props.groupId]);

    return (
        <>
            {
                group && (
                    <>
                        <div>Id: {group.id}</div>
                        <div>Name: {group.name}</div>
                        <div>Threshold: {group.threshold}</div>
                        <div>Members: {group.members.join(', ')}</div>
                    </>
                )
            }
        </>
    );
};

export default GroupInfo;