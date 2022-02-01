import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { DatumType, NewsType } from '../../common/models/News';
import styles from './index.module.scss';


interface NewsIconProps {
    type?: NewsType;
    datum?: DatumType;
    icon?: string;
    title?: string;
    hoverTitle?: string;
    url?: string;
    special?: boolean;
    highlight?: boolean;
    warnable?: boolean;
    onClick?: () => void;
}

const NewsIcon = (props: NewsIconProps) => {
    const navigate = useNavigate();

    const getTitle = () => {
        if (props.type === NewsType.GROUP_CREATED) {
            return `Group #${props.datum} has been created.`;
        }
        if (props.type === NewsType.BATCH_CREATED) {
            return `Batch #${props.datum} has been created.`;
        }
        return props.title;
    };

    const getUrl = () => {
        if (props.type === NewsType.GROUP_CREATED) {
            return `/groups/${props.datum}`;
        }
        return props.url;
    };

    const getHoverTitle = () => {
        if (!props.hoverTitle) {
            return props.warnable ? 'Verify now!' : 'Check it now!';
        }
        return props.hoverTitle;
    }

    return (
        <div className={classNames(styles.container, {
            [styles.special]: props.special,
            [styles.highlight]: props.highlight,
            [styles.warning]: props.warnable
        })} onClick={() => {
            if (props.onClick) props.onClick();
            const url = getUrl();
            if (url) navigate(url);
        }}>
            {props.icon && (
                <img src={props.icon} />
            )}
            <div className={styles.title}>{getTitle()}</div>
            <div className={styles.hidden}>{getHoverTitle()}</div>
        </div>
    );
};

export default NewsIcon;