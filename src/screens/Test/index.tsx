import React, { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../../App';
import { SUCCESS } from '../../common/constants/NotificationConstants';
import AuthFilter from '../../components/AuthFilter';
import DropDownMenu from '../../components/DropDownMenu';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import Notification from '../../components/Notification';
import SimpleInput from '../../components/SimpleInput';
import SubmitButton from '../../components/SubmitButton';
import Wallet from '../../web3/Wallet';
import styles from './index.module.scss';


const Test = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const test = async () => {
            try {
                const contract = await Wallet.getContract();
                if (contract) {
                    console.log(await contract.methods.isGroupConfirmed(
                        0
                    ).call());
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (loaded) test();
    }, [loaded]);

    const pushNotification = useContext(NotificationContext);

    const click = () => {
        pushNotification({
            title: 'Test',
            message: 'Hello World!',
            type: SUCCESS,
        });
    };

    return (
        <>
            <GoBackButton text={'Back'} />
            <AuthFilter setLoaded={setLoaded} />
            {
                loaded && (
                    <div className={styles.container}>
                        <LoadingComponent
                            text={'OK!'}
                        />
                        <DropDownMenu
                            text={'Select an option'}
                            options={[
                                'Lorem ipsum dolor sit amet',
                                'Consectetur adipiscing elit',
                                'Integer molestie lorem at massa',
                                'Facilisis in pretium nisl aliquet',
                                'Nulla volutpat aliquam velit',
                                'Phasellus iaculis neque',
                                'Purus sodales ultricies',
                                'Vestibulum laoreet porttitor sem',
                                'Ac tristique libero volutpat at',
                                'Faucibus porta lacus fringilla vel',
                                'Aenean sit amet erat nunc',
                                'Eget porttitor lorem'
                            ]}
                        />
                        <SimpleInput
                            placeholder={'Type something'}
                        />
                        <SubmitButton
                            title={'Submit!'}
                            onClick={click}
                        />
                    </div>
                )
            }
        </>
    );
};

export default Test;