import React from 'react';
import FormSignUp from '../components/FormSignUp/FormSignUp';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';


function LogInPage() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const { login } = useAuth();
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
      <FormSignUp
        error={error}
        handleSubmit={handleSubmit}
        emailRef={emailRef}
        passwordRef={passwordRef}
        passwordConfirmRef={passwordConfirmRef}
        loading={loading}
        label={'Login'}
      />
    </>


  )
}

export default LogInPage
