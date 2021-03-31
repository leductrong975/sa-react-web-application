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
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup, login } = useAuth();
    const history = useHistory();

    const alternative = props.label === 'Sign Up' ?
        [
            'Already have an account?',
            '/log-in',
            'Log In'
        ] :
        [
            'Don\'t have an account?',
            '/sign-up',
            'Sign Up'
        ]

    const signUpCheck = () =>
        new RegExp('[a-z]').test(passwordRef.current.value) &&
        new RegExp('[A-Z]').test(passwordRef.current.value) &&
        new RegExp('[0-9]').test(passwordRef.current.value) &&
        8 <= passwordRef.current.value.length <= 20


    const passwordConformationCheck = () =>
        passwordRef.current.value === passwordConfirmRef.current.value

    const showPassword = () => setCheck(!check)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            if (props.label !== 'Sign Up') {
                setLoading(true)
                await login(emailRef.current.value, passwordRef.current.value)
                setLoading(false)
                history.push('/')

            }
            if (!passwordConformationCheck()) {
                setError('Password Conformation does not match!')
                return
            }
            if (!signUpCheck()) {
                setError('Password does not meet requirements')
                return
            }
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
            history.push('/')
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

                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Password</label>
                        <input className='Field' type={check ? 'text' : 'password'} placeholder='Password' ref={passwordRef} required />
                        {props.label === 'Sign Up' && <div className="PasswordRequirement">Use 8 characters or more with mix of characters and numbers</div>}
                    </div>

                    {props.label === 'Sign Up' &&
                        <div className='InputFieldContainer'>
                            <label className='InputLabel'>Password Confirmation</label>
                            <input className='Field' type={check ? 'text' : 'password'} placeholder='Password Confirmation' ref={passwordConfirmRef} required />
                        </div>}

                    <div className="ShowPassword">
                        <input type="checkbox" defaultChecked={check} onChange={showPassword} />
                        <label>Show Password</label>
                    </div>

                    <div className='PasswordError'>{error}</div>

                    <div className='InputFieldContainer'>
                        <button disabled={loading} buttonStyle='btn--primary' type='submit'>{props.label}</button>
                    </div>

                    <div className='AuthText'>
                        {alternative[0]} <Link to={alternative[1]}>{alternative[2]}</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthForm
