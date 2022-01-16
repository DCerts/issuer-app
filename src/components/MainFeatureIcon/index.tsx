import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';


interface MainFeatureIconProps {
    icon: string,
    title: string,
    descriptions: Array<string>,
    to: string,
    notificationCount?: number
}

const MainFeatureIcon = (props: MainFeatureIconProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container} onClick={() => navigate(props.to)}>
            <img src={props.icon} />
            <div>{props.title}</div>
            <div>
                {props.descriptions.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
            {props.notificationCount && (
                <div className={styles.notif}>{props.notificationCount}</div>
            )}
        </div>
    )
};

export default MainFeatureIcon;