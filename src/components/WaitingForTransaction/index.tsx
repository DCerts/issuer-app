import React from 'react';
import styles from './index.module.scss';


interface WaitingForTransactionProps {
    onClick?: () => void;
    children?: React.ReactNode;
}

const WaitingForTransaction = (props: WaitingForTransactionProps) => {
    return (
        <div>
            <div className={styles.blur} />
            <div
                className={styles.container}
                onClick={() => {
                    if (props.onClick) props.onClick();
                }}
            >
                {props.children && (
                    <div className={styles.pane}>
                        {props.children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WaitingForTransaction;