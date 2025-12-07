import React from 'react';
import Navbar from '../../shared/navbar/Navbar';
import Banner from '../banner/Banner';

const Home = () => {
    return (
        <>
            <header className='bg-accent py-5'>
                <Navbar/>
                <Banner/>
            </header>
        </>
    );
};

export default Home;