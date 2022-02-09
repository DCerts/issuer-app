import React, { useContext, useState } from 'react';
import BatchAPI from '../../apis/Batch';
import AuthFilter from '../../components/AuthFilter';
import Batch from '../../common/models/Batch';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import CSV from '../../utils/parsers/CSV';
import Certificate from '../../common/models/Certificate';
import CertificateInfo from '../../components/CertificateInfo';
import NewsIcon from '../../components/NewsIcon';
import { NotificationContext } from '../../App';
import { ERROR, SUCCESS, WARNING } from '../../common/constants/NotificationConstants';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';


const CreateBatch = () => {
    const pushNotification = useContext(NotificationContext);
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [regNo, setRegNo] = useState<string>('');
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [seekingCertificate, setSeekingCertificate] = useState<Certificate>();
    const [uploaded, setUploaded] = useState(false);
    const [waiting, setWaiting] = useState(false);

    const createBatch = async () => {
        try {
            if (regNo) {
                setWaiting(true);
                const group = Number.parseInt(`${groupId}`);
                certificates.forEach(certificate => {
                    certificate.group = group;
                    certificate.batchRegNo = regNo;
                });
                const batch: Batch = {
                    regNo: regNo,
                    group: group,
                    certificates: certificates
                };
                await BatchAPI.createBatch(batch);
                pushNotification({
                    title: 'Successful',
                    message: `Batch #${batch.regNo} has been created.`,
                    type: SUCCESS
                });
                navigate(-1);
            }
            else {
                pushNotification({
                    title: 'Unsuccessful',
                    message: 'Reg No. cannot be blank!',
                    type: WARNING
                });
            }
        } catch {
            pushNotification({
                title: 'Unsuccessful',
                message: 'Something went wrong!',
                type: ERROR
            });
            setWaiting(false);
        }
    };

    const certificateMapping = {
        'Reg No.': 'regNo',
        'Full Name': 'conferredOn',
        'Birthday': 'dateOfBirth',
        'Graduation Year': 'yearOfGraduation',
        'Major': 'majorIn',
        'Degree': 'degreeOf',
        'Degree Classification': 'degreeClassification',
        'Study Mode': 'modeOfStudy',
        'Created Place': 'createdIn'
    };

    const handleUploadedFiles = async (files: FileList) => {
        const uploadedCertificates: Certificate[] = [];
        for (const file of Array.from(files)) {
            const result = await CSV.parse(file, certificateMapping) as Certificate[];
            uploadedCertificates.push(...result);
        }
        setCertificates(uploadedCertificates);
        setUploaded(true);
    };

    return (
        <>
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
            <AuthFilter
                setLoaded={setLoaded}
                group={Number.parseInt(`${groupId}`)}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && (
                    <>
                        <div className={styles.container}>
                            <SimpleInput
                                placeholder={'Reg No.'}
                                onChange={setRegNo}
                            />
                            <SimpleInput
                                placeholder={'Upload Certificates!'}
                                type={'file'}
                                accept={['.csv']}
                                onChange={handleUploadedFiles}
                            />
                            <div className={styles.pane}>
                                {uploaded && (certificates.length > 0) && (
                                    certificates.map((certificate, index) => (
                                        <NewsIcon
                                            title={certificate.regNo}
                                            hoverTitle={'View details!'}
                                            key={index}
                                            onClick={() => setSeekingCertificate(certificate)}
                                        />
                                    ))
                                )}
                            </div>
                            <div className={styles.submit}>
                                <SubmitButton
                                    title={'Submit!'}
                                    onClick={createBatch}
                                />
                            </div>
                        </div>
                        {seekingCertificate && (
                            <WaitingForTransaction onClick={() => setSeekingCertificate(undefined)}>
                                <CertificateInfo certificate={seekingCertificate} />
                            </WaitingForTransaction>
                        )}
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