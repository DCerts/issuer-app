import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';


interface GoBackIconProps {
    text: string,
    to?: string,
    onClick?: () => void,
}

const GoBackButton = (props: GoBackIconProps) => {
    const navigate = useNavigate();

    return (
        <div>
            <button className={styles.button} onClick={() => {
                if (props.onClick) props.onClick();
                if (props.to) navigate(props.to);
            }}>
                {props.text}
            </button>
        </div>
    );
};

export default GoBackButton;