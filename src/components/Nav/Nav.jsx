import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Nav.css';
import logo from '../../assets/MainLogo.png';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

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
        {/* Use navigate function for Sign In button */}
        <button className="signinBtn" onClick={() => navigate('/login')}>Sign In</button>
      </div>
    </nav>
  );
}

export default Nav;
