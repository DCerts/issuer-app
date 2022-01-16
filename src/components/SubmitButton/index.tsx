import React from 'react';


interface SubmitButtonProps {
    title: string;
    onClick: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
    return (
        <button onClick={props.onClick}>{props.title}</button>
    );
};

export default SubmitButton;