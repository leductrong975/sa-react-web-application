import React, { useState, useRef } from 'react';
import '../../App.css';
import './ResetPassword.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';


function AuthForm(props) {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {resetPassword} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            alert('Email reset password has been seen please check your email')
            emailRef.current.value = '';
        } catch {
            setError(`Failed to ${props.label}`)
        }
    }

    return (
        <>
            <div className='AuthContainer'>
                <h1>{props.label}</h1>
                <form className='AuthForm' onSubmit={handleSubmit}>
                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Email</label>
                        <input className='Field' type='email' placeholder='Email' ref={emailRef} required />
                    </div>

                    <div className='EmailError'>{error}</div>

                    <div className='InputFieldContainer'>
                        <button disabled={loading} buttonStyle='btn--primary' type='submit'>{props.label}</button>
                    </div>

                    <div className='AuthText'>
                        Already have an account? <Link to='/log-in'>Log In</Link>
                    </div>

                    <div className='AuthText'>
                        Don\'t have an account? <Link to='/sign-up'>Sign Up</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthForm
