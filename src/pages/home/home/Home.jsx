import React from 'react';
import Navbar from '../../shared/navbar/Navbar';
import Banner from '../banner/Banner';
import OurProducts from '../ourProducts/OurProducts';
import Footer from '../../shared/footer/Footer';

const Home = () => {
    return (
        <>
            <header className='bg-accent py-5'>
                <Navbar/>
                <Banner/>
            </header>
            <main>
                <OurProducts/>
            </main>
            <Footer/>
        </>
    );
};

export default Home;