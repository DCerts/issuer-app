import React from 'react';
import Web3LoginButton from '../../components/Web3LoginButton';


interface HomeProps {
    setAuthenticated: (authenticated: boolean) => void;
}

const Home = (props: HomeProps) => {
    return (
        <>
            <h1>Sign in with</h1>
            <Web3LoginButton
                setAuthenticated={props.setAuthenticated}
                title={'MetaMask'}
            />
        </>
    );
};

export default Home;