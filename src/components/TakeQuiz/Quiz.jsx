import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../config/configure'


const Quiz = () => {
  const { quizCode } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        navigate('/login');
        return;
      }
    
      try {
        const response = await fetch(`${BASE_URL}/api/quizzes/${quizCode}/questions/`, {
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

  const handleChoiceChange = (questionId, choiceId) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [questionId]: choiceId,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, quizData.questions.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const calculateScore = () => {
    let score = 0;
    quizData.questions.forEach((question) => {
      const correctChoice = question.choices.find((choice) => choice.is_correct);
      if (correctChoice && selectedChoices[question.id] === correctChoice.id) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const totalQuestions = quizData.questions.length;
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }
     var percentage=Math.floor((score/totalQuestions)*100)
    const submissionData = {
      quiz_code: quizData.quiz_code,
      score: percentage,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/results/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      const result = await response.json();
      navigate('/results', { state: { score, quizCode: quizData.quiz_code, totalQuestions } });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="Quiz">
      {!started ? (
        <div className="intro-card">
          <h1>{quizData.title}</h1>
          <p>{quizData.description}</p>
          <p>Created by: {quizData.quiz_creator_name}</p>
          <p>Number of Questions: {quizData.questions.length}</p>
          <button className="start-button" onClick={() => setStarted(true)}>Start Quiz</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="quiz-card">
          <h1>{quizData.title}</h1>
          <p>{quizData.description}</p>
          <div className="question-container">
            <h3>{currentQuestion.question}</h3>
            <ul>
              {currentQuestion.choices.map((choice) => (
                <li key={choice.id} className="choice-item">
                  <input
                    type="radio"
                    id={`choice-${choice.id}`}
                    name={`question-${currentQuestion.id}`}
                    value={choice.id}
                    checked={selectedChoices[currentQuestion.id] === choice.id}
                    onChange={() => handleChoiceChange(currentQuestion.id, choice.id)}
                  />
                  <label htmlFor={`choice-${choice.id}`} className="choice-label">
                    {choice.choice_text}
                    {selectedChoices[currentQuestion.id] === choice.id && (
                      <span className="tick-mark">✔</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && <button onClick={handlePrevQuestion}>Back</button>}
            {currentQuestionIndex < quizData.questions.length - 1 ? (
              <button onClick={handleNextQuestion}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
