import React, { useState } from 'react';
import Web3LoginButton from '../../components/Web3LoginButton';
import AuthFilter from '../../components/AuthFilter';
import { useNavigate } from 'react-router-dom';
import { dashboardRoute } from '../../Routes';
import styles from './index.module.scss';
import WaitingForTransaction from '../../components/WaitingForTransaction';


const Home = () => {
    const [success, setSuccess] = useState(true);
    const [signing, setSigning] = useState(false);
    const successUrl = dashboardRoute.path;
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
                        <div className={styles.container}>
                            <div className={styles.text}>{'Sign in with'}</div>
                            <Web3LoginButton
                                title={'MetaMask'}
                                onSuccess={() => navigate(successUrl)}
                                onFailure={(err) => {
                                    console.log(err);
                                    setSigning(false);
                                }}
                                onClick={() => {
                                    setSigning(true);
                                }}
                            />
                        </div>
                        {signing && (
                            <WaitingForTransaction />
                        )}
                    </>
                )
            }
        </>
    );
};

export default Home;