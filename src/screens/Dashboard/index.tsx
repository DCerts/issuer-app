import React, { useState } from 'react';
import MainFeatureIcon from '../../components/MainFeatureIcon';
import { Account, Role } from '../../common/models';
import GoBackIcon from '../../components/GoBackIcon';
import AuthFilter from '../../components/AuthFilter';


const Dashboard = () => {
    const [account, setAccount] = useState<Account>({
        id: '',
        role: Role.ISSUER
    });
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <div>
                <GoBackIcon to={'/'} />
            </div>
            <AuthFilter setLoaded={setLoaded} setAccount={setAccount} />
            {
                loaded && (
                    <>
                        {
                            account.role === Role.SCHOOL && (
                                <MainFeatureIcon
                                    icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                                    title={'Create Group'}
                                    descriptions={[
                                        'Create and manage your own digital assets',
                                        'Create and manage your own digital assets',
                                        'Create and manage your own digital assets'
                                    ]}
                                    to={'/group/create'}
                                />
                            )
                        }
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[
                                'Create and manage your own digital assets',
                                'Create and manage your own digital assets',
                                'Create and manage your own digital assets'
                            ]}
                            to={'/unknown'}
                        />
                        <MainFeatureIcon
                            icon={'https://cdn-icons-png.flaticon.com/128/29/29670.png'}
                            title={'Unknown'}
                            descriptions={[
                                'Create and manage your own digital assets',
                                'Create and manage your own digital assets',
                                'Create and manage your own digital assets'
                            ]}
                            to={'/unknown'}
                        />
                    </>
                )
            }
        </>
    );
};

export default Dashboard;