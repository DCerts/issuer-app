import React, { useState } from 'react';
import Role from '../../common/models/Role';
import AuthFilter from '../../components/AuthFilter';
import GoBackButton from '../../components/GoBackIcon';
import { dashboardRoute } from '../../Routes';


const Newsfeed = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <GoBackButton to={dashboardRoute.path} text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                role={Role.SCHOOL}
                fallbackUrl={dashboardRoute.path}
            />
            {
                loaded && (
                    <></>
                )
            }
        </>
    );
};

export default Newsfeed;