import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import '../App.css';
import ListCampaignItem from '../components/ListCampaignItem/ListCampaignItem';
import app from '../firebase';
import 'firebase/firestore';
import DeleteCampaignModal from "../components/DeleteCampaignModal/DeleteCampaignModal";
import ApproveCampaignModal from "../components/ApproveCampaignModal/ApproveCampaign";

function AdminOnly() {
  const db = app.firestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [removeArticleID, setRemoveArticleID] = useState("");
  const [approveArticleID, setApproveArticleID] = useState("");
  // const history = useHistory();

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
      // console.log(articles.filter(article => article.id !== approveArticleID));
      setArticles(articles.filter(article => article.id !== approveArticleID));
      // console.log(articles);
    }
    // history.push('/adminonly');
    // window.location.reload();
  }

  return (
    <>
      <DeleteCampaignModal
        removeCampaign={removeCampaign}
      />
      <ApproveCampaignModal
        approveCampaign={approveCampaign}
      />
      <div className='cards'>
        <h1>Admin Checking Campaign</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            {isLoaded ?
              articles.length > 0 ?
                articles.map((a, index) => {
                  return (
                    <>
                      {!a.isPublish ?
                        <div className="list__of__campaigns">
                          <ListCampaignItem
                            src={a.featureImage}
                            text={a.content}
                            label={a.title}
                            path={'/adminonly/edit-campaign/' + a.id}
                          >
                          </ListCampaignItem>
                          <span>
                            <button className="button__approve" onClick={() => {
                              setApproveArticleID(a.id);
                              document.getElementsByTagName('body')[0].style.overflow = "hidden";
                              document.getElementById('approveModal').showModal();
                            }}>APPROVE</button>
                            <button className="button__not__approve" onClick={() => {
                              setRemoveArticleID(a.id)
                              document.getElementsByTagName('body')[0].style.overflow = "hidden"
                              document.getElementById('deleteModal').showModal()
                            }}>NOT APPROVE</button>
                          </span>
                        </div>
                        : ''
                      }
                    </>
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
