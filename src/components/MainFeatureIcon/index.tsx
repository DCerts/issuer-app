import React from 'react';
import { useNavigate } from 'react-router-dom';


interface MainFeatureIconProps {
    icon: string,
    title: string,
    description: Array<string>,
    to: string
}

const MainFeatureIcon = (props: MainFeatureIconProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(props.to)}>
            <img src={props.icon} />
            <>{props.title}</>
            <>
                {props.description.map((item, index) => {
                    <>{item}</>
                })}
            </>
        </div>
    )
};

export default MainFeatureIcon;