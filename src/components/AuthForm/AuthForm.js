import React, { useState, useRef } from 'react';
import '../../App.css';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';


function AuthForm(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [passwordError, setPasswordError] = useState('')
    // const [passwordConformationError, setPasswordConformationError] = useState('')

    const alternativeChoice = props.label === 'Sign Up' ? 'Already have an account?' : 'Don\'t have an account?'
    const alternativePath = props.label === 'Sign Up' ? '/log-in' : '/sign-up'
    const alternativeLink = props.label === 'Sign Up' ? 'Log In' : 'Sign Up'

    function signUpCheck() {
        const isOk1 = new RegExp('[a-z]').test(passwordRef.current.value)
        const isOk2 = new RegExp('[A-Z]').test(passwordRef.current.value)
        const isOk3 = new RegExp('[0-9]').test(passwordRef.current.value)
        const isOk4 = new RegExp(`${passwordRef.current.value}{8,20}`).test(passwordRef.current.value)

        return isOk1 && isOk2 && isOk3 & isOk4
    }

    function passwordConformationCheck() {
        return passwordRef.current.value === passwordConfirmRef.current.value
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            if (props.label === 'Sign Up') {
                if (!passwordConformationCheck()) {
                    setPasswordError('Password Conformation does not match!')
                }
                else {
                    if (!signUpCheck()) {
                        setPasswordError('Password does not meet requirements')
                    }
                    else {
                        await signup(emailRef.current.value, passwordRef.current.value)
                        history.push('/')
                    }
                }
            }
            else {
                await login(emailRef.current.value, passwordRef.current.value)
                history.push('/')
            }

        } catch {
            setError(`Failed to ${props.label}`)
        }
        setLoading(false)

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
                            <div className='PasswordError'>{passwordError}</div>
                            {/* <div className='PasswordError'>{passwordConformationError}</div> */}
                        </div>}
                    {/* {passwordError && <div>{passwordError}</div>} */}
                    {/* <div>{passwordError}</div> */}
                    <div className='InputFieldContainer'>
                        <button disabled={loading} buttonStyle='btn--primary' type='submit'>{props.label}</button>
                    </div>
                    {/* <div>{passwordError}</div> */}
                    <div className='AuthText'>
                        {alternativeChoice} <Link to={alternativePath}>{alternativeLink}</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthForm
