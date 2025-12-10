import React from 'react';
import Navbar from '../../shared/navbar/Navbar';
import Banner from '../banner/Banner';
import OurProducts from '../ourProducts/OurProducts';

const Home = () => {
    return (
        <>
            <header className='bg-accent py-5'>
                <Navbar/>
                <Banner/>
            </header>
            <main className='bg-accent'>
                <OurProducts/>
            </main>
        </>
    );
};

export default Home;