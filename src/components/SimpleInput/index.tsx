import React from 'react';


interface SimpleInputProps {
    placeholder: string;
    value?: string;
    type?: string;
    onChange: (value: string) => void;
}

const SimpleInput = (props: SimpleInputProps) => {
    return (
        <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    );
};

export default SimpleInput;