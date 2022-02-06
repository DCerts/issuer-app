import Batch from '../common/models/Batch';
import Wallet from './Wallet';


class Web3Batch {
    async getBatch(onChainId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            return contract.methods.getBatch(onChainId).call();
        }
    }

    async createBatch(batch: Batch) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .submitBatch(batch.group, batch.regNo, batch.certificates.map(certificate => {
                    return {
                        id: 0,
                        schoolId: '0x0000000000000000000000000000000000000000',
                        regNo: certificate.regNo,
                        batchId: 0,
                        batchRegNo: certificate.batchRegNo,
                        conferredOn: certificate.conferredOn,
                        dateOfBirth: certificate.dateOfBirth,
                        yearOfGraduation: certificate.yearOfGraduation,
                        majorIn: certificate.majorIn,
                        degreeOf: certificate.degreeOf,
                        degreeClassification: certificate.degreeClassification,
                        modeOfStudy: certificate.modeOfStudy,
                        createdIn: certificate.createdIn,
                        createdAt: certificate.createdAt,
                        issuers: []
                    };
                }))
                .send(Wallet.getSendingOptions());
        }
    }

    async confirmBatch(groupId: number, onChainId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .confirmBatch(groupId, onChainId)
                .send(Wallet.getSendingOptions());
        }
    }

    async rejectBatch(groupId: number, onChainId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .rejectBatch(groupId, onChainId)
                .send(Wallet.getSendingOptions());
        }
    }
}

export default new Web3Batch();