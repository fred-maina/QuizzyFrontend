import React from 'react';
import './App.css';
import { LandingPage, Dashboard, SignInSignUp } from './containers';
import { Nav, Header,Card, Button, Footer } from './components';


function App() {
  return (
    <div className="App">
      <Nav />
      <Header />
    </div>
  );
}

export default App;
