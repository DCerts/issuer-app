import React from 'react';
import styles from './index.module.scss';


interface SubmitButtonProps {
    onClick: () => void;
    title?: string;
    confirm?: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
    return (
        <div className={styles.container}>
            <button
                className={
                    props.title ? styles.submit : (
                        props.confirm ? styles.confirm : styles.reject
                    )
                }
                onClick={props.onClick}
            >
                {props.title && (
                    <div className={styles.text}>{props.title}</div>
                )}
            </button>
        </div>
    );
};

export default SubmitButton;