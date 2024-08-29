import React from 'react';
import './Header.css';
import Keyboard from '../../assets/Keyboard.jpeg'
import logo from '../../assets/SecondaryLogo.png'
import { useNavigate } from 'react-router-dom';
const Hero = () =>{
  const navigate =useNavigate();
  return (<div>
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
        <img src={logo} loading='lazy' alt="Logo" />
      </div>
      <div className='Cta'>
        <button className='start'onClick={() => navigate('/login')}>
          

            <a href="/login">Get Started</a>
        </button>
        <button className='learn'>
            Learn More
        </button>
    </div>
    </div>);
};

const Steps =()=>{
  return(
    <div className="Create">
      <h1>Create Quizzes In 3 simple Steps.</h1>
      <img src={Keyboard } loading='lazy' alt="Keyboard" />
      <main className='Steps'>
        <div className=' Step StepOne'>
          <button>1</button>
          <h2>Enter Quiz Title and Description</h2>
          <p>
           
            Choose an engaging title that captures the essence of your 
            quiz and Provide a brief overview to give context and set 
            expectations.
          </p>
        </div>
        <div className=' Step StepTwo'>
          <button>2</button>
          <h2>Build The Quiz</h2>
          <p>
            
           Add Questions together with choices also select
           the correct choice.
          </p>
        </div>
        <div className=' Step StepThree'>
          <button>3</button>
          <h2>Share The Quiz Link</h2>
          <p>
            
            Share the Unique quiz link with your audience
            for them to access the newly created Quiz.
          </p>
        </div>

      </main>



    </div>

  );
}


function Header() {
  return (<>
    <Hero />
    <Steps />
    </>
    )
  ;
}

export default Header;
