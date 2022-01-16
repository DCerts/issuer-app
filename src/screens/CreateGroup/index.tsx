import React, { useState } from 'react';
import GroupAPI from '../../apis/Group';
import AuthFilter from '../../components/AuthFilter';
import Group from '../../common/models/Group';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import WalletAPI from '../../web3/WalletAPI';
import { Role } from '../../common/models';
import GoBackIcon from '../../components/GoBackIcon';


const CreateGroup = () => {
    const [loaded, setLoaded] = useState(false);
    const [groupName, setGroupName] = useState<string>('');
    const [groupThreshold, setGroupThreshold] = useState<number>(0);
    const [groupMembers, setGroupMembers] = useState<string[]>([]);

    const createGroup = async () => {
        try {
            const members = groupMembers.concat([
                "0xd68854490261fa4c155a844db51d39493a9effb1",
                "0xa25ac2bb455d33b0cd2f300024169d31fa4ec366",
                "0xbad35b0833094dd410781585a7f5321654816ab9"
            ]);
            const groupId = await WalletAPI.createGroup(
                groupName,
                members,
                groupThreshold
            );
            if (groupId) {
                const group: Group = {
                    id: groupId,
                    name: groupName,
                    threshold: groupThreshold,
                    members: groupMembers
                };
                await GroupAPI.createGroup(group);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <GoBackIcon to={'/dashboard'} text={'Back'} />
            <AuthFilter
                setLoaded={setLoaded}
                role={Role.SCHOOL}
                fallbackUrl={'/dashboard'}
            />
            {
                loaded && (
                    <>
                        <SimpleInput
                            placeholder={'Name'}
                            onChange={setGroupName}
                        />
                        <SimpleInput
                            placeholder={'Threshold'}
                            onChange={(text) => {
                                setGroupThreshold(Number.parseInt(text));
                            }}
                        />
                        <SubmitButton
                            title='Create'
                            onClick={createGroup}
                        />
                    </>
                )
            }
        </>
    );
};

export default CreateGroup;