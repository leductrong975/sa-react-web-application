import React from 'react';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import FormLogOut from '../components/FormLogOut/FormLogOut';

function LogOutPage() {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  function logOut() {
    logout();
    history.push('/');
  }

  function logIn() {
    history.push('/log-in');
  }

  return (
    <>
      {/* <h1>{currentUser ? currentUser.email : 'You are not Login'}</h1>
      {currentUser ? <button
        onClick={logOut}
      >Log Out</button> : <button
        onClick={logIn}
      >Login</button>} */}
      <FormLogOut currentUser={currentUser} logOut={logOut} logIn={logIn} />
    </>
  )
}

export default LogOutPage
