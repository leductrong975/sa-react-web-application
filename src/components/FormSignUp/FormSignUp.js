import React from 'react';
import '../../App.css';
import {useAuth} from '../../contexts/AuthContext/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import './FormSignUp.css';

function FormSignUp() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();
    const {signup} = useAuth();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <>
            <div className='AuthContainer'>
                <h1>Sign Up</h1>
                {error && <alert>{error}</alert>}
                <form className='AuthForm' onSubmit={handleSubmit}>
                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Email</label>       
                        <input className='Field' type='email' placeholder='Email' ref={emailRef} required /> 
                    </div>
                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Password</label>       
                        <input className='Field' type='password' placeholder='Password' ref={passwordRef} required /> 
                    </div>
                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Password Confirmation</label>       
                        <input className='Field' type='password' placeholder='Password Confirmation' ref={passwordConfirmRef} required /> 
                    </div>
                    <div className='InputFieldContainer'>
                        <button disabled={loading} buttonStyle='btn--primary' type='submit'>Sign Up</button>
                    </div>
                </form>
                <div className='AuthText'>Already have an account <Link to='/log-in'>Log In</Link></div>
            </div>
        </>
    )
}

export default FormSignUp
