import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CampaignPage from './pages/CampaignPage';
import LogInPage from './pages/LogInPage';
import LogOutPage from './pages/LogOutPage';
import SignUpPage from './pages/SignUpPage';
import {useAuth} from './contexts/AuthContext/AuthContext';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  const {currentUser} = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar currentUser={currentUser}/>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/aboutus' exact component={AboutUsPage}/>
          <Route path='/campaign' exact component={CampaignPage}/>
          <Route path='/log-in' exact component={LogInPage}/>
          <Route path='/log-out' exact component={LogOutPage}/>
          <Route path='/sign-up' exact component={SignUpPage}/>
          <Route path='/reset-password' exact component={ResetPasswordPage}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
