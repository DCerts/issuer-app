import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import WalletAPI from '../../web3/WalletAPI';
import LoadingComponent from '../LoadingComponent';
import { homeRoute } from '../../Routes';


interface AuthFilterProps {
    setLoaded: (loaded: boolean) => void;
    setAccount?: (account: Account) => void;
    fallbackUrl?: string;
    successUrl?: string;
    role?: Role;
}

const AuthFilter = (props: AuthFilterProps) => {
    const [authorizing, setAuthorizing] = useState(true);
    const navigate = useNavigate();
    const homeUrl = homeRoute.path;

    useEffect(() => {
        const authorize = async () => {
            try {
                const account = (await AccountAPI.get()).data;
                if (props.role !== undefined && account.role !== props.role) {
                    throw new Error();
                }
                props.setLoaded(true);
                if (props.setAccount) props.setAccount(account);
                if (props.successUrl) navigate(props.successUrl);
                await WalletAPI.loadContract();
                setAuthorizing(false);
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

        authorize();
    }, [navigate]);

    return (
        <>
            {
                authorizing && (
                    <LoadingComponent />
                )
            }
        </>
    );
};

export default AuthFilter;