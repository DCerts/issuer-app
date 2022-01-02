import React from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Auth from '../../apis/Auth';


declare global {
    interface Window {
        ethereum: any;
    }
}

const Web3LoginButton = (props: any) => {
    let web3: Web3 | undefined;
    let navigate = useNavigate();

    const signMessage = async (message: string, publicAddress: string) => {
        return web3?.eth.personal.sign(
            message,
            publicAddress,
            '' // the password will be ignored
        );
    };

    const handleClick = async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();

            const publicAddress = await web3.eth.getCoinbase();
            console.log(publicAddress);

            const nonce = await Auth.fetchNonce(publicAddress);
            const signature = await signMessage(
                nonce?.data,
                publicAddress
            );

            if (signature) {
                const jwt = await Auth.authenticate(
                    signature,
                    publicAddress
                );
                // TODO: Save JWT for future requests
                localStorage.setItem('jwt', JSON.stringify(jwt)); // but don't do that!
                navigate('/dashboard');
            }
        }
    };

    return (
        <button onClick={handleClick}>{props.title}</button>
    );
};

export default Web3LoginButton;