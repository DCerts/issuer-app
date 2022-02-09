import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CertificateAPI from '../../apis/Certificate';
import Certificate from '../../common/models/Certificate';
import AuthFilter from '../../components/AuthFilter';
import CertificateInfo from '../../components/CertificateInfo';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './index.module.scss';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';


const CertificateDashboard = () => {
    const { regNo } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [certificate, setCertificate] = useState<Certificate>();

    const fetchCertificate = async () => {
        try {
            if (!regNo) throw new Error();
            setCertificate((await CertificateAPI.getCertificate(regNo)).data);
        } catch {
            setNotFound(true);
        }
    };

    useEffect(() => {
        if (loaded) fetchCertificate()
    }, [loaded, regNo]);

    return (
        <>
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
            <AuthFilter setLoaded={setLoaded} />
            {loaded && certificate && (
                <div className={styles.container}>
                    <CertificateInfo certificate={certificate} />
                </div>
            )}
            {loaded && notFound && (
                <LoadingComponent
                    text={'This certificate is not available.'}
                />
            )}
        </>
    );
};

export default CertificateDashboard;