import React from 'react'
import '../App.css';
import app from '../firebase';

function CampaginPage() {
    const db = app.firestore();

    return (
        <>
            <h1>Our Recently Campaigns</h1>
        </>
    )
}

export default CampaginPage;