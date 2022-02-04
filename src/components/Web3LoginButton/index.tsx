import React from 'react';
import Auth from '../../apis/Auth';
import { JWT_KEY } from '../../common/constants/AuthConstants';
import Core from '../../web3/Core';
import styles from './index.module.scss';


interface Web3LoginButtonProps {
    title?: string;
    onClick?: () => void;
    onSuccess?: () => void;
    onFailure?: (err: any) => void;
}

const Web3LoginButton = (props: Web3LoginButtonProps) => {
    const handleClick = async () => {
        if (props.onClick) props.onClick();
        const address = await Core.getAddress();
        if (address) {
            try {
                const nonce = (await Auth.fetchNonce(address)).data;
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
        <button className={styles.button} onClick={handleClick}>{props.title}</button>
    );
};

export default Web3LoginButton;