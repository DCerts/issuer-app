import React, { useContext, useEffect, useState } from 'react';
import CertificateAPI from '../../apis/Certificate';
import AuthFilter from '../../components/AuthFilter';
import Certificate from '../../common/models/Certificate';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate, useParams } from 'react-router-dom';
import DropDownMenu from '../../components/DropDownMenu';
import BatchAPI from '../../apis/Batch';
import styles from './index.module.scss';
import LoadingComponent from '../../components/LoadingComponent';
import { NotificationContext } from '../../App';
import { ERROR, SUCCESS, WARNING } from '../../common/constants/NotificationConstants';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';


const CreateCertificate = () => {
    const pushNotification = useContext(NotificationContext);
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [group, setGroup] = useState<number>();
    const [availableBatches, setAvailableBatches] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [batchRegNo, setBatchRegNo] = useState<string>();
    const [regNo, setRegNo] = useState<string>('');
    const [conferredOn, setConferredOn] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>();
    const [yearOfGraduation, setYearOfGraduation] = useState<string>();
    const [majorIn, setMajorIn] = useState<string>();
    const [degreeOf, setDegreeOf] = useState<string>();
    const [degreeClassification, setDegreeClassification] = useState<string>();
    const [modeOfStudy, setModeOfStudy] = useState<string>();
    const [createdIn, setCreatedIn] = useState<string>();
    const [waiting, setWaiting] = useState(false);

    const fetchAvailableBatches = async () => {
        const parsedGroupId = Number.parseInt(`${groupId}`);
        setGroup(parsedGroupId);
        if (Number.isInteger(parsedGroupId)) {
            const allCreatedBatches = (await BatchAPI.getCreatedBatches(parsedGroupId)).data;
            setAvailableBatches(allCreatedBatches
                .filter(batch => !batch.issued)
                .map(batch => batch.regNo)
            );
        }
    };

    useEffect(() => {
        if (loaded) {
            fetchAvailableBatches();
        }
    }, [loaded, groupId]);

    const createCertificate = async () => {
        try {
            if (regNo && batchRegNo) {
                setWaiting(true);
                const certificate: Certificate = {
                    batchRegNo: batchRegNo,
                    regNo: regNo,
                    group: group,
                    conferredOn: conferredOn,
                    dateOfBirth: dateOfBirth,
                    yearOfGraduation: yearOfGraduation,
                    majorIn: majorIn,
                    degreeOf: degreeOf,
                    degreeClassification: degreeClassification,
                    modeOfStudy: modeOfStudy,
                    createdIn: createdIn
                };
                await CertificateAPI.createCertificate(certificate);
                pushNotification({
                    title: 'Successful',
                    message: `Certificate #${certificate.regNo} has been created.`,
                    type: SUCCESS
                });
                navigate(-1);
            }
            else {
                pushNotification({
                    title: 'Unsuccessful',
                    message: 'Batch Reg No. and Reg No. cannot be blank!',
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
            {loaded && (availableBatches.length > 0) && (
                <>
                    <div className={styles.container}>
                        <DropDownMenu
                            text={'Batch'}
                            options={availableBatches}
                            onOptionChanged={setBatchRegNo}
                        />
                        <SimpleInput
                            placeholder={'Reg No.'}
                            onChange={setRegNo}
                        />
                        <SimpleInput
                            placeholder={'Conferred On'}
                            onChange={setConferredOn}
                        />
                        <SimpleInput
                            placeholder={'Date of Birth'}
                            onChange={setDateOfBirth}
                        />
                        <SimpleInput
                            placeholder={'Year of Graduation'}
                            onChange={setYearOfGraduation}
                        />
                        <SimpleInput
                            placeholder={'Major In'}
                            onChange={setMajorIn}
                        />
                        <SimpleInput
                            placeholder={'Degree Of'}
                            onChange={setDegreeOf}
                        />
                        <SimpleInput
                            placeholder={'Degree Classification'}
                            onChange={setDegreeClassification}
                        />
                        <SimpleInput
                            placeholder={'Mode of Study'}
                            onChange={setModeOfStudy}
                        />
                        <SimpleInput
                            placeholder={'Created In'}
                            onChange={setCreatedIn}
                        />
                        <div className={styles.submit}>
                            <SubmitButton
                                title={'Create!'}
                                onClick={createCertificate}
                            />
                        </div>
                    </div>
                    {waiting && (
                        <WaitingForTransaction />
                    )}
                </>
            )}
            {loaded && (availableBatches.length === 0) && (
                <LoadingComponent
                    text={'No un-issued batches available.'}
                />
            )}
        </>
    );
};

export default CreateCertificate;