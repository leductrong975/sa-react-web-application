import React, { useState, useRef } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';

import app from '../firebase';
import 'firebase/firestore';

function AdminOnly() {
    const db = app.firestore();
    const [articles, setArticles] = useState({isLoaded: false, articles: []})
    const getMyArticles = () => {
        db.collection('Articles').limit(8).get().then(docs => {
            let allArticles = []
            docs.forEach(function(doc) {
                const article = {
                    id: doc.id,
                    ...doc.data()
                }
                allArticles.push(article)
            })

            setArticles({
                ...articles,
                isLoaded: true
            });

            setArticles({
                ...articles,
                articles: allArticles
            })
        })
    }
    return (
        <>
            <button onClick={getMyArticles}>Click</button>
            <h1>{console.log(articles.articles)}</h1>
        </>
    )
}

export default AdminOnly;