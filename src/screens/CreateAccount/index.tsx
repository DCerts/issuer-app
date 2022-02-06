import React, { useState } from 'react';
import AccountAPI from '../../apis/Account';
import AuthFilter from '../../components/AuthFilter';
import Account from '../../common/models/Account';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import { Role } from '../../common/models';
import GoBackIcon from '../../components/GoBackIcon';
import { dashboardRoute } from '../../Routes';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';


const CreateAccount = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [accountId, setAccountId] = useState<string>('');
    const [accountName, setAccountName] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [waiting, setWaiting] = useState(false);

    const createAccount = async () => {
        try {
            setWaiting(true);
            if (accountId) {
                const account: Account = {
                    id: accountId,
                    name: accountName,
                    birthday: birthday,
                    email: email
                };
                await AccountAPI.create(account);
                navigate(-1);
            }
        } catch {
            setWaiting(false);
        }
    };

    return (
        <>
            <GoBackIcon text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                role={Role.SCHOOL}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && (
                    <>
                        <div className={styles.container}>
                            <SimpleInput
                                placeholder={'Id'}
                                onChange={setAccountId}
                            />
                            <SimpleInput
                                placeholder={'Name'}
                                onChange={setAccountName}
                            />
                            <SimpleInput
                                placeholder={'Birthday'}
                                onChange={setBirthday}
                            />
                            <SimpleInput
                                placeholder={'Email'}
                                onChange={setEmail}
                            />
                            <div className={styles.submit}>
                                <SubmitButton
                                    title={'Create!'}
                                    onClick={createAccount}
                                />
                            </div>
                        </div>
                        {waiting && (
                            <WaitingForTransaction />
                        )}
                    </>
                )
            }
        </>
    );
};

export default CreateAccount;