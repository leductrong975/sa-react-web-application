import React from 'react'
import '../App.css';
import Campaign from '../components/Campaign/Campaign';
import Cards from '../components/Cards/Cards';
import Footer from '../components/Footer/Footer';

function HomePage() {
    return (
        <>
            <Campaign/>
            <Cards/>
            <Footer/>
        </>
    )
}

export default HomePage
