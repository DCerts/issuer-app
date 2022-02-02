import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BatchAPI from '../../apis/Batch';
import Account, { EMPTY } from '../../common/models/Account';
import Batch from '../../common/models/Batch';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';


const BatchDashboard = () => {
    const { groupId, regNo } = useParams();
    const [batch, setBatch] = useState<Batch>();
    const [account, setAccount] = useState<Account>(EMPTY);
    const [loaded, setLoaded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchBatch = async () => {
        try {
            if (!regNo) throw new Error();
            setBatch((await BatchAPI.getBatch(regNo)).data);
        } catch {
            setNotFound(true);
        }
    };

    useEffect(() => {
        if (loaded) fetchBatch();
    }, [loaded, groupId, regNo]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                setAccount={setAccount}
                group={Number.parseInt(groupId || '')}
            />
            {loaded && batch && (
                <div className={styles.container}>
                    {}
                    <div className={styles.pane}>
                        {true && (
                            <>
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
                    text={'This batch is not available.'}
                />
            )}
            {waiting && (
                <WaitingForTransaction />
            )}
        </>
    );
};

export default BatchDashboard;