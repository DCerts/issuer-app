import React, { useState } from 'react';
import GroupAPI from '../../apis/Group';
import AuthFilter from '../../components/AuthFilter';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import WalletAPI from '../../web3/WalletAPI';
import { Role } from '../../common/models';
import GoBackIcon from '../../components/GoBackIcon';
import { dashboardRoute } from '../../Routes';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import axios from 'axios';


const CreateGroup = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [groupName, setGroupName] = useState<string>('');
    const [groupThreshold, setGroupThreshold] = useState<number>(0);
    const [groupMembers, setGroupMembers] = useState<string[]>([]);
    const [waiting, setWaiting] = useState(false);

    const createGroup = async () => {
        try {
            setWaiting(true);
            WalletAPI.createGroup(
                groupName,
                groupMembers,
                groupThreshold
            );
            navigate(-1);
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