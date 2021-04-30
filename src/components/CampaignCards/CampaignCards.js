import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './CampaignCards.css';
import app from '../../firebase';

function CampaignCards() {
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
      <div className='cards'>
        <h1>OUR RECENTLY SOCIAL AWARENESS CAMPAIGN</h1>
        <div className="cards__container">
          <table className="table__ne">
            <tr className="tr__ne">
              <th className="th__ne">Number</th>
              <th className="th__ne">Image</th>
              <th className="th__ne">Title</th>
              <th className="th__ne">More Information</th>
            </tr>
            {
              isLoaded ?
                articles.length > 0 ?
                  articles.map((a, index) => {
                    return (
                      <>
                        {a.isPublish ?
                          // <ul className="cards__items"> 
                          //     <CardItem 
                          //         src={a.featureImage}
                          //         text={a.content}
                          //         label={a.title}
                          //         path={'/adminonly/edit-campaign/'+a.id}
                          //     >
                          //     </CardItem>
                          // </ul>

                          <tr key={a.id} className="tr__ne">
                            <td className="td__ne">
                              {index + 1}
                            </td>
                            <td className="td__ne">
                              <img src={a.featureImage} className="image__ne" />
                            </td>
                            <td className="td__ne">
                              <p>{a.title}</p>
                            </td>
                            <td className="td__ne">
                              <Link className="cards__item__link" to={'/adminonly/edit-campaign/' + a.id}>
                                Click Here
                              </Link>
                            </td>
                          </tr>
                          : ''
                        }
                      </>
                    )
                  })
                  : <h1>No Campaign Right Now</h1>
                : <h1>Loading</h1>
            }
          </table>
        </div>
      </div>
    </>

    // <div className='cards'>
    //     <h1>OUR RECENTLY SOCIAL AWARENESS CAMPAIGN</h1>
    //     <div className="cards__container">
    //         <div className="cards__wrapper">
    //             <ul className="cards__items">
    //                 <CardItem 
    //                     src="images/socialawareness1.jpeg"
    //                     text="Social Awareness 1"
    //                     label='Label 1'
    //                     path='/campaign'
    //                 />
    //                 <CardItem 
    //                     src="images/socialawareness2.jpeg"
    //                     text="Social Awareness 2"
    //                     label='Label 2'
    //                     path='/campaign'
    //                 />
    //             </ul>
    //             <ul className="cards__items">
    //                 <CardItem 
    //                     src="images/socialawareness3.jpeg"
    //                     text="Social Awareness 3"
    //                     label='Label 3'
    //                     path='/campaign'
    //                 />
    //                 <CardItem 
    //                     src="images/socialawareness4.jpeg"
    //                     text="Social Awareness 4"
    //                     label='Label 4'
    //                     path='/campaign'
    //                 />
    //             </ul>
    //         </div>
    //     </div>
    // </div>
  )
}

export default CampaignCards;
