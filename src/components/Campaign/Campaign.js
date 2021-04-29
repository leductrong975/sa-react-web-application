import React from 'react'
import './Campaign.css';
import '../../App.css';
import { MyButton } from '../MyButton/MyButton';
import 'firebase/firestore';

function Campaign() {
    // const db = app.firestore();
    // const [articles, setArticles] = useState({isLoaded})
    // const getMyArticles = () => {
    //     db.collection('Articles').limit(8).get().then(docs => {
    //         let allArticles = []
    //         docs.forEach(function(doc) {
    //             const article = {
    //                 id: doc.id,
    //                 ...doc.data()
    //             }
    //             allArticles.push(article)
    //         })

    //         this.setState( {
    //             articles: allArticles
    //         }, () => {
    //             this.setState( {
    //                 isLoaded: true
    //             })
    //         })
    //     })
    // }

    return (
        <div className='campaign-container'>
            <video src='/videos/video1.mp4' autoPlay loop muted />
            <h1>SOCIAL AWARENESS</h1>
            <p>What are you waiting for?</p>
            <div className='campaign-buttons'>
                <MyButton className='buttons' buttonSlyle='btn--outline' buttonSize='btn--large'>
                    Join Us
                </MyButton>
                <MyButton className='buttons' buttonSlyle='btn--outline' buttonSize='btn--large'>
                    Watch Trailer <i className='far fa-play-circle' />
                </MyButton>
            </div>
        </div>
    )
}

export default Campaign
