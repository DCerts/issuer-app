import React from 'react';
import styles from './index.module.scss';


const WaitingForTransaction = () => {
    return (
        <div className={styles.container}>
            <div className={styles.pane} hidden>
                <div className={styles.square}></div>
            </div>
        </div>
    );
};

export default WaitingForTransaction;