import React from 'react';
import { useNavigate } from 'react-router-dom';


interface GoBackIconProps {
    text: string,
    to: string
}

const GoBackButton = (props: GoBackIconProps) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(props.to)}>
            {props.text}
        </button>
    );
};

export default GoBackButton;