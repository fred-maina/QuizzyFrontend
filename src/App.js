import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage, Dashboard, SignInSignUp } from './containers';
import { Results } from './components';
import Quiz from './components/TakeQuiz/Quiz'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInSignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz/:quizCode" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
