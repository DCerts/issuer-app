import React from 'react';
import Web3LoginButton from '../../components/Web3LoginButton';


const Home = () => {
    return (
        <>
            <h1>Sign in with</h1>
            <Web3LoginButton title={'MetaMask'} />
        </>
    );
};

export default Home;