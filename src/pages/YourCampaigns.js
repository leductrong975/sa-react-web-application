import React, { useState, useEffect } from 'react';
import '../App.css';
import ListCampaignItem from '../components/ListCampaignItem/ListCampaignItem';
import app from '../firebase';
import 'firebase/firestore';
import DeleteCampaignModal from "../components/DeleteCampaignModal/DeleteCampaignModal";

function ListCampaigns() {
  const db = app.firestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [removeArticleID, setRemoveArticleID] = useState("");

  useEffect(() => {
    const getMyArticles = async () => {
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
    }
    getMyArticles();
  }, [db]);

  const removeCampaign = async () => {
    if (removeArticleID !== '') {
      await db.collection("Articles").doc(removeArticleID).delete();
      let newAllArticles = articles;
      newAllArticles = newAllArticles.filter(e => e.id !== removeArticleID);
      setArticles(newAllArticles);
      setRemoveArticleID("");
    }
  }

  return (
    <>
      <DeleteCampaignModal
        removeCampaign={removeCampaign}
      />
      <div className='cards'>
        <h1>My Campaigns</h1>
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
                          <span>
                            <div>
                              <h4>Approved Or Not</h4>
                              {a.isPublish ? 
                                <p>Yes</p> : <p>No</p>
                              }
                            </div>
                          
                            <button className="button__not__approve" onClick={() => {
                              setRemoveArticleID(a.id)
                              document.getElementsByTagName('body')[0].style.overflow = "hidden"
                              document.getElementById('deleteModal').showModal()
                            }}>Delete</button>
                          </span>
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