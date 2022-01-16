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

let contract: Contract;

const Wallet = {
    /**
     * Connects to the contract MultiSigWallet.
     * @returns true if connected; otherwise, undefined.
     */
    connect: async () => {
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
            contract = new web3.eth.Contract(abi, address);
            return contract;
        }
    }
};

export default Wallet;