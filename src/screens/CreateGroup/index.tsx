import React, { useState } from 'react';
import GroupAPI from '../../apis/Group';
import AuthFilter from '../../components/AuthFilter';
import Group from '../../common/models/Group';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import WalletAPI from '../../web3/WalletAPI';
import { Role } from '../../common/models';
import GoBackIcon from '../../components/GoBackIcon';
import { dashboardRoute } from '../../Routes';
import styles from './index.module.scss';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate } from 'react-router-dom';


const CreateGroup = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [groupId, setGroupId] = useState<number>(0);
    const [groupName, setGroupName] = useState<string>('');
    const [groupThreshold, setGroupThreshold] = useState<number>(0);
    const [groupMembers, setGroupMembers] = useState<string[]>([]);
    const [waiting, setWaiting] = useState(false);

    const createGroup = async () => {
        try {
            setWaiting(true);
            if (groupId) {
                const group: Group = {
                    id: groupId,
                    name: groupName,
                    threshold: groupThreshold,
                    members: groupMembers
                };
                await WalletAPI.createGroup(
                    group.id,
                    group.name,
                    group.members,
                    group.threshold
                );
                await GroupAPI.createGroup(group);
                navigate(-1);
            }
        } catch {
            setWaiting(false);
        }
    };

    return (
        <>
            <GoBackIcon text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                role={Role.SCHOOL}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && (
                    <>
                        <div className={styles.container}>
                            <SimpleInput
                                placeholder={'Id'}
                                onChange={(text) => {
                                    setGroupId(Number.parseInt(text));
                                }}
                            />
                            <SimpleInput
                                placeholder={'Name'}
                                onChange={setGroupName}
                            />
                            <SimpleInput
                                placeholder={'Threshold'}
                                onChange={(text) => {
                                    setGroupThreshold(Number.parseInt(text));
                                }}
                            />
                            <SimpleInput
                                placeholder={'Members'}
                                onChange={(text) => {
                                    setGroupMembers(text.split(','));
                                }}
                            />
                            <div className={styles.submit}>
                                <SubmitButton
                                    title={'Create!'}
                                    confirm={true}
                                    onClick={createGroup}
                                />
                            </div>
                        </div>
                        {waiting && (
                            <WaitingForTransaction />
                        )}
                    </>
                )
            }
        </>
    );
};

export default CreateGroup;