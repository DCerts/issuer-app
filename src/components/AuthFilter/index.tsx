import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import WalletAPI from '../../web3/Wallet';
import LoadingComponent from '../LoadingComponent';
import { homeRoute } from '../../Routes';
import Core, { Web3NotEnableError } from '../../web3/Core';


interface AuthFilterProps {
    setLoaded: (loaded: boolean) => void;
    setAccount?: (account: Account) => void;
    fallbackUrl?: string;
    successUrl?: string;
    role?: Role;
}

const AuthFilter = (props: AuthFilterProps) => {
    const [authorizing, setAuthorizing] = useState(true);
    const [isWeb3Enable, setIsWeb3Enable] = useState(true);
    const navigate = useNavigate();
    const homeUrl = homeRoute.path;
    const web3NotEnableText = 'You should consider using MetaMask.';

    const enableWeb3 = async () => {
        try {
            await Core.connect();
            return true;
        } catch (err) {
            if (err instanceof Web3NotEnableError) {
                setIsWeb3Enable(false);
            }
        }
    };

    const authorize = async () => {
        try {
            const account = (await AccountAPI.get()).data;
            if (props.role !== undefined && account.role !== props.role) {
                throw new Error();
            }
            if (props.setAccount) props.setAccount(account);
            if (props.successUrl) navigate(props.successUrl);
            await WalletAPI.connect();
            setAuthorizing(false);
            props.setLoaded(true);
        } catch (err) {
            props.setLoaded(false);
            if (axios.isAxiosError(err)) { // Unauthorized
                navigate(homeUrl);
            }
            else { // Role mismatch
                navigate(props.fallbackUrl || homeUrl);
            }
        }
    };

    useEffect(() => {
        const check = async () => {
            if (await enableWeb3()) {
                authorize();
            }
        };

        check();
    }, [navigate]);

    return (
        <>
            {
                isWeb3Enable && authorizing && (
                    <LoadingComponent />
                )
            }
            {
                !isWeb3Enable && (
                    <LoadingComponent
                        text={web3NotEnableText}
                    />
                )
            }
        </>
    );
};

export default AuthFilter;