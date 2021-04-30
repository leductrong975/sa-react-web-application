import React, { useEffect } from 'react';
import './CampaignDetail.css';
import { MyButton } from '../MyButton/MyButton';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import app from '../../firebase';

function CampaignDetail() {
  const [data, setData] = useState({});
  const { createUserID } = useParams();

  useEffect(() => {
    const db = app.firestore();
    const getData = async () => {
      const campaign = await db.collection('Articles').doc(createUserID);
      const docData = (await campaign.get()).data();
      // console.log(docData);
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
                Join Us
              </MyButton>
            </div>

          </div>
          <p>
            {data.content}
          </p>

          {/* <p>Lorem ipsum dolor sit amet, debitis lucilius expetendis eum eu, nec impedit electram ne. Et mazim vivendum vix, quo in inani aliquid accommodare. Cum ut modus atqui ornatus, sint quot commune ne mei. Sit appetere verterem ut, ad erat propriae persequeris usu. Nostro abhorreant ne vis, ex eros posse cum. Ex sit cibo nostro electram, an per omnis utinam commune.

Quot apeirian vivendum at vim, ornatus recteque argumentum vel at. Est dico cotidieque ei. Cum te expetenda torquatos, vix id reque adipisci appellantur. Ignota commodo ex cum, legimus accumsan sit ex, sed in illud solet. Legere commune in vis, no nihil aliquam luptatum vim, causae euripidis ei nam.</p> */}
        </div>

      </div>

    </>
  );
}

export default CampaignDetail;