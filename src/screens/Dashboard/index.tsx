import React, { useState } from 'react';
import { Issuer } from '../../apis/Account'


interface DashboardProps {
    account: Issuer | undefined;
}

const Dashboard = (props: DashboardProps) => {
    const [account, setAccount] = useState(props.account);

    return (
        <>
            {
                account && (
                    <h1>Hello {account.id}!</h1>
                )
            }
        </>
    );
};

export default Dashboard;