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
  const [emailVerificationSent, setEmailVerificationSent] = useState('');
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
    ];

  const signUpCheck = () =>
    RegExp('[a-z]').test(passwordRef.current.value) &&
    RegExp('[A-Z]').test(passwordRef.current.value) &&
    RegExp('[0-9]').test(passwordRef.current.value) &&
    8 <= passwordRef.current.value.length <= 20;


  const passwordConformationCheck = () =>
    passwordRef.current.value === passwordConfirmRef.current.value;

  const showPassword = () => setCheck(!check);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      if (props.label !== 'Sign Up') {
        setLoading(true);
        const verified = await login(emailRef.current.value, passwordRef.current.value);
        if (!verified) {
          setError('Email is not verified!');
          setLoading(false);
          return;
        }
        setLoading(false);
        history.push('/');
        return;
      }
      if (!passwordConformationCheck()) {
        setError('Password Conformation does not match!');
        return;
      }
      if (!signUpCheck()) {
        setError('Password does not meet requirements');
        return;
      }
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setEmailVerificationSent('A Verification Email has been sent to your inbox!');
      setLoading(false);
    } catch (e) {
      setError(`Failed to ${props.label}! Check your email and password again!`);
      setLoading(false);
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

          {error ? <div className='PasswordError'>{error}</div> : null}
          {emailVerificationSent ? <div className='EmailVerificationSent'>{emailVerificationSent}</div> : null}

          <div className='InputFieldContainer'>
            <button disabled={loading} buttonstyle='btn--primary' type='submit'>{props.label}</button>
          </div>

          {props.label !== 'Sign Up' &&
            <div className='AuthText'>
              Forgot Password? <Link to='/reset-password'>Reset Password</Link>
            </div>
          }
          <div className='AuthText'>
            {alternative[0]} <Link to={alternative[1]}>{alternative[2]}</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default AuthForm;

