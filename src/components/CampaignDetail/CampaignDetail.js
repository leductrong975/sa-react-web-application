import React, { useState, useEffect } from 'react';
import './CampaignDetail.css';
import { MyButton } from '../MyButton/MyButton';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../../firebase';

function CampaignDetail() {
  const [data, setData] = useState({});
  const { createUserID } = useParams();

  useEffect(() => {
    // const db = firestore;
    const getData = async () => {
      const campaign = await firestore.collection('Articles').doc(createUserID);
      const docData = (await campaign.get()).data();
      setData(docData);
    }
    getData();
  }, [createUserID]);

  return (
    <>
      <div className="CampaignDetail">
        <img className="CampaignDetailImage" src={data.featureImage} alt="Campaign" />
        <div className="CampaignDetailContent">
          <div className='row'>
            <div className='column1'>
              <h1>{data.title}</h1>
              <div>Campaign Poster</div>
            </div>
            <div className='column2'>
              <MyButton className='buttons' buttonSlyle='btn--outline' buttonSize='btn--large'>
                {auth.currentUser ? 'Join Us' : 'Login to Join'}
              </MyButton>
            </div>

          </div>
          <p>
            {data.content}
          </p>
        </div>
      </div>
    </>
  );
}

export default CampaignDetail;