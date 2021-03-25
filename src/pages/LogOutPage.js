import React from 'react';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';


function LogOutPage() {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  function logOut() {
    logout()
    history.push('/');
  }

  return (
    <>
      <h1>XIN CHAO</h1>
      <h1>{currentUser != null}</h1>
      <button
        onClick={logOut}
      >Log Out</button>

    </>


  )
}

export default LogOutPage
