import React from 'react';
import '../../App.css';
import './FormSignUp.css';
import { Link} from 'react-router-dom';


function FormSignUp(props) {
    return (
        <>
            <div className='AuthContainer'>
                <h1>{props.label}</h1>
                {props.error && <alert>{props.error}</alert>}
                <form className='AuthForm' onSubmit={props.handleSubmit}>
                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Email</label>
                        <input className='Field' type='email' placeholder='Email' ref={props.emailRef} required />
                    </div>
                    <div className='InputFieldContainer'>
                        <label className='InputLabel'>Password</label>
                        <input className='Field' type='password' placeholder='Password' ref={props.passwordRef} required />
                    </div>
                    {props.label === 'Sign Up' ? <div className='InputFieldContainer'>
                        <label className='InputLabel'>Password Confirmation</label>
                        <input className='Field' type='password' placeholder='Password Confirmation' ref={props.passwordConfirmRef} required />
                    </div> : null}
                    <div className='InputFieldContainer'>
                        <button disabled={props.loading} buttonStyle='btn--primary' type='submit'>Sign Up</button>
                    </div>
                    {props.label === 'Sign Up' ? <div className='AuthText'>Already have an account? <Link to='/log-in'>Log In</Link></div> :
                        <div className='AuthText'>Don't have an account? <Link to='/sign-up'>Sign Up</Link></div>}
                </form>
            </div>

            {/* <div className='AuthContainer'>
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
            </div> */}
        </>
    )
}

export default FormSignUp
