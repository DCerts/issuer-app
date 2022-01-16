import React from 'react';
import styles from './index.module.scss';


const LoadingComponent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>{'Loading...'}</div>
        </div>
    );
};

export default LoadingComponent;