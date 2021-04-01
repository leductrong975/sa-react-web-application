import React from 'react'
import './Campaign.css';
import '../../App.css';
import { MyButton } from '../MyButton/MyButton';

function Campaign() {
    return (
        <div className='campaign-container'>
            <video src='/' autoPlay loop muted />
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
