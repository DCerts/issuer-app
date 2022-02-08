import { Contract } from 'web3-eth-contract';
import Core from './Core';
import MultiSigWallet from '../contracts/MultiSigWallet.json';


interface ContractJSON {
    abi: any[];
    networks: {
        [networkId: number]: {
            address: string;
        };
    };
}

class Wallet {
    private contract: Contract | undefined;
    private sendingOptions: any;

    async connect() {
        if (this.contract) return;
        const web3 = Core.getWeb3();
        const contractJSON: ContractJSON = {
            abi: MultiSigWallet.abi,
            networks: MultiSigWallet.networks
        };
        if (web3) {
            const netId = await web3.eth.net.getId();
            const abi = contractJSON.abi;
            const address = contractJSON.networks[netId].address;
            console.info(`Wallet: ${address}`);
            this.contract = new web3.eth.Contract(abi, address);
            this.sendingOptions = {
                from: await Core.getAddress(),
                gas: 8000000
            };
        }
    }

    getContract() {
        return this.contract;
    }

    getSendingOptions() {
        return this.sendingOptions;
    }
}

export default new Wallet();