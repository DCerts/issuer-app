import React from 'react';
import Batch from '../../common/models/Batch';
import Web3Batch from '../../web3/Web3Batch';
import ConfirmationPane from '../ConfirmationPane';
import SubmitButton from '../SubmitButton';
import TextShortCut from '../TextShortCut';
import styles from './index.module.scss';


interface BatchInfoProps {
    batch: Batch;
    groups: number[];
    onSuccess?: () => void;
    onFailure?: (err: any) => void;
    onSubmit?: () => void;
}

const BatchInfo = (props: BatchInfoProps) => {
    const isSubmited = Number.isInteger(props.batch.onChainId);

    const submitBatch = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            if (!isSubmited) {
                await Web3Batch.createBatch(props.batch);
            }
            if (props.onSuccess) props.onSuccess();
        } catch (err) {
            console.log(err);
            if (props.onFailure) props.onFailure(err);
        }
    };

    const confirmBatch = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            if (isSubmited && props.batch.onChainId != undefined) {
                await Web3Batch.confirmBatch(props.batch.group, props.batch.onChainId);
            }
            if (props.onSuccess) props.onSuccess();
        } catch (err) {
            if (props.onFailure) props.onFailure(err);
        }
    };

    const rejectBatch = async () => {
        try {
            if (props.onSubmit) props.onSubmit();
            if (isSubmited && props.batch.onChainId != undefined) {
                await Web3Batch.rejectBatch(props.batch.group, props.batch.onChainId);
            }
            if (props.onSuccess) props.onSuccess();
        } catch (err) {
            if (props.onFailure) props.onFailure(err);
        }
    };

    return (
        <>
            {props.batch && (
                <div className={styles.container}>
                    {props.batch.onChainId != undefined && (
                        <div className={styles.id}>
                            {'#'}{props.batch.onChainId}
                        </div>
                    )}
                    <div className={styles.title}>
                        {props.batch.regNo}
                    </div>
                    <div className={styles.text}>
                        <div>{'Group: '}{props.batch.group}</div>
                        <div>{'Total Certificates: '}{props.batch.certificates.length}</div>
                        {props.batch.creator && (
                            <div>
                                {'Created By: '}
                                <TextShortCut
                                    text={props.batch.creator}
                                    to={`/accounts/${props.batch.creator}`}
                                />
                            </div>
                        )}
                    </div>
                    {!props.batch.issued && props.groups.includes(props.batch.group) && (
                        <div className={styles.submit}>
                            {!isSubmited && (
                                <SubmitButton
                                    title={'Submit'}
                                    onClick={submitBatch}
                                />
                            )}
                            {isSubmited && (
                                <ConfirmationPane
                                    onConfirm={confirmBatch}
                                    onReject={rejectBatch}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default BatchInfo;