import Wallet from './Wallet';


class Web3Group {
    async getGroup(groupId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            return contract.methods.getGroup(groupId).call();
        }
    }

    async createGroup(name: string, members: string[], threshold: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .addGroup(name, members, threshold)
                .send(await Wallet.getSendingOptions());
        }
    }

    async confirmGroup(groupId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .confirmGroup(groupId)
                .send(await Wallet.getSendingOptions());
        }
    }

    async rejectGroup(groupId: number) {
        const contract = Wallet.getContract();
        if (contract) {
            await contract.methods
                .rejectGroup(groupId)
                .send(await Wallet.getSendingOptions());
        }
    }
}

export default new Web3Group();