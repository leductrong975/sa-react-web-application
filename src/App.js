import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ListCampaigns from './pages/ListCampaigns';
import CampaignPage from './pages/CampaignPage';
import LogInPage from './pages/LogInPage';
import LogOutPage from './pages/LogOutPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider, useAuth } from './contexts/AuthContext/AuthContext';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminOnly from './pages/AdminOnly';
function App() {
  const [adminRole, setAdminRole] = useState(false);
  const { currentUser } = useAuth()
  if (currentUser !== null) {
    currentUser.getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims.type === 'administrator') {
        setAdminRole(true);
      }
    })
  };
  console.log(adminRole);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Navbar currentUser={currentUser} /> */}
        <Navbar adminRole={adminRole}/>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/listcampaigns' exact component={ListCampaigns} />
          {adminRole ? <Route path='/adminonly' exact component={AdminOnly}/> : null}
          <Route path='/campaign' exact component={CampaignPage} />
          <Route path='/log-in' exact component={LogInPage} />
          <Route path='/log-out' exact component={LogOutPage} />
          <Route path='/sign-up' exact component={SignUpPage} />
          <Route path='/reset-password' exact component={ResetPasswordPage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
