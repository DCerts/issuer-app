import React from 'react';
import Certificate from '../../common/models/Certificate';
import styles from './index.module.scss';


interface CertificateInfoProps {
    certificate: Certificate;
}

const CertificateInfo = (props: CertificateInfoProps) => {
    return (
        <>
            {props.certificate && (
                <div className={styles.container}>
                    {props.certificate.onChainId && (
                        <div className={styles.id}>
                            {'#'}{props.certificate.onChainId}
                        </div>
                    )}
                    <div className={styles.title}>
                        {props.certificate.regNo}
                    </div>
                    <div className={styles.text}>
                        <div>{'Batch: '}{props.certificate.batchRegNo}</div>
                        <div>{'Conferred On: '}{props.certificate.conferredOn}</div>
                        <div>{'Date of Birth: '}{props.certificate.dateOfBirth}</div>
                        <div>{'Year of Graduation: '}{props.certificate.yearOfGraduation}</div>
                        <div>{'Major In: '}{props.certificate.majorIn}</div>
                        <div>{'Degree Of: '}{props.certificate.degreeOf}</div>
                        <div>{'Degree Classification: '}{props.certificate.degreeClassification}</div>
                        <div>{'Mode of Study: '}{props.certificate.modeOfStudy}</div>
                        <div>{'Created In: '}{props.certificate.createdIn}</div>
                        {props.certificate.createdAt && (
                            <div>{'Created At: '}{props.certificate.createdAt}</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CertificateInfo;