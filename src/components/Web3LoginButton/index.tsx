import React from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Auth from '../../apis/Auth';
import { JWT_KEY } from '../../common/AuthConstants';


declare global {
    interface Window {
        ethereum: any;
    }
}

const Web3LoginButton = (props: any) => {
    let web3: Web3 | undefined;
    let navigate = useNavigate();

    const handleClick = async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();

            const publicAddress = await web3.eth.getCoinbase();

            const nonce = (await Auth.fetchNonce(publicAddress)).data;
            const signature = await web3.eth.personal.sign(
                nonce,
                publicAddress,
                '', // the password will be ignored
            );

            if (signature) {
                const jwt = await Auth.authenticate(
                    signature,
                    publicAddress
                );
                // Save JWT for future requests
                localStorage.setItem(JWT_KEY, JSON.stringify(jwt.data));
                navigate('/dashboard');
            }
        }
    };

    return (
        <button onClick={handleClick}>{props.title}</button>
    );
};

export default Web3LoginButton;