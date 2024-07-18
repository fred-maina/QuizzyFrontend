import React from 'react';
import './Analytics.css';
import ProfilePic from '../../assets/Dashboard/account.png'
import Card from '../Card/Card';

const Analytics = () => {
  const Header= ()=>{return(
    <div className="Analytics">
      <div className='Header'>
        <h1> Welcome Back Fredrick👋</h1>
        <div className='profile'>
        <img src={ProfilePic} alt="ProfilePic" />
        <button> Sign Out</button>
        </div>
      </div>
    </div>);
  };
  const Card=()=>{
    return(
      <div className='AnalyticsCard'>
        <div className='Total AnalyticsItem'>
          <h1>3</h1>
          <p>Total Quizzes <br/> Created</p>
        </div>
        <div className='People AnalyticsItem'>
          <h1>20</h1>
          <p>Total People
          <br/>  reached</p>
        </div>
        <div className='Questions AnalyticsItem'>
          <h1>300</h1>
          <p>Questions <br/> Answered</p>
        </div>

      </div>

    );
  }
  return (<>
    <Header />
    <Card />
    </>
    
  );
};

export default Analytics;
