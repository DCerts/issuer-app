import React, { useContext, useState } from 'react';
import Web3LoginButton from '../../components/Web3LoginButton';
import AuthFilter from '../../components/AuthFilter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dashboardRoute } from '../../Routes';
import styles from './index.module.scss';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { REDIRECT_TO_QUERY } from '../../common/constants/RouteConstants';
import { NotificationContext } from '../../App';
import { ERROR } from '../../common/constants/NotificationConstants';


const Home = () => {
    const pushNotification = useContext(NotificationContext);
    const [success, setSuccess] = useState(true);
    const [signing, setSigning] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const successUrl = decodeURIComponent(
        searchParams.get(REDIRECT_TO_QUERY) || ''
    ) || dashboardRoute.path;

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
                                onFailure={() => {
                                    pushNotification({
                                        title: 'Unsuccessful',
                                        message: 'Something went wrong!',
                                        type: ERROR
                                    });
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