import React from 'react';
import './Header.css';
import logo from '../../assets/SecondaryLogo.png'
function Header() {
  return (
    <div>
     <div id="Home" className='Maincontent'>
        <div className='WelcomeMsg'>
        <h1>
        Welcome to Quizzy
        </h1>
        <p>
        Create, share, and take engaging quizzes with ease.
        </p>
      </div>
      
      </div>
      <div className='Logo'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='Cta'>
        <button className='start'>
            Get Started
        </button>
        <button className='learn'>
            Learn More
        </button>
    </div>
    </div>
  );
}

export default Header;
