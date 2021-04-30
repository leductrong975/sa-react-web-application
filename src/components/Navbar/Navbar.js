import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './Navbar.css';

function Navbar(props) {
  const [click, setClick] = React.useState(false);
  const checkingClick = () => setClick(!click);
  const closeMenu = () => setClick(false);
  const { currentUser } = useAuth();

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMenu}>
          PhantomTEC
                    <i className='fab fa-react'></i>
        </Link>
        <div className='menu-icon' onClick={checkingClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMenu}>
              Home
                        </Link>
          </li>
          <li className='nav-item'>
            <Link to='/all-campaigns' className='nav-links' onClick={closeMenu}>
              All Campaigns
                        </Link>
          </li>
          {currentUser ?
            <>
              <li className='nav-item'>
                <Link to='/create-campaign' className='nav-links' onClick={closeMenu}>
                  Create Campaign
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/your-campaigns' className='nav-links' onClick={closeMenu}>
                  Your Campaigns
                </Link>
              </li>
            </>
            : null
          }
          {props.adminRole ?
            <li className='nav-item'>
              <Link to='/adminonly' className='nav-links' onClick={closeMenu}>
                Admin Only
                            </Link>
            </li> : null
          }
          {currentUser ?
            <li className='nav-item'>
              <Link to='/log-out' className='nav-links-mobile' onClick={closeMenu}>
                {currentUser.email}
              </Link>
            </li>
            :
            <li className='nav-item'>
              <Link to='/log-in' className='nav-links-mobile' onClick={closeMenu}>
                Log In
                            </Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
