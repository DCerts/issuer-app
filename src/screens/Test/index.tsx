import React, { useEffect, useState } from 'react';
import AuthFilter from '../../components/AuthFilter';
import DropDownMenu from '../../components/DropDownMenu';
import GoBackButton from '../../components/GoBackIcon';
import LoadingComponent from '../../components/LoadingComponent';
import SimpleInput from '../../components/SimpleInput';
import styles from './index.module.scss';


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
                    </div>
                )
            }
        </>
    );
};

export default Test;