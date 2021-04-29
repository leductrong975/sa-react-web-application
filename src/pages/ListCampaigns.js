import React, { useState, useEffect } from 'react';
import '../App.css';
import CardItem from '../components/Cards/CardItem/CardItem';
import app from '../firebase';
import 'firebase/firestore';

function ListCampaigns() {
    const db = app.firestore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [articles, setArticles] = useState([])

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

    return (
        <>
            {
                isLoaded ?
                    articles.length > 0 ?
                        articles.map((a, index) => {
                            return (
                                <div>
                                    {a.isPublish ? 
                                        <CardItem 
                                            src={a.featureImage}
                                            text={a.content}
                                            label={a.title}
                                            path={'/adminonly/edit-campaign/'+a.id}
                                        >
                                        </CardItem>
                                        : ''
                                    }
                                </div> 
                            )
                        })
                    : "article not found "
                : "loading"
            }    
        </>
    )
}

export default ListCampaigns;