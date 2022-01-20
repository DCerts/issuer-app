import React, { useEffect, useState } from 'react';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import { dashboardRoute } from '../../Routes';


const Test = () => {
    const [loaded, setLoaded] = useState(false);
    const text = 'OK!';

    useEffect(() => {
        const test = async () => {
            try {
                console.log('Hello World!');
            } catch (err) {
                console.log(err);
            }
        };

        if (loaded) test();
    }, [loaded]);

    return (
        <>
            <GoBackButton
                to={dashboardRoute.path}
                text={'Dashboard'}
            />
            <AuthFilter setLoaded={setLoaded} />
            {
                loaded && (
                    <LoadingComponent
                        text={text}
                    />
                )
            }
        </>
    );
};

export default Test;