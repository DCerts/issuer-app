import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BatchAPI from '../../apis/Batch';
import { NotificationContext } from '../../App';
import { ERROR, SUCCESS } from '../../common/constants/NotificationConstants';
import Account, { EMPTY } from '../../common/models/Account';
import Batch from '../../common/models/Batch';
import Certificate from '../../common/models/Certificate';
import AuthFilter from '../../components/AuthFilter';
import BatchInfo from '../../components/BatchInfo';
import CertificateInfo from '../../components/CertificateInfo';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import NewsIcon from '../../components/NewsIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';


const BatchDashboard = () => {
    const pushNotification = useContext(NotificationContext);
    const { regNo } = useParams();
    const [batch, setBatch] = useState<Batch>();
    const [seekingCertificate, setSeekingCertificate] = useState<Certificate>();
    const [account, setAccount] = useState<Account>(EMPTY);
    const [loaded, setLoaded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

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
    }, [loaded, regNo]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                setAccount={setAccount}
            />
            {loaded && !waiting && batch && (
                <div className={styles.container}>
                    <BatchInfo
                        batch={batch}
                        groups={account.groups || []}
                        onSuccess={() => {
                            pushNotification({
                                title: 'Successful',
                                message: 'Your confirmation is submited!',
                                type: SUCCESS
                            });
                            navigate(-1);
                        }}
                        onFailure={() => {
                            pushNotification({
                                title: 'Unsuccessful',
                                message: 'Something went wrong!',
                                type: ERROR
                            });
                            setWaiting(false);
                        }}
                        onSubmit={() => setWaiting(true)}
                    />
                    {batch.certificates.length > 0 && (
                        batch.certificates.map((certificate, index) => (
                            <NewsIcon
                                title={certificate.regNo}
                                hoverTitle={'View details!'}
                                highlight={certificate.issued}
                                key={index}
                                onClick={() => setSeekingCertificate(certificate)}
                            />
                        ))
                    )}
                </div>
            )}
            {!waiting && seekingCertificate && (
                <WaitingForTransaction onClick={() => setSeekingCertificate(undefined)}>
                    <CertificateInfo certificate={seekingCertificate} />
                </WaitingForTransaction>
            )}
            {loaded && notFound && (
                <LoadingComponent
                    text={'This batch is not available.'}
                />
            )}
            {waiting && (
                <LoadingComponent
                    text={'Confirmation is being processed...'}
                />
            )}
        </>
    );
};

export default BatchDashboard;