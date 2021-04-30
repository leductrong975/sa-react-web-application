import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import YourCampaigns from './pages/YourCampaigns';
import CreateCampaignPage from './pages/CreateCampaignPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import LogInPage from './pages/LogInPage';
import LogOutPage from './pages/LogOutPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider, useAuth } from './contexts/AuthContext/AuthContext';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminOnly from './pages/AdminOnly';
import AllCampaigns from './pages/AllCampaigns';

function App() {
  const [adminRole, setAdminRole] = useState(false);
  const { currentUser } = useAuth();
  if (currentUser !== null) {
    currentUser.getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims.type === 'administrator') {
        setAdminRole(true);
      }
    })
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar adminRole={adminRole} />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/all-campaigns' exact component={AllCampaigns} />
          {currentUser ? <Route path='/your-campaigns' exact component={YourCampaigns} /> : null}
          {adminRole ? <Route path='/adminonly' exact component={AdminOnly} /> : null}
          <Route path='/create-campaign' exact component={CreateCampaignPage} />
          <Route path='/log-in' exact component={LogInPage} />
          <Route path='/log-out' exact component={LogOutPage} />
          <Route path='/sign-up' exact component={SignUpPage} />
          <Route path='/campaign-page-detail/:createUserID' exact component={CampaignDetailPage} />
          <Route path='/reset-password' exact component={ResetPasswordPage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
