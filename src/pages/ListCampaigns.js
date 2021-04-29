import React, { useState, useEffect } from 'react';
import '../App.css';
import ListCampaignItem from '../components/ListCampaignItem/ListCampaignItem';
import app from '../firebase';
import 'firebase/firestore';

function ListCampaigns() {
    const db = app.firestore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getMyArticles()
    }, []);

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
                        });
                        // console.log('hi');
                        // console.log(doc.id);
                    });
                    setArticles(allArticles);
                    setIsLoaded(true);
                } else {
                    setArticles([])
                    setIsLoaded(true)
                }
            })
    }

    return (
        <>
            <div className='cards'>
                <h1>OUR RECENTLY SOCIAL AWARENESS CAMPAIGN</h1>
                <div className="cards__container">
                    <div className="cards__wrapper">

                        {
                            isLoaded ?
                                articles.length > 0 ?
                                    articles.map((a, index) => {
                                        return (
                                            <>
                                                {a.isPublish ?
                                                    <ul className="cards__items">
                                                        <ListCampaignItem
                                                            src={a.featureImage}
                                                            text={a.content}
                                                            label={a.title}
                                                            // path={'/adminonly/edit-campaign/'+a.id}
                                                            path={'/campaign-page-detail/' + a.id}
                                                        >
                                                        </ListCampaignItem>
                                                    </ul>
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

export default ListCampaigns;