import React from 'react';
import Auth from '../../apis/Auth';
import { JWT_KEY } from '../../common/AuthConstants';
import Core from '../../web3/Core';


interface Web3LoginButtonProps {
    title?: string;
    onSuccess?: () => void;
    onFailure?: (err: any) => void;
}

const Web3LoginButton = (props: Web3LoginButtonProps) => {
    const handleClick = async () => {
        const address = await Core.getAddress();
        if (address) {
            const nonce = (await Auth.fetchNonce(address)).data;
            try {
                const signature = await Core.sign(nonce, address);

                if (signature) {
                    const jwt = await Auth.authenticate(
                        signature,
                        address
                    );
                    // Save JWT for future requests
                    localStorage.setItem(JWT_KEY, jwt.data);
                    if (props.onSuccess) props.onSuccess();
                }
            } catch (err) {
                if (props.onFailure) props.onFailure(err);
            }
        }
    };

    return (
        <button onClick={handleClick}>{props.title}</button>
    );
};

export default Web3LoginButton;