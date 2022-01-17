import React from 'react';
import styles from './index.module.scss';


interface SimpleInputProps {
    placeholder: string;
    value?: string;
    type?: string;
    onChange: (value: string) => void;
}

const SimpleInput = (props: SimpleInputProps) => {
    return (
        <div className={styles.container}>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

export default SimpleInput;