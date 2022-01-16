import React, { useState } from 'react';
import GroupAPI from '../../apis/Group';
import Role from '../../common/models/Role';
import AuthFilter from '../../components/AuthFilter';
import GoBackIcon from '../../components/GoBackIcon';
import GroupInfo from '../../components/GroupInfo';
import SubmitButton from '../../components/SubmitButton';
import WalletAPI from '../../web3/WalletAPI';


interface ConfirmGroupProps {
    groupId: number;
}

const ConfirmGroup = (props: ConfirmGroupProps) => {
    const [loaded, setLoaded] = useState(false);
    const backUrl = '/dashboard';

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