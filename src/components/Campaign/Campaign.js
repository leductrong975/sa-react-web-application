import React, { useContext } from 'react'
import './Campaign.css';
import '../../App.css';
import { MyButton } from '../MyButton/MyButton';
import 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';


function Campaign() {
    const { setPage } = useAuth;
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
    const history = useHistory();
    const onClick = () => {
        setPage('lkvn;lnvlwkkva');
        history.push('/campaign-page-detail');
    };

    return (
        <div className='campaign-container'>
            <video src='/' autoPlay loop muted />
            <h1>SOCIAL AWARENESS</h1>
            <p>What are you waiting for?</p>
            <div className='campaign-buttons'>
                <MyButton className='buttons' buttonSlyle='btn--outline' buttonSize='btn--large' onClick={onClick}>
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
