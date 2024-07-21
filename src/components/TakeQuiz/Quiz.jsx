import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const { quizCode } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizCode}/questions/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Quiz not found.');
        }

        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuizData();
  }, [quizCode, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Quiz">
      <h1>{quizData.title}</h1>
      <p>{quizData.description}</p>
      <h3>Questions:</h3>
      <ul>
        {quizData.questions.map((question) => (
          <li key={question.id}>
            <h4>{question.question}</h4>
            <ul>
              {question.choices.map((choice) => (
                <li key={choice.id}>{choice.choice_text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
