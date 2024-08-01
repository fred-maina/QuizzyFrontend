import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';
import ProfilePic from '../../assets/Dashboard/account.png';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../config/configure'

const Analytics = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(5);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format to MM/DD/YYYY, HH:MM AM/PM
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (quizCode) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/quizzes/${quizCode}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete quiz');
      }

      setUserData((prevData) => ({
        ...prevData,
        quiz_details: prevData.quiz_details.filter((quiz) => quiz.quiz_code !== quizCode),
      }));

      console.log(`Quiz with code ${quizCode} deleted successfully`);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = userData.quiz_details.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(userData.quiz_details.length / quizzesPerPage);

  const Header = () => (
    <div className="Header">
      <h1>Welcome Back {userData.names} 👋</h1>
      <div className='profile'>
        <img src={ProfilePic} alt="ProfilePic" />
        <button>Sign Out</button>
      </div>
    </div>
  );

  const IndividualResults = () => (
    <>
      <h1 id='ViewH1'>View Results For Each Quiz</h1>
      <div className='IndividualResults'>
        <div className='QuizCard'>
          {currentQuizzes.length > 0 ? (
            currentQuizzes.map((quiz, index) => (
              <div className="QuizCardItem" key={index}>
                <h1>{quiz.quiz_code} - {quiz.quiz_title}</h1>
                <p>Created on: {formatDate(quiz.quiz_creation_date)}</p>
                <button className="delete-button" onClick={() => handleDelete(quiz.quiz_code)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No quizzes found</p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination-container">
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const CardComponent = () => (
    <div className='AnalyticsCard'>
      <div className='Total AnalyticsItem'>
        <h1>{userData.quiz_details.length}</h1>
        <p>Total Quizzes <br /> Created</p>
      </div>
      <div className='People AnalyticsItem'>
        <h1>{userData.number_of_people}</h1>
        <p>Total People <br /> reached</p>
      </div>
      <div className='Questions AnalyticsItem'>
        <h1>300</h1>
        <p>Questions <br /> Answered</p>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <CardComponent />
      <IndividualResults />
    </>
  );
};

export default Analytics;
