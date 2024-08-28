import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TakeQuiz.css';
import ProfilePic from '../../assets/Dashboard/account.png';
import {BASE_URL} from '../../config/configure'

const TakeQuiz = () => {
  const [quizCode, setQuizCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Header = () => {
    return (
      <div className="Analytics">
        <div className='Header'>
          <div className='profile'>
            <button onClick={() => {
              // Handle sign-out logic here
              localStorage.removeItem('accessToken');
              navigate('/login');
            }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleInputChange = (event) => {
    setQuizCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const token = localStorage.getItem('access_token'); // Match the key used during login

    if (!token) {
      // Redirect to login page if no token is found
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/quizzes/${quizCode}/`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token to the headers
        },
      });

      if (!response.ok) {
        throw new Error('Quiz Not Found. Kindly enter a valid Quiz Code.');
      }

      // Navigate to the quiz page if the quiz exists
      navigate(`/quiz/${quizCode}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="TakeQuiz">
      <Header />
      <div className="outer-container">
        <div className="container">
          <h2>Enter Quiz Code To Proceed:</h2>
          <form className='form' onSubmit={handleSubmit}>
            <input
              type="text"
              className="quiz-code-input"
              value={quizCode}
              onChange={handleInputChange}
              placeholder="Enter Quiz Code"
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          {error && <div className="error">Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;
