import test from './test.jpg';
import './CampaignDetail.css';
import { MyButton } from '../MyButton/MyButton';
import { useLocation } from 'react-router-dom';
import { React, useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import app, { auth } from '../../firebase';

function CampaignDetail() {
  // const location = useLocation();
  const [data, setData] = useState();
  const db = app.firestore();
  const { currentCampaignPage } = useAuth();
  const getData = async () => {
    const campaign = await db.collection('campaigns').where('createUserID', '==', currentCampaignPage);
    setData(campaign);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="CampaignDetail">
        <img className="CampaignDetailImage" src={test} />
        <div className="CampaignDetailContent">
          <div className='row'>
            <div className='column1'>
              <h1>{data.title}</h1>
              <div>Campaign Poster</div>
            </div>
            <div className='column2'>
              <MyButton className='buttons' buttonSlyle='btn--outline' buttonSize='btn--large'>
                Join Us
              </MyButton>
            </div>

          </div>

          <p>Lorem ipsum dolor sit amet, debitis lucilius expetendis eum eu, nec impedit electram ne. Et mazim vivendum vix, quo in inani aliquid accommodare. Cum ut modus atqui ornatus, sint quot commune ne mei. Sit appetere verterem ut, ad erat propriae persequeris usu. Nostro abhorreant ne vis, ex eros posse cum. Ex sit cibo nostro electram, an per omnis utinam commune.

Quot apeirian vivendum at vim, ornatus recteque argumentum vel at. Est dico cotidieque ei. Cum te expetenda torquatos, vix id reque adipisci appellantur. Ignota commodo ex cum, legimus accumsan sit ex, sed in illud solet. Legere commune in vis, no nihil aliquam luptatum vim, causae euripidis ei nam.</p>
        </div>

      </div>

    </>
  );
}

export default CampaignDetail;