import React from 'react';
import Group from '../../common/models/Group';
import Role from '../../common/models/Role';
import Web3Group from '../../web3/Web3Group';
import ConfirmationPane from '../ConfirmationPane';
import TextShortCut from '../TextShortCut';
import styles from './index.module.scss';


interface GroupInfoProps {
    group: Group;
    role?: Role;
    onSuccess?: () => void;
    onFailure?: (err: any) => void;
    onSubmit?: () => void;
}

const GroupInfo = (props: GroupInfoProps) => {
    const confirmGroup = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            await Web3Group.confirmGroup(props.group.id);
            if (props.onSuccess) props.onSuccess();
        } catch (err) {
            if (props.onFailure) props.onFailure(err);
        }
    };

    const rejectGroup = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            await Web3Group.rejectGroup(props.group.id);
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
                        <div>{'Threshold: '}{props.group.threshold}</div>
                        <div>{'Members: '}{props.group.members.map((memberId, index) => (
                            <div className={styles.shortcut} key={index}>
                                <TextShortCut
                                    text={memberId}
                                    to={`/accounts/${memberId}`}
                                    key={index}
                                />
                            </div>
                        ))}</div>
                    </div>
                    {!props.group.available && props.role === Role.SCHOOL && (
                        <div className={styles.submit}>
                            <ConfirmationPane
                                onConfirm={confirmGroup}
                                onReject={rejectGroup}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GroupInfo;