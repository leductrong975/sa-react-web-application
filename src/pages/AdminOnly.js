import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import CardItem from '../components/Cards/CardItem/CardItem';
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
        <ul>
            {
                isLoaded ?
                    articles.length > 0 ?
                        articles.map((a, index) => {
                            return (
                                <>
                                    {!a.isPublish ?
                                        <div>
                                            <CardItem 
                                                src={a.featureImage}
                                                text={a.content}
                                                label={a.title}
                                                path={'/adminonly/edit-campaign/'+a.id}
                                            >
                                            </CardItem> 
                                            <span>
                                            <button onClick={() => {
                                                setApproveArticleID(a.id)
                                                document.getElementsByTagName('body')[0].style.overflow = "hidden"
                                                document.getElementById('approveModal').showModal()
                                            }}>APPROVE</button>
                                            <button onClick={() => {
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
        </ul>
        </>
    )
}

export default AdminOnly;
