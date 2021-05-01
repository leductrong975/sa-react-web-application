import React, { useState, useEffect } from 'react';
import '../App.css';
import ListCampaignItem from '../components/ListCampaignItem/ListCampaignItem';
import app from '../firebase';
import 'firebase/firestore';
import Modal from '../components/Modal/Modal';

function AdminOnly() {
  const db = app.firestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [removeArticleID, setRemoveArticleID] = useState("");
  const [approveArticleID, setApproveArticleID] = useState("");

  useEffect(() => {
    const getMyArticles = async () => {
      const docs = await db.collection('Articles').where('isPublish', '==', false).get();
      if (docs.empty) {
        setIsLoaded(true);
        return;
      }
      let allArticles = [];
      docs.forEach(doc => {
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
  const approveCampaign = async () => {
    if (approveArticleID !== '') {
      await db.collection("Articles").doc(approveArticleID).update({
        isPublish: true
      });
      setArticles(articles.filter(article => article.id !== approveArticleID));
    }
  }

  return (
    <>
      <Modal
        callBack={approveCampaign}
        id='approve'
      />
      <Modal
        callBack={removeCampaign}
        id='refuse'
      />
      <div className='cards'>
        <h1>Admin Checking Campaign</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            {isLoaded ?
              articles.length > 0 ?
                articles.map((a, index) => {
                  return (
                    <div key={index}>
                      {!a.isPublish ?
                        <div className="list__of__campaigns">
                          <ListCampaignItem
                            src={a.featureImage}
                            text={a.content}
                            label={a.title}
                            path={'/campaign-page-detail/' + a.id}
                          >
                          </ListCampaignItem>
                          {/* <span> */}
                          <button className="button__approve" onClick={() => {
                            setApproveArticleID(a.id);
                            document.getElementsByTagName('body')[0].style.overflow = "hidden";
                            document.getElementById('approve').showModal();
                          }}>APPROVE</button>
                          <button className="button__not__approve" onClick={() => {
                            setRemoveArticleID(a.id)
                            document.getElementsByTagName('body')[0].style.overflow = "hidden"
                            document.getElementById('refuse').showModal();
                          }}>NOT APPROVE</button>
                          {/* </span> */}
                        </div>
                        : ''
                      }
                    </div>
                  )
                })
                : "No article"
              : "loading"}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminOnly;
