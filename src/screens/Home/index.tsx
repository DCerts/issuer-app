import React, { useState } from 'react';
import Web3LoginButton from '../../components/Web3LoginButton';
import AuthFilter from '../../components/AuthFilter';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [success, setSuccess] = useState(true);
    const successUrl = '/dashboard';
    const navigate = useNavigate();

    return (
        <>
            {
                success && (
                    <AuthFilter setLoaded={setSuccess} successUrl={successUrl} />
                )
            }
            {
                !success && (
                    <>
                        <h2>{'Sign in with'}</h2>
                        <Web3LoginButton
                            title={'MetaMask'}
                            onSuccess={() => navigate(successUrl)}
                            onFailure={console.log}
                        />
                    </>
                )
            }
        </>
    );
};

export default Home;