import React, { useContext, useState } from 'react';
import AccountAPI from '../../apis/Account';
import AuthFilter from '../../components/AuthFilter';
import Account from '../../common/models/Account';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import { Role } from '../../common/models';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import WaitingForTransaction from '../../components/WaitingForTransaction';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { NotificationContext } from '../../App';
import { ERROR, SUCCESS, WARNING } from '../../common/constants/NotificationConstants';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';


const CreateAccount = () => {
    const pushNotification = useContext(NotificationContext);
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [accountId, setAccountId] = useState<string>('');
    const [accountName, setAccountName] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [waiting, setWaiting] = useState(false);

    const createAccount = async () => {
        try {
            if (accountId) {
                setWaiting(true);
                const account: Account = {
                    id: accountId,
                    name: accountName,
                    birthday: birthday,
                    email: email
                };
                await AccountAPI.create(account);
                pushNotification({
                    title: 'Successful',
                    message: 'Member has been added.',
                    type: SUCCESS
                });
                navigate(-1);
            } else {
                pushNotification({
                    title: 'Unsuccessful',
                    message: 'Id cannot be blank!',
                    type: WARNING
                });
            }
        } catch {
            pushNotification({
                title: 'Unsuccessful',
                message: 'Something went wrong!',
                type: ERROR
            });
            setWaiting(false);
        }
    };

    return (
        <>
            <LogoutButton />
            <NavigationBar
                links={[dashboardRoute, joinedGroupsRoute, newsfeedRoute]}
            />
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