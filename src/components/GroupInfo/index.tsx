import React from 'react';
import GroupAPI from '../../apis/Group';
import Group from '../../common/models/Group';
import WalletAPI from '../../web3/WalletAPI';
import SubmitButton from '../SubmitButton';
import styles from './index.module.scss';


interface GroupInfoProps {
    group: Group;
    onSuccess?: () => void;
    onFailure?: (err: any) => void;
    onSubmit?: () => void;
}

const GroupInfo = (props: GroupInfoProps) => {
    const confirmGroup = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            await WalletAPI.confirmGroup(props.group.id);
            await GroupAPI.confirmGroup(props.group.id);
            if (props.onSuccess) props.onSuccess();
        } catch (err) {
            if (props.onFailure) props.onFailure(err);
        }
    };

    const rejectGroup = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            await GroupAPI.rejectGroup(props.group.id);
            if (props.onSuccess) props.onSuccess();
        } catch (err) {
            if (props.onFailure) props.onFailure(err);
        }
    };

    return (
        <>
            {props.group && (
                <div className={styles.container}>
                    <div className={styles.id}>
                        {'#'}{props.group.id}
                    </div>
                    <div className={styles.title}>
                        {props.group.name}
                    </div>
                    <div className={styles.text}>
                        {'Threshold: '}{props.group.threshold}
                    </div>
                    {!props.group.available && (
                        <div className={styles.submit}>
                            <SubmitButton
                                confirm={true}
                                onClick={confirmGroup}
                            />
                            <SubmitButton
                                confirm={false}
                                onClick={rejectGroup}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GroupInfo;