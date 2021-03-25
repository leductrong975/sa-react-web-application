import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CampaignPage from './pages/CampaignPage';
import LogInPage from './pages/LogInPage';
import LogOutPage from './pages/LogOutPage';
import SignUpPage from './pages/SignUpPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/aboutus' exact component={AboutUsPage}/>
          <Route path='/campaign' exact component={CampaignPage}/>
          <Route path='/log-in' exact component={LogInPage}/>
          <Route path='/log-out' exact component={LogOutPage}/>
          <Route path='/sign-up' exact component={SignUpPage}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
