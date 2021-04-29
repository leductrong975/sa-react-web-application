import React from 'react'
import '../App.css';
// import app from '../firebase';
import CreateCampaign from '../components/CreateCampaign/CreateCampaign'

function CampaginPage() {
  // const db = app.firestore();

  return (
    <>
      <CreateCampaign />
    </>
  )
}

export default CampaginPage;