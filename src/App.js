import React from 'react';
import './App.css';
import { LandingPage, Dashboard, SignInSignUp } from './containers';
import { Nav, Header,Card, Button,Feedback, Footer } from './components';


function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
      <Card />
      <Feedback />
    </div>
  );
}

export default App;
