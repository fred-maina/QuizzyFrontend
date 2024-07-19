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
  const IndividualResults =()=>{
    return(
      <div className='IndividualResults'>
        <h1> View Results For Each Quiz</h1>
        <div className='QuizCard'>
          <div QuizCardItem>
          <h1>CED45F- Kenyan Quiz</h1>
          </div>
        </div>


      </div>
    )

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
    <IndividualResults />
    </>
    
  );
};

export default Analytics;
