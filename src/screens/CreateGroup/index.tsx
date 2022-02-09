import React, { useContext, useState } from 'react';
import AuthFilter from '../../components/AuthFilter';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import Web3Group from '../../web3/Web3Group';
import { Role } from '../../common/models';
import GoBackIcon from '../../components/GoBackIcon';
import { dashboardRoute } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './index.module.scss';
import { NotificationContext } from '../../App';
import { ERROR, SUCCESS } from '../../common/constants/NotificationConstants';


const CreateGroup = () => {
    const pushNotification = useContext(NotificationContext);
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [groupName, setGroupName] = useState<string>('');
    const [groupThreshold, setGroupThreshold] = useState<number>(0);
    const [groupMembers, setGroupMembers] = useState<string[]>([]);
    const [waiting, setWaiting] = useState(false);

    const createGroup = async () => {
        try {
            setWaiting(true);
            await Web3Group.createGroup(
                groupName,
                groupMembers,
                groupThreshold
            );
            pushNotification({
                title: 'Successful',
                message: `Group ${groupName} has been created.`,
                type: SUCCESS
            });
            navigate(-1);
        } catch {
            pushNotification({
                title: 'Unsuccessful',
                message: 'Something went wrong!',
                type: ERROR
            });
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
            {loaded && !waiting && (
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
                                onClick={createGroup}
                            />
                        </div>
                    </div>
                </>
            )}
            {waiting && (
                <LoadingComponent
                    text={'Group is being created...'}
                />
            )}
        </>
    );
};

export default CreateGroup;