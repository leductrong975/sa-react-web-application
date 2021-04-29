import React from 'react'
import '../App.css';
import Campaign from '../components/Campaign/Campaign';
import CampaignCards from '../components/CampaignCards/CampaignCards';
import Footer from '../components/Footer/Footer';

function HomePage() {
    return (
        <>
            <Campaign />
            <CampaignCards />
            <Footer />
        </>
    )
}

export default HomePage
