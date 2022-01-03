import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3LoginButton from '../../components/Web3LoginButton';
import Account from '../../apis/Account';


const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                await Account.get();
                navigate('/dashboard');
            } catch {}
        };

        fetchAccount();
    });

    return (
        <>
            <h1>Sign in with</h1>
            <Web3LoginButton title={'MetaMask'} />
        </>
    );
};

export default Home;