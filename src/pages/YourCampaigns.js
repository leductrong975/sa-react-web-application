import React, { useState, useEffect } from 'react';
import '../App.css';
import ListCampaignItem from '../components/ListCampaignItem/ListCampaignItem';
import app from '../firebase';
import 'firebase/firestore';

function ListCampaigns() {
  const db = app.firestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);

  const getMyArticles = async () => {
    // const docs = await db.collection('Articles').limit(10).get();
    const docs = await db.collection('Articles')
      .where('createUserID', '==', app.auth().currentUser.uid)
      .where('isPublish', '==', true).get();
    if (docs.empty) {
      setIsLoaded(true);
      console.log('hi in');
      return;
    }

    let allArticles = [];
    docs.forEach(doc => {
      console.log(doc.data());
      allArticles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setArticles(allArticles);
    setIsLoaded(true);
    // console.log(articles);
  }

  useEffect(() => {
    getMyArticles();
  }, []);

  return (
    <>
      <div className='cards'>
        {/* <h1>OUR RECENTLY SOCIAL AWARENESS CAMPAIGN</h1> */}
        <div className="cards__container">
          <div className="cards__wrapper">
            {
              isLoaded ?
                articles.length > 0 ?
                  articles.map((a, index) => {
                    return (
                      <>
                        <ul className="cards__items">
                          <ListCampaignItem
                            src={a.featureImage}
                            text={a.content}
                            label={a.title}
                            path={'/campaign-page-detail/' + a.id}
                          />
                        </ul>
                      </>
                    )
                  })
                  : 'You have no campaign'
                : "loading"
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCampaigns;