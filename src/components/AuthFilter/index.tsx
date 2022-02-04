import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import WalletAPI from '../../web3/Wallet';
import LoadingComponent from '../LoadingComponent';
import { homeRoute } from '../../Routes';
import Core, { Web3NotEnableError } from '../../web3/Core';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';
import { REDIRECT_TO_QUERY } from '../../common/constants/RouteConstants';


interface AuthFilterProps {
    setLoaded: (loaded: boolean) => void;
    setAccount?: (account: Account) => void;
    setGroup?: (group: Group) => void;
    fallbackUrl?: string;
    successUrl?: string;
    role?: Role;
    group?: number;
}

const AuthFilter = (props: AuthFilterProps) => {
    const [authorizing, setAuthorizing] = useState(true);
    const [isWeb3Enable, setIsWeb3Enable] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const homeUrl = homeRoute.path.concat(
        `?${REDIRECT_TO_QUERY}=${
            encodeURIComponent(location.pathname + location.search)
        }`
    );
    const isHome = location.pathname === homeRoute.path;
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
            if (props.group !== undefined) {
                const group = (await GroupAPI.getGroup(props.group)).data;
                if (!group.members.includes(account.id)) {
                    throw new Error();
                }
                if (props.setGroup) props.setGroup(group);
            }
            if (props.setAccount) props.setAccount(account);
            if (props.successUrl) navigate(props.successUrl);
            await WalletAPI.connect();
            setAuthorizing(false);
            props.setLoaded(true);
        } catch (err) {
            props.setLoaded(false);
            if (isHome) return; // No need to redirect when being on home page
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