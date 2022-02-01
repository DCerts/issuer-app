import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CertificateAPI from '../../apis/Certificate';
import Certificate from '../../common/models/Certificate';
import Group from '../../common/models/Group';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import NewsIcon from '../../components/NewsIcon';
import styles from './index.module.scss';


const CreatedCertificatees = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<Group>();
    const [loaded, setLoaded] = useState(false);
    const [certificates, setCertificatees] = useState<Certificate[] | undefined>();

    useEffect(() => {
        const fetchCertificatees = async () => {
            try {
                if (group) {
                    setCertificatees(
                        (await CertificateAPI.getCreatedCertificates(group.id)).data
                    );
                }
            } catch {}
        };

        if (loaded) fetchCertificatees();
    }, [loaded]);

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                setGroup={setGroup}
                group={Number.parseInt(groupId || '')}
            />
            {
                loaded && (
                    <div className={styles.container}>
                        <NewsIcon
                            title={'Create a new certificate'}
                            hoverTitle={'Create one now!'}
                            url={`/groups/${groupId}/certificates/new`}
                            special={true}
                        />
                        {certificates && (certificates.length > 0) && certificates
                            .map((certificate, index) => (
                                <NewsIcon
                                    title={certificate.regNo}
                                    url={`/groups/${groupId}/certificates/${certificate.regNo}`}
                                    key={index}
                                />
                            )
                        )}
                        {(!certificates || !certificates.length) && (
                            <LoadingComponent
                                text={'You have not issued any certificates yet.'}
                            />
                        )}
                    </div>
                )
            }
        </>
    );
};

export default CreatedCertificatees;