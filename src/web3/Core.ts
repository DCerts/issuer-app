import Web3 from 'web3';


export class Web3NotEnableError extends Error {}

class Core {
    private web3: Web3 | undefined;

    getAddress() {
        if (this.web3) {
            return this.web3.eth.getCoinbase();
        }
    }

    getWeb3() {
        return this.web3;
    }

    getLatestBlock() {
        if (this.web3) {
            return this.web3.eth.getBlockNumber();
        }
    }

    async connect() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else {
            throw new Web3NotEnableError();
        }
    }

    async sign(message: string, address: string) {
        if (this.web3) {
            return this.web3.eth.personal.sign(
                message,
                address,
                '' // the password will be ignored by MetaMask
            );
        }
    }
}

export default new Core();