import React, { useState } from 'react';
import BatchAPI from '../../apis/Batch';
import AuthFilter from '../../components/AuthFilter';
import Batch from '../../common/models/Batch';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import GoBackIcon from '../../components/GoBackIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';


const CreateBatch = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [regNo, setRegNo] = useState<string>('');
    const [waiting, setWaiting] = useState(false);

    const createBatch = async () => {
        try {
            setWaiting(true);
            if (regNo) {
                const group = Number.parseInt(groupId || '');
                const batch: Batch = {
                    regNo: regNo,
                    group: group,
                    certificates: []
                };
                await BatchAPI.createBatch(batch);
                navigate(-1);
            }
        } catch {
            setWaiting(false);
        }
    };

    return (
        <>
            <GoBackIcon text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {
                loaded && (
                    <>
                        <div className={styles.container}>
                            <SimpleInput
                                placeholder={'Reg No.'}
                                onChange={setRegNo}
                            />
                            <div className={styles.submit}>
                                <SubmitButton
                                    title={'Create!'}
                                    confirm={true}
                                    onClick={createBatch}
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

export default CreateBatch;