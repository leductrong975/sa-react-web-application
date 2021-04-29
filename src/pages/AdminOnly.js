import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import CardItem from '../components/Cards/CardItem/CardItem';
import app from '../firebase';
import 'firebase/firestore';

function AdminOnly() {
    const db = app.firestore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [articles, setArticles] = useState([])
    const [removeArticleID, setRemoveArticleID] = useState("")

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

    const removeArticle = () => {
        if(removeArticleID !== ''){
            db.collection("Article")
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

    return (
        <>
            {
                isLoaded ?
                    articles.length > 0 ?
                        articles.map((a, index) => {
                            return (
                                <CardItem 
                                    src={a.featureImage}
                                    text={a.content}
                                    label={a.title}
                                    path={'/adminonly/edit-campaign/'+a.id}
                                >
                                </CardItem>
                            )
                        })
                    : "article not found "
                : "loading"
            }
        </>
    )
}

export default AdminOnly;
