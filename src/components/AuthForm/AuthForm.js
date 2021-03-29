import React from 'react';
import '../../App.css';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';


function AuthForm(props) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();
    const { signup, login } = useAuth();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    const alternativeChoice = props.label === 'Sign Up' ? 'Already have an account?' : 'Don\'t have an account?'
    const alternativePath = props.label === 'Sign Up' ? '/log-in' : '/sign-up'
    const alternativeLabel = props.label === 'Sign Up' ? 'Log In' : 'Sign Up'

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await props.label === 'Sign Up' ? signup(emailRef.current.value, passwordRef.current.value)
                : login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError(`Failed to ${props.label}`)
        }
        setLoading(false);
    }

    return (
        <>
            <div className='AuthContainer'>
                <h1>{props.label}</h1>
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
                    {props.label === 'Sign Up' &&
                        <div className='InputFieldContainer'>
                            <label className='InputLabel'>Password Confirmation</label>
                            <input className='Field' type='password' placeholder='Password Confirmation' ref={passwordConfirmRef} required />
                        </div>}
                    <div className='InputFieldContainer'>
                        <button disabled={loading} buttonStyle='btn--primary' type='submit'>{props.label}</button>
                    </div>
                    <div className='AuthText'>
                        {alternativeChoice} <Link to={alternativePath}>{alternativeLabel}</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthForm
