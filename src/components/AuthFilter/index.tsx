import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountAPI from '../../apis/Account';
import { Account, Role } from '../../common/models';
import WalletAPI from '../../web3/Wallet';
import LoadingComponent from '../LoadingComponent';
import { homeRoute } from '../../Routes';
import Core, { Web3NotEnableError } from '../../web3/Core';
import API from '../../apis/Base';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';
import { REDIRECT_TO_QUERY } from '../../common/constants/RouteConstants';
import { NotificationContext } from '../../App';
import { ERROR } from '../../common/constants/NotificationConstants';


interface AuthFilterProps {
    setLoaded: (loaded: boolean) => void;
    setAccount?: (account: Account) => void;
    setGroup?: (group: Group) => void;
    fallbackUrl?: string;
    successUrl?: string;
    role?: Role;
    group?: number;
}

enum AuthCode {
    UNAUTHORIZED = 0,
    ROLE_NOT_MATCHED = 1,
    NOT_IN_GROUP = 2
};

class AuthError extends Error {
    private authCode: number = 0;

    constructor(authCode: number) {
        super();
        this.authCode = authCode;
    }

    get code() {
        return this.authCode;
    }
}

const AuthFilter = (props: AuthFilterProps) => {
    const pushNotification = useContext(NotificationContext);
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

    const getAccount = async () => {
        try {
            return (await AccountAPI.get()).data;
        } catch {
            throw new AuthError(AuthCode.UNAUTHORIZED);
        }
    };

    const getGroup = async (groupId: number, accountId: string) => {
        try {
            const group = (await GroupAPI.getGroup(groupId)).data;
            if (!group.members.includes(accountId)) {
                throw new AuthError(AuthCode.NOT_IN_GROUP);
            }
            return group;
        } catch {
            throw new AuthError(AuthCode.NOT_IN_GROUP);
        }
    };

    const handleError = (err: any) => {
        let message = '';
        let fallbackUrl = props.fallbackUrl;
        if (err instanceof AuthError) {
            const authCode = err.code;
            if (authCode === AuthCode.UNAUTHORIZED) {
                API.clearToken();
                message = 'You must log in first!';
                fallbackUrl = homeUrl;
            }
            else {
                message = 'You have no permission to access this area!';
            }
        }
        pushNotification({
            title: 'Unauthorized',
            message: message,
            type: ERROR
        });
        if (fallbackUrl) {
            navigate(fallbackUrl);
        }
        else {
            navigate(-1);
        }
    };

    const authorize = async () => {
        try {
            const account = await getAccount();
            if (props.role !== undefined && account.role !== props.role) {
                throw new AuthError(AuthCode.ROLE_NOT_MATCHED);
            }
            if (props.group !== undefined) {
                const group = await getGroup(props.group, account.id);
                if (props.setGroup) props.setGroup(group);
            }
            if (props.setAccount) props.setAccount(account);
            if (props.successUrl) navigate(props.successUrl);
            setAuthorizing(false);
            props.setLoaded(true);
            return true;
        } catch (err) {
            props.setLoaded(false);
            if (isHome) return; // No need to redirect when being on home page
            handleError(err);
            return false;
        }
    };

    const connectWeb3 = async () => {
        try {
            await WalletAPI.connect();
        } catch (err) {
            pushNotification({
                title: 'Network Incorrect',
                message: 'Please check your network in MetaMask.',
                type: ERROR
            });
        }
    };

    useEffect(() => {
        const check = async () => {
            if (await enableWeb3()) {
                const authorized = await authorize();
                if (authorized) await connectWeb3();
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