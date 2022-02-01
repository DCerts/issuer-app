import Certificate from '../common/models/Certificate';
import Base from './Base';

const CertificateAPI = {
    createCertificate: async (certificate: Certificate) => {
        return Base.auth().put(
            `/certificates/${certificate.regNo}`,
            certificate
        );
    },
    getCertificate: async (regNo: string) => {
        return Base.auth().get<Certificate>(`/certificates/${regNo}`);
    },
    getCreatedCertificates: async (groupId: number) => {
        return Base.auth().get<Certificate[]>(`/certificates?group_id=${groupId}`);
    }
};

export default CertificateAPI;