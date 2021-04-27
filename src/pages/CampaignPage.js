import React from 'react'
import '../App.css';
// import app from '../firebase';
import NewCampaign from '../components/NewCampaign/NewCampaign'
function CampaginPage() {
    // const db = app.firestore();

    return (
        <>
            <NewCampaign></NewCampaign>
        </>
    )
}

export default CampaginPage;