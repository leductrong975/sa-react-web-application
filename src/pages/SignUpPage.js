import React from 'react';
import FormSignUp from '../components/FormSignUp/FormSignUp';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { Link, useHistory } from 'react-router-dom';


function SignUpPage() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();
    const { signup } = useAuth();
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
            setError('Failed to sign up');
        }
        setLoading(false);
    }

    const div = () => <div className='AuthText'>
        Already have an account? <Link to="/log-in">Log In</Link>
    </div>

    return (
        <>
            <FormSignUp
                error={error}
                handleSubmit={handleSubmit}
                emailRef={emailRef}
                passwordRef={passwordRef}
                passwordConfirmRef={passwordConfirmRef}
                loading={loading}
                label={'Sign Up'}
                div={div}
            />
            {/* <div className='AuthText'>
                Already have an account? <Link to="/log-in">Log In</Link>
            </div> */}
        </>


    )
}

export default SignUpPage
