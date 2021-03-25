import React from 'react';
import '../../App.css';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import './FormSignUp.css';

function FormSignUp() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();
    const {login} = useAuth();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <>
            <div className='AuthContainer'>
                <form className='AuthForm' onSubmit={handleSubmit}>
                    <div className='InputFieldContainer'>       
                        <input className='Field' type='email' placeholder='Email' ref={emailRef} required >
                                
                        </input>
                        <label className='InputLabel'>Email</label>
                    </div>
                </form>
            </div>
                    
            <div className='form-container'>
                <alert>{error}</alert>
                <form className='form-signup' onSubmit={handleSubmit}>
                    <label className='form-item' id='email'>
                        Email 
                        <input type='email' ref={emailRef} required/>
                    </label>
                    {/* <InputFieldContainer , Field */}
                    
                    <label className='form-item' id='password'>
                        Password
                        <input type='password' ref={passwordRef} required/>
                    </label>
                    <label className='form-item' id='password-confirm'>
                        Password Confirmation
                        <input type='password' ref={passwordConfirmRef} required/>
                    </label>
                    <input disabled={loading} type='submit' value='Sign Up'></input>
                </form>
                <div>
                    Already have an account? <Link to ="/log-in">Log In</Link>
                </div>
            </div>
        </>
    )
}

export default FormSignUp
