import React from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = React.useState(false);
    const checkingClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMenu}>
                    PhantomTEC 
                    <i className='fab fa-react'></i>
                </Link>
                <div className='menu-icon' onClick={checkingClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/campaign' className='nav-links' onClick={closeMenu}>
                            Campaign
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/aboutus' className='nav-links' onClick={closeMenu}>
                            About Us
                        </Link>
                    </li>
                    {click ? <li className='nav-item'>
                                <Link to='/log-in' className='nav-links-mobile' onClick={closeMenu}>
                                    Log In
                                </Link>
                            </li>
                            :
                            <li className='nav-item'>
                                <Link to='/log-out' className='nav-links-mobile' onClick={closeMenu}>
                                    Log Out
                                </Link>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
