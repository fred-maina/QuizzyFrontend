import React from 'react';
import './Card.css';
import pencil from '../../assets/PencilIcon.png'
import graph from '../../assets/stats.png'
import grade from '../../assets/test.png'
import time from '../../assets/time-forward.png'

function Card() {
  return (
    <div className="Card">
      <h1> Why Quizzy? </h1>
      <div className='whyQuizzy'>
        <div className='Pencil'>
          <img src= {pencil} alt="" />
          <p>Create engaging quizzes effortlessly with our intuitive interface.</p>
        </div>
        <div className='Graph'>
          <img src={graph} alt="" />
          <p>Gain valuable insights on quiz performance and user engagement."</p>
        </div>
        <div className='Time'>
          <img src={grade} alt="" />
          <p>Save time with automated grading and instant feedback</p>
        </div>
        <div className='time'>
          <img src={time} alt="" />
          <p>Get real-time results and track performance instantly.</p>

        </div>
      </div>
    </div>
  );
}

export default Card;
