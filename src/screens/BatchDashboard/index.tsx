import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BatchAPI from '../../apis/Batch';
import Account, { EMPTY } from '../../common/models/Account';
import Batch from '../../common/models/Batch';
import Certificate from '../../common/models/Certificate';
import AuthFilter from '../../components/AuthFilter';
import CertificateInfo from '../../components/CertificateInfo';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import NewsIcon from '../../components/NewsIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import styles from './index.module.scss';


const BatchDashboard = () => {
    const { regNo } = useParams();
    const [batch, setBatch] = useState<Batch>();
    const [seekingCertificate, setSeekingCertificate] = useState<Certificate>();
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
    }, [loaded, regNo]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                setAccount={setAccount}
            />
            {loaded && batch && (
                <div className={styles.container}>
                    {batch.certificates.length > 0 && (
                        batch.certificates.map((certificate, index) => (
                            <NewsIcon
                                title={certificate.regNo}
                                hoverTitle={'View details!'}
                                key={index}
                                onClick={() => setSeekingCertificate(certificate)}
                            />
                        ))
                    )}
                    {batch.group && (
                        <></>
                    )}
                </div>
            )}
            {seekingCertificate && (
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
                <WaitingForTransaction />
            )}
        </>
    );
};

export default BatchDashboard;