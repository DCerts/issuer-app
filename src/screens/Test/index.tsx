import React, { useEffect, useState } from 'react';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';


const Test = () => {
    const [loaded, setLoaded] = useState(false);

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
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {
                loaded && (
                    <LoadingComponent
                        text={'OK!'}
                    />
                )
            }
        </>
    );
};

export default Test;