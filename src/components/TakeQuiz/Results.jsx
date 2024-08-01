import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {BASE_URL} from '../../config/configure'

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, quizCode, totalQuestions } = location.state || {};

  useEffect(() => {
    if (score === undefined || !quizCode || !totalQuestions) {
      navigate('/');
      return;
    }

    const sendResults = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        navigate('/login');
        return;
      }

      const resultData = {
        quiz_code: quizCode,
        score: score,
      };

      try {
        const response = await fetch(`${BASE_URL}/api/results/`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(resultData),
        });

        if (!response.ok) {
          throw new Error('Failed to send results.');
        }

        await response.json();
      } catch (err) {
        console.error(err.message);
      }
    };

    sendResults();
  }, [navigate, score, quizCode, totalQuestions]);

  if (score === undefined || !quizCode || !totalQuestions) {
    return null;
  }

  const scorePercentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="Results">
      <h1>Quiz Results</h1>
      <p>Quiz Code: {quizCode}</p>
      <p>Your Score: {score} / {totalQuestions}</p>
      <p>Score Percentage: {scorePercentage}%</p>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
};

export default Results;
