import React from 'react'
import CardItem from './CampaignCardItem/CampaignCardItem';
import './CampaignCard.css';

function Cards() {
    return (
        <div className='cards'>
            <h1>OUR RECENTLY SOCIAL AWARENESS CAMPAIGN</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src="images/socialawareness1.jpeg"
                            text="Social Awareness 1"
                            label='Label 1'
                            path='/campaign'
                        />
                        <CardItem
                            src="images/socialawareness2.jpeg"
                            text="Social Awareness 2"
                            label='Label 2'
                            path='/campaign'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                            src="images/socialawareness3.jpeg"
                            text="Social Awareness 3"
                            label='Label 3'
                            path='/campaign'
                        />
                        <CardItem
                            src="images/socialawareness4.jpeg"
                            text="Social Awareness 4"
                            label='Label 4'
                            path='/campaign'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;
