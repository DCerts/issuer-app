import React, { useState } from 'react';
import CertificateAPI from '../../apis/Certificate';
import AuthFilter from '../../components/AuthFilter';
import Certificate from '../../common/models/Certificate';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import GoBackIcon from '../../components/GoBackIcon';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';


const CreateCertificate = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [regNo, setRegNo] = useState<string>('');
    const [conferredOn, setConferredOn] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [yearOfGraduation, setYearOfGraduation] = useState<string>('');
    const [majorIn, setMajorIn] = useState<string>('');
    const [degreeOf, setDegreeOf] = useState<string>('');
    const [degreeClassification, setDegreeClassification] = useState<string>('');
    const [modeOfStudy, setModeOfStudy] = useState<string>('');
    const [createdIn, setCreatedIn] = useState<string>('');
    const [waiting, setWaiting] = useState(false);

    const createCertificate = async () => {
        try {
            setWaiting(true);
            if (regNo) {
                const group = Number.parseInt(groupId || '');
                const certificate: Certificate = {
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
                                    confirm={true}
                                    onClick={createCertificate}
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

export default CreateCertificate;