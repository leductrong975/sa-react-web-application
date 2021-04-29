import React, { useState, useEffect } from 'react';
import '../App.css';
import ListCampaignItem from '../components/ListCampaignItem/ListCampaignItem';
import app from '../firebase';
import 'firebase/firestore';
import DeleteCampaignModal from "../components/DeleteCampaignModal/DeleteCampaignModal";
import ApproveCampaignModal from "../components/ApproveCampaignModal/ApproveCampaign";

function AdminOnly() {
    const db = app.firestore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [articles, setArticles] = useState([])
    const [removeArticleID, setRemoveArticleID] = useState("")
    const [approveArticleID, setApproveArticleID] = useState("")

    useEffect(() => {
        getMyArticles()
    })

    const getMyArticles = () => {
        db.collection('Articles')
            .limit(10)
            .get()
            .then(docs => {
                if (!docs.empty) {
                    let allArticles = []
                    docs.forEach(doc => {
                        allArticles.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    setArticles(allArticles)
                    setIsLoaded(true)        
                } else {
                    setArticles([])
                    setIsLoaded(true) 
                }  
            })
    }

    const removeCampaign = () => {
        if(removeArticleID !== ''){
            db.collection("Articles")
                .doc(removeArticleID)
                .delete()
                .then(res=> {
                    let newAllArticles = articles
                    newAllArticles = newAllArticles.filter(e => e.id !== removeArticleID)
                    setArticles(newAllArticles)
                    setRemoveArticleID("")
                })
        }
    }
    const approveCampaign = () => {
        if(approveArticleID !== ''){
            db.collection("Articles")
                .doc(approveArticleID).update({
                    isPublish: true
                })

        }
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
                        { 
                        isLoaded ?
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
                                                        path={'/adminonly/edit-campaign/'+a.id}
                                                    >
                                                    </ListCampaignItem>
                                                    <span>
                                                    <button className="button__approve" onClick={() => {
                                                        setApproveArticleID(a.id)
                                                        document.getElementsByTagName('body')[0].style.overflow = "hidden"
                                                        document.getElementById('approveModal').showModal()
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
                            : "article not found "
                        : "loading"
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminOnly;
