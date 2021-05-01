import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './CampaignCards.css';
import app from '../../firebase';

function CampaignCards() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const db = app.firestore()
    const getMyArticles = async () => {
      const docs = await db.collection('Articles').limit(10).get();
      if (docs.empty) {
        setIsLoaded(true);
        return;
      }
      let allArticles = [];
      docs.forEach(doc => {
        allArticles.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setArticles(allArticles);
      setIsLoaded(true);
    }
    getMyArticles();
  }, []);

  return (
    <>
      <div className='cards'>
        <h1>OUR RECENTLY SOCIAL AWARENESS CAMPAIGNS</h1>
        <div className="cards__container">
          {isLoaded ?
            articles.length > 0 ?
              <table className="table__ne">
                <tbody>
                  <tr className="tr__ne">
                    <th className="th__ne">Number</th>
                    <th className="th__ne">Image</th>
                    <th className="th__ne">Title</th>
                    <th className="th__ne">More Information</th>
                  </tr>

                  {articles.map((a, index) => {
                    return (
                      a.isPublish ?
                        <tr key={a.id} className="tr__ne">
                          <td className="td__ne">
                            {index + 1}
                          </td>
                          <td className="td__ne">
                            <img src={a.featureImage} alt="Campaign" className="image__ne" />
                          </td>
                          <td className="td__ne">
                            <p>{a.title}</p>
                          </td>
                          <td className="td__ne">
                            <Link className="cards__item__link" to={'/campaign-page-detail/' + a.id}>
                              Click Here
                              </Link>
                          </td>
                        </tr>
                        : ''
                    );
                  })}
                </tbody>
              </table>
              :
              <h1>No Campaign Right Now</h1>
            :
            <h1>Loading</h1>}
        </div>
      </div>
    </>
  )
}

export default CampaignCards;
