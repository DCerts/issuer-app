import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import WalletAPI from '../../web3/WalletAPI';


interface AuthFilterProps {
    setLoaded: (loaded: boolean) => void;
    setAccount?: (account: Account) => void;
    fallbackUrl?: string;
    successUrl?: string;
    role?: Role;
}

const AuthFilter = (props: AuthFilterProps) => {
    const navigate = useNavigate();
    const homeUrl = '/';

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
            } catch (err) {
                props.setLoaded(false);
                if (axios.isAxiosError(err)) {
                    navigate(homeUrl);
                }
                else {
                    navigate(props.fallbackUrl || homeUrl);
                }
            }
        };

        authorize();
    }, [navigate]);

    return null;
};

export default AuthFilter;