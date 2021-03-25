import React from 'react';
import FormSignUp from '../components/FormSignUp/FormSignUp';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { Link, useHistory } from 'react-router-dom';


function SignUpPage() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();
    const { signUp } = useAuth();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to sign up');
        }
        setLoading(false);
    }

    return (
        <>
            <FormSignUp
                error={error}
                handleSubmit={handleSubmit}
                emailRef={emailRef}
                passwordRef={passwordRef}
                passwordConfirmRef={passwordConfirmRef}
            />
            <div>
                Already have an account? <Link to="/log-in">Log In</Link>
            </div>
        </>


    )
}

export default SignUpPage
