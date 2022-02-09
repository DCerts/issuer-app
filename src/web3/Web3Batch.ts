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
            const certificates = batch.certificates.map(certificate => {
                return [
                    0,
                    '0x0000000000000000000000000000000000000000',
                    certificate.regNo,
                    0,
                    certificate.batchRegNo,
                    certificate.conferredOn,
                    certificate.dateOfBirth,
                    `${certificate.yearOfGraduation}`,
                    certificate.majorIn,
                    certificate.degreeOf,
                    certificate.degreeClassification,
                    certificate.modeOfStudy,
                    certificate.createdIn,
                    certificate.createdAt,
                    []
                ];
            });
            await contract.methods
                .submitBatch(batch.group, batch.regNo, certificates)
                .send(await Wallet.getSendingOptions());
        }
    }

    async confirmBatch(groupId: number, onChainId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .confirmBatch(groupId, onChainId)
                .send(await Wallet.getSendingOptions());
        }
    }

    async rejectBatch(groupId: number, onChainId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .rejectBatch(groupId, onChainId)
                .send(await Wallet.getSendingOptions());
        }
    }
}

export default new Web3Batch();