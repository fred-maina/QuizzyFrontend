import React from 'react';
import './Nav.css';
import logo from '../../assets/MainLogo.png'



function Nav() {
  return (
    <div>
     <nav className="Nav">
    <div className='NavLogo'>
    <img src={logo} alt="Main Logo" />

    </div>
    <div className="NavItems">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact us</a>
          <button className='signinBtn'>
            Sign In
            </button>  
    </div>
     </nav>
    </div>
  );
}

export default Nav;
