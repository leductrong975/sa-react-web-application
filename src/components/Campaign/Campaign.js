import React, { useContext } from 'react'
import './Campaign.css';
import '../../App.css';
import { MyButton } from '../MyButton/MyButton';
import 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';


function Campaign() {
    const { currentCampaignPage, setPage } = useAuth();
    const history = useHistory();

    const onClick = () => {
        setPage('lkvn;lnvlwkkva');
        console.log(currentCampaignPage);
        history.push('/campaign-page-detail/Campaign 3');
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
