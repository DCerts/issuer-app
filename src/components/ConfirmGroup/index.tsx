import React, { useState } from 'react';
import GroupAPI from '../../apis/Group';
import Role from '../../common/models/Role';
import AuthFilter from '../AuthFilter';
import GoBackIcon from '../GoBackIcon';
import GroupInfo from '../GroupInfo';
import SubmitButton from '../SubmitButton';
import { dashboardRoute } from '../../Routes';
import WalletAPI from '../../web3/WalletAPI';


interface ConfirmGroupProps {
    groupId: number;
}

const ConfirmGroup = (props: ConfirmGroupProps) => {
    const [loaded, setLoaded] = useState(false);
    const backUrl = dashboardRoute.path;

    const confirmGroup = async () => {
        try {
            await WalletAPI.confirmGroup(props.groupId);
            await GroupAPI.confirmGroup(props.groupId);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <GoBackIcon to={backUrl} text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                role={Role.SCHOOL}
                fallbackUrl={backUrl}
            />
            {
                loaded && (
                    <>
                        <GroupInfo groupId={props.groupId} />
                        <SubmitButton
                            title={'Confirm'}
                            onClick={confirmGroup}
                        />
                    </>
                )
            }
        </>
    );
};

export default ConfirmGroup;