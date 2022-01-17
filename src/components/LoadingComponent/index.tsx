import React from 'react';
import styles from './index.module.scss';


interface LoadingComponentProps {
    text?: string;
}

const LoadingComponent = (props: LoadingComponentProps) => {
    const defaultText = 'Loading...';

    return (
        <div className={styles.container}>
            <div className={styles.text}>{props.text || defaultText}</div>
        </div>
    );
};

export default LoadingComponent;