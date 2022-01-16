import Wallet from './Wallet';
import { Contract } from 'web3-eth-contract';
import Core from './Core';


class WalletAPI {
    private contract: Contract | undefined;

    async loadContract() {
        if (!this.contract) {
            this.contract = await Wallet.connect();
        }
    }

    async getGroup(groupId: number) {
        if (this.contract) {
            return this.contract.methods.getGroup(groupId).call();
        }
    }

    async createGroup(name: string, members: string[], threshold: number) {
        if (this.contract) {
            const address = await Core.getAddress();
            const groupId: number = (await this.contract.methods.addGroup(name, members, threshold).send({
                from: address,
                gas: 1000000
            })).events.GroupWaitingForConfirmation.returnValues.groupId;
            return groupId;
        }
    }
}

export default new WalletAPI();