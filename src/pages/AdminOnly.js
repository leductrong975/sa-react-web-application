import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';

import app from '../firebase';
import 'firebase/firestore';

function AdminOnly() {
    const db = app.firestore();
    const [articles, setArticles] = useState({isLoaded: false, articles: []})

    useEffect(() => {
        getMyArticles()
    }, [])

    const getMyArticles = () => {
        db.collection('Articles').limit(8).get().then(docs => {
            if (!docs.empty) {
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
            } else {
                setArticles({
                    ...articles,
                    isLoaded: true
                });

                setArticles({
                    ...articles,
                    articles: []
                })
            }
            
        })
    }
    return (
        <>
            <button onClick={getMyArticles}>Click</button>
            {
                articles.isLoaded ?
                    articles.articles.length > 0 ?
                        articles.articles.map((a, index) => {
                            return (
                                <tr key={a.id}>
                                    <td>
                                        <span>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {a.title + " / " + a.titleCHI}
                                        </span>
                                    </td>
                                    <td>
                                        <span>

                                            <Link to={{
                                                pathname: '/' + (localStorage.getItem("i18n-lang") === "en" ? "en" : "hk") + "/admin/edit-article/" + a.id,
                                                state: {article: a}
                                            }}>
                                                    <button>
                                                    <svg aria-hidden="true" focusable="false"
                                                            data-prefix="fas" data-icon="edit"
                                                            className="svg-inline--fa fa-edit fa-w-18"
                                                            role="img" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"><path fill="currentColor"
                                                                                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                                                    </svg>
                                                    </button>
                                            </Link>

                                            <Link to={{
                                                pathname: '/' + (localStorage.getItem("i18n-lang") === "en" ? "en" : "hk") + "/article/" + a.id,
                                                state: {article: a}
                                            }}>
                                                    <button className="w-4 h-4 rounded mx-2">
                                                    <svg aria-hidden="true" focusable="false"
                                                            data-prefix="fas" data-icon="external-link-alt"
                                                            className="svg-inline--fa fa-external-link-alt fa-w-16"
                                                            role="img" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"><path fill="currentColor"
                                                                                        d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg>
                                                </button>
                                            </Link>

                                                    <button className="w-4 h-4 rounded mx-2"
                                                    onClick={() => {
                                                        document.getElementsByTagName('body')[0].style.overflow = "hidden"
                                                        document.getElementById('deleteModal').showModal()
                                                    }}
                                                    >
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="trash-alt"
                                                        className="svg-inline--fa fa-trash-alt fa-w-14"
                                                        role="img" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"><path fill="currentColor"
                                                                                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                                </button>


                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                        : "article not found "
                    :
                    "loading"
            }  
        </>
    )
}

export default AdminOnly;

// // <button onClick={getMyArticles}>Click</button>
// // <h1>{console.log(articles.articles)}</h1> 
// import React, {useState, useEffect} from 'react'
// import parse from 'html-react-parser';
// import app from '../firebase';
// const db = app.firestore();
// class AdminOnly extends Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             articles: {},
//             isLoaded: false,
//         }
//         console.log(this.props)
//     }
   
    // useEffect(() => {
    //     if (typeof props.location.state !== 'undefined') {
    //         if(this.props.location.state.hasOwnProperty('articles')){
    //             this.setState({
    //                 articles: this.props.location.state.articles
    //             }, () => {
    //                 this.setState( {
    //                     isLoaded: true
    //                 })
    //             })
    //         }
    //         else {
    //             const 
    //         }
    //     }
    // }, [])
//     componentDidMount() {
//         if (typeof this.props.location.state !== 'undefined') {
//             if(this.props.location.state.hasOwnProperty('articles')){
//                 this.setState({
//                     articles: this.props.location.state.articles
//                 }, () => {
//                     this.setState( {
//                         isLoaded: true
//                     })
//                 })
//             }
//             else {
//                 this.getArticleByID(this.props.match.params.id) 
//             }
//         }
//     }

//     getArticleByID = (aid) => {
//         db.collection('Articles').doc(aid).get().then(doc => {
//             if (doc.exists) {
//                 this.setState({
//                     article: doc.data()
//                 }, () => {
//                     this.setState({
//                         isLoaded: true
//                     })        
//                 })
//             } else {
//                 this.props.history.push({pathname: '/'})
//             }
//         })
//     }

//     timeStampToString = (ts) => {
//         const date = new Date(ts * 1000)
//         return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
//     }

//     render () {
//         if (this.state.isLoaded) {
//             return (
//                 <>
//                     <div className='Article'>
//                         <div className='ImgContainer'>
//                             <img 
//                                 src={''}
//                                 alt={this.state.articles.title}
//                             />
//                             <div className='ArticleInfo'>
//                                 <h1>this.state.articles.title</h1>
//                             </div>
//                         </div>
//                     </div>

//                 </>
//             )
//         }
//     }
// }

