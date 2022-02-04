import React from 'react';
import styles from './index.module.scss';


interface SimpleInputProps {
    placeholder: string;
    value?: string;
    type?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const SimpleInput = (props: SimpleInputProps) => {
    return (
        <div className={styles.container}>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e.target.value);
                }}
                onFocus={(e) => {
                    if (props.onFocus) props.onFocus();
                }}
                onBlur={(e) => {
                    if (props.onBlur) props.onBlur();
                }}
            />
        </div>
    );
};

export default SimpleInput;