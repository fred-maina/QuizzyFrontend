import React, { useState } from 'react';
import './Nav.css';
import logo from '../../assets/MainLogo.png';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Nav">
      <div className="NavLogo">
        <img src={logo} alt="Main Logo" />
      </div>
      <button className="NavToggler" onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`NavItems ${isOpen ? 'open' : ''}`}>
        <button className="NavCloseBtn" onClick={toggleMenu}>
          &times;
        </button>
        <a href="#home" onClick={toggleMenu}>Home</a>
        <a href="#about" onClick={toggleMenu}>About</a>
        <a href="#contact" onClick={toggleMenu}>Contact us</a>
        <button className="signinBtn" onClick={toggleMenu}><a href="/login">Sign In</a></button>
      </div>
    </nav>
  );
}

export default Nav;
