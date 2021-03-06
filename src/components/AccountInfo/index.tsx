import React from 'react';
import Account from '../../common/models/Account';
import TextShortCut from '../TextShortCut';
import styles from './index.module.scss';


interface AccountInfoProps {
    account: Account;
    onSuccess?: () => void;
    onFailure?: (err: any) => void;
    onSubmit?: () => void;
}

const AccountInfo = (props: AccountInfoProps) => {
    return (
        <>
            {props.account && (
                <div className={styles.container}>
                    <div className={styles.title}>
                        {props.account.id}
                    </div>
                    <div className={styles.text}>
                        <div>
                            {props.account.name && (
                                <div>{'Name: '}{props.account.name}</div>
                            )}
                        </div>
                        <div>
                            {props.account.email && (
                                <TextShortCut
                                    header={'Email: '}
                                    text={props.account.email}
                                    url={'mailto:' + props.account.email}
                                />
                            )}
                        </div>
                        <div>
                            {props.account.birthday && (
                                <div>{'Date of Birth: '}{props.account.birthday}</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountInfo;