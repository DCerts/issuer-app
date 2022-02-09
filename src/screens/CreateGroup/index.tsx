import React, { useContext, useEffect, useState } from 'react';
import AuthFilter from '../../components/AuthFilter';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import Web3Group from '../../web3/Web3Group';
import { Account, Role } from '../../common/models';
import { dashboardRoute, joinedGroupsRoute, newsfeedRoute } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import { NotificationContext } from '../../App';
import { ERROR, SUCCESS } from '../../common/constants/NotificationConstants';
import LogoutButton from '../../components/LogoutButton';
import NavigationBar from '../../components/NavigationBar';
import AccountAPI from '../../apis/Account';
import styles from './index.module.scss';
import SelectionPane from '../../components/SelectionPane';


class ValidationError extends Error {
    private validationCode: number = 0;

    constructor(validationCode: number) {
        super();
        this.validationCode = validationCode;
    }

    get code() {
        return this.validationCode;
    }
}

enum ValidationCode {
    GROUP_NAME_INVALID = 0,
    GROUP_THRESHOLD_INVALID = 1,
    GROUP_MEMBERS_INVALID = 2
}

const CreateGroup = () => {
    const pushNotification = useContext(NotificationContext);
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [groupName, setGroupName] = useState<string>('');
    const [groupThreshold, setGroupThreshold] = useState<number>(0);
    const [groupMembers, setGroupMembers] = useState<string[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setAccounts((await AccountAPI.getAll()).data);
            } catch {}
        };

        if (loaded) fetchAccounts();
    }, [loaded]);

    const handleError = (err: any) => {
        let message = '';
        if (err instanceof ValidationError) {
            const errorCode = err.code;
            if (errorCode === ValidationCode.GROUP_NAME_INVALID) {
                message = 'Name of a group cannot be blank!';
            }
            else if (errorCode === ValidationCode.GROUP_THRESHOLD_INVALID) {
                message = 'Threshold of a group must be positive'
                    + ' and not greater than the number of its members.';
            }
            else if (errorCode === ValidationCode.GROUP_MEMBERS_INVALID) {
                message = 'A group must have at least one member.';
            }
        }
        else {
            message = 'Something went wrong!';
        }
        pushNotification({
            title: 'Unsuccessful',
            message: message,
            type: ERROR
        });
    };

    const createGroup = async () => {
        try {
            if (!groupName) {
                throw new ValidationError(ValidationCode.GROUP_NAME_INVALID);
            }
            if (groupThreshold <= 0 || groupThreshold > groupMembers.length) {
                throw new ValidationError(ValidationCode.GROUP_THRESHOLD_INVALID);
            }
            if (groupMembers.length == 0) {
                throw new ValidationError(ValidationCode.GROUP_MEMBERS_INVALID);
            }
            setWaiting(true);
            await Web3Group.createGroup(
                groupName,
                groupMembers,
                groupThreshold
            );
            pushNotification({
                title: 'Successful',
                message: `Group ${groupName} has been created.`,
                type: SUCCESS
            });
            navigate(-1);
        } catch (err) {
            handleError(err);
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
            {loaded && (accounts.length > 0) && !waiting && (
                <>
                    <div className={styles.container}>
                        <SimpleInput
                            placeholder={'Name'}
                            onChange={setGroupName}
                        />
                        <SimpleInput
                            type={'number'}
                            placeholder={'Threshold'}
                            onChange={(text) => {
                                setGroupThreshold(Number.parseInt(text));
                            }}
                        />
                        <SelectionPane
                            text={'Members'}
                            typingText={'Type something!'}
                            options={accounts.map(account => account.id)}
                            onOptionsChanged={(...options: string[]) => {
                                setGroupMembers(options);
                            }}
                        />
                        <div className={styles.submit}>
                            <SubmitButton
                                title={'Create!'}
                                onClick={createGroup}
                            />
                        </div>
                    </div>
                </>
            )}
            {waiting && (
                <LoadingComponent
                    text={'Group is being created...'}
                />
            )}
        </>
    );
};

export default CreateGroup;