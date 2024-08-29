import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateQuiz.css';
import trashIcon from '../../assets/Dustbin.png';
import {BASE_URL} from '../../config/configure'; // Import the BASE_URL

const CreateQuiz = () => {
  const [step, setStep] = useState(1);
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', choices: [{ choiceText: '', isCorrect: false }] }]);
  const [loading, setLoading] = useState(false);
  const [quizCode, setQuizCode] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleQuizNameChange = (e) => setQuizName(e.target.value);
  const handleQuizDescriptionChange = (e) => setQuizDescription(e.target.value);
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };
  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex].choiceText = value;
    setQuestions(newQuestions);
  };
  const handleCorrectAnswerChange = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices.forEach((choice, idx) => {
      choice.isCorrect = idx === choiceIndex;
    });
    setQuestions(newQuestions);
  };
  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', choices: [{ choiceText: '', isCorrect: false }] }]);
  };
  const addChoice = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices.push({ choiceText: '', isCorrect: false });
    setQuestions(newQuestions);
  };
  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };
  const removeChoice = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices = newQuestions[questionIndex].choices.filter((_, cIndex) => cIndex !== choiceIndex);
    setQuestions(newQuestions);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    if (!quizName.trim()) {
      setError('Quiz name is required.');
      return;
    }
    if (!quizDescription.trim()) {
      setError('Quiz description is required.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        setError(`Question ${i + 1} is required.`);
        setLoading(false);
        return;
      }
      for (let j = 0; j < questions[i].choices.length; j++) {
        if (!questions[i].choices[j].choiceText.trim()) {
          setError(`Choice ${j + 1} in Question ${i + 1} is required.`);
          setLoading(false);
          return;
        }
      }
    }

    const quizData = {
      title: quizName,
      description: quizDescription,
      questions: questions.map((q) => ({
        question_text: q.questionText,
        choices: q.choices.map((c) => ({
          choice_text: c.choiceText,
          is_correct: c.isCorrect,
        })),
      })),
    };

    try {
      const response = await fetch(`${BASE_URL}/api/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();
      if (response.ok) {
        setQuizCode(data.quiz_code);
      } else {
        console.error('Failed to create quiz:', data);
        setError('Failed to create quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the quiz.');
    } finally {
      setLoading(false);
    }
  };

  if (quizCode) {
    return (
      <div className="CreateQuiz">
        <div className="success-message">
          <h2>Quiz Created Successfully</h2>
          <p>Your quiz has been successfully created!</p>
          <p>Quiz Code: <strong>{quizCode}</strong></p>
          <p>Quiz Link: <a href={`${BASE_URL}/quiz/${quizCode}`}>{BASE_URL.replace(/^https?:\/\//, '')}/quiz/{quizCode}</a></p>
          <div className="btn-group">
            <button
              onClick={() => navigator.clipboard.writeText(quizCode)}
              className="btn btn-primary"
            >
              Copy Code
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/quiz/${quizCode}`)}
              className="btn btn-secondary"
            >
              Copy Link
            </button>
          </div>
          <div className="btn-group">
            <a href="/dashboard" className="btn btn-primary">Go back to Dashboard</a>
            <a href="/create" className="btn btn-secondary">Create New Quiz</a>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="CreateQuiz step-container">
        <h1>Create Your Quiz</h1>
        <p> Please Provide a Quiz Name and a description of your quiz to continue</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleNextStep}>
          <div className="form-group">
            <label htmlFor="quizName">Quiz Name</label>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={handleQuizNameChange}
              className={`form-control ${quizName.trim() ? 'is-valid' : 'is-invalid'}`}
              placeholder="Enter quiz name"
            />
            <div className="valid-feedback">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="invalid-feedback">
              <i className="fas fa-times-circle"></i> Quiz name is required.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="quizDescription">Quiz Description</label>
            <textarea
              id="quizDescription"
              value={quizDescription}
              onChange={handleQuizDescriptionChange}
              className={`form-control ${quizDescription.trim() ? 'is-valid' : 'is-invalid'}`}
              placeholder="Enter quiz description"
            ></textarea>
            <div className="valid-feedback">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="invalid-feedback">
              <i className="fas fa-times-circle"></i> Quiz description is required.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Next</button>
        </form>
        <div className="progress mt-4">
          <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            Step 1 of 2: Quiz Details
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="CreateQuiz quiz-editor">
        <header>
          <h1>{quizName}</h1>
          <p>{quizDescription}</p>
        </header>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {questions.map((question, qIndex) => (
            <QuestionBlock
              key={qIndex}
              question={question}
              questionIndex={qIndex}
              handleQuestionChange={handleQuestionChange}
              handleChoiceChange={handleChoiceChange}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
              addChoice={addChoice}
              removeChoice={removeChoice}
              removeQuestion={removeQuestion}
            />
          ))}
          <button type="button" onClick={addQuestion} className="btn btn-secondary">Add Question</button>
          <button type="submit" className="btn btn-primary">Create Quiz</button>
        </form>
        {loading && <div className="loading">Loading...</div>}
      </div>
    );
  }

  return null;
};

const QuestionBlock = ({ question, questionIndex, handleQuestionChange, handleChoiceChange, handleCorrectAnswerChange, addChoice, removeChoice, removeQuestion }) => (
  <div className="question-block">
    <div className="form-group">
      <label htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}</label>
      <div className='QuestionInput'>
        <input
          placeholder='Enter Question'
          type="text"
          id={`question-${questionIndex}`}
          value={question.questionText}
          onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          className="form-control questionInput"
        />
        <button type="button" onClick={() => removeQuestion(questionIndex)} className="btn btn-danger remove">
          <img src={trashIcon} alt="Remove Question" />
        </button>
      </div>
    </div>
    {question.choices.map((choice, cIndex) => (
      <div key={cIndex} className="form-group choice-group">
        <input
          placeholder='Enter a choice'
          type="text"
          value={choice.choiceText}
          onChange={(e) => handleChoiceChange(questionIndex, cIndex, e.target.value)}
          className="form-control"
        />
        <input
          type="radio"
          name={`correct-${questionIndex}`}
          checked={choice.isCorrect}
          onChange={() => handleCorrectAnswerChange(questionIndex, cIndex)}
          className="form-check-input"
        />
        <label className="form-check-label">Correct</label>
        <button type="button" onClick={() => removeChoice(questionIndex, cIndex)} className="btn btn-danger remove">
          <img src={trashIcon} alt="Remove Choice" />
        </button>
      </div>
    ))}
    <button type="button" onClick={() => addChoice(questionIndex)} className="btn btn-secondary">Add Choice</button>
  </div>
);

export default CreateQuiz;
