import React from 'react';
import { useNavigate } from 'react-router-dom';


interface GoBackIconProps {
    text: string,
    to: string
}

const GoBackButton = (props: GoBackIconProps) => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(props.to)}>
                {props.text}
            </button>
        </div>
    );
};

export default GoBackButton;