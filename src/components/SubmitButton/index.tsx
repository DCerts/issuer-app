import React from 'react';
import styles from './index.module.scss';


interface SubmitButtonProps {
    onClick: () => void;
    title?: string;
    confirm?: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
    const getButtonStyle = () => {
        if (props.title) return styles.submit;
        return props.confirm ? styles.confirm : styles.reject;
    };

    return (
        <div className={styles.container}>
            {!props.title && (
                <div className={styles.hidden}>
                    {props.confirm ? ('Confirm') : ('Reject')}
                </div>
            )}
            <button
                className={getButtonStyle()}
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