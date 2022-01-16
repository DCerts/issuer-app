import React from 'react';
import { useNavigate } from 'react-router-dom';


interface GoBackIconProps {
    to: string
}

const GoBackButton = (props: GoBackIconProps) => {
    const navigate = useNavigate();

    return (
        <i className='fa-solid fa-arrow-left'
            onClick={() => navigate(props.to)}></i>
    );
};

export default GoBackButton;