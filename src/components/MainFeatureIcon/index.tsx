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
            <div>{props.title}</div>
            <div>
                {props.description.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    )
};

export default MainFeatureIcon;