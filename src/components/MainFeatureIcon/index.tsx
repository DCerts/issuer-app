import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';


interface MainFeatureIconProps {
    id?: number | string,
    icon?: string,
    title: string,
    descriptions?: string[],
    to?: string,
    notificationCount?: number
}

const MainFeatureIcon = (props: MainFeatureIconProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container} onClick={() => {
            if (props.to) navigate(props.to);
        }}>
            {props.id && (
                <div className={styles.id}>{'#'}{props.id}</div>
            )}
            <div className={styles.title}>{props.title}</div>
            {props.icon && (
                <img src={props.icon} />
            )}
            {props.descriptions && (
                <div className={styles.descriptions}>
                    {props.descriptions.map((item, index) => (
                        <div className={styles.description} key={index}>{item}</div>
                    ))}
                </div>
            )}
            {props.notificationCount && (
                <div className={styles.notif}>{props.notificationCount}</div>
            )}
        </div>
    )
};

export default MainFeatureIcon;