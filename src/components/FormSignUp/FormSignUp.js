import React from 'react';
import '../../App.css';
import './FormSignUp.css';

function FormSignUp(props) {

    return (
        <>
            <div className='form-container'>
                <alert>{props.error}</alert>
                <form className='form-signup' onSubmit={props.handleSubmit}>
                    <label className='form-item' id='email'>
                        Email
                        <input type='email' ref={props.emailRef} required />
                    </label>
                    <label className='form-item' id='password'>
                        Password
                        <input type='password' ref={props.passwordRef} required />
                    </label>
                    {props.label == 'Sign Up' ? <label className='form-item' id='password-confirm'>
                        Password Confirmation
                        <input type='password' ref={props.passwordConfirmRef} required />
                    </label> : null}
                    <input disabled={props.loading} type='submit' value={props.label}></input>
                </form>

            </div>
        </>
    )
}

export default FormSignUp
