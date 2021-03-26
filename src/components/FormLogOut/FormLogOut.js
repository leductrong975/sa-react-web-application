import React from 'react';
import '../../App.css';
import './FormLogOut.css';

function FormSignUp(props) {
    return (
        <>  
            {props.currentUser ? 
                <div className='ProfileContainer'>
                    <img src='/images/anonymous.jpg' alt='profile' className='ProfilePicture'/>
                    <div className='ProfileDetails'>
                        <p>{props.currentUser.email}</p>
                        <button onClick={props.logOut}>Log Out</button>
                    </div>
                </div>
                :
                <div className='ProfileContainer'>
                    <div className='ProfileDetails'>
                        <h1>You have not Log In Yet</h1>
                        <button onClick={props.logIn}>Log In</button>
                    </div>
                </div>
            }
        </>
    )
}

export default FormSignUp
