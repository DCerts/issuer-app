import Web3 from 'web3';


class Core {
    private web3: Web3 | undefined;

    constructor() {
        this.connect();
    }

    getAddress() {
        if (this.web3) {
            return this.web3.eth.getCoinbase();
        }
    }

    getWeb3() {
        return this.web3;
    }

    async connect() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
    }

    async sign(message: string, address: string) {
        if (this.web3) {
            return this.web3.eth.personal.sign(
                message,
                address,
                '' // the password will be ignored
            );
        }
    }
}

export default new Core();