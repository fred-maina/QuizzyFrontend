import React from 'react';
import './LandingPage.css';
import { Nav, Card, Button, Footer, Header, Feedback} from '../../components';

function LandingPage() {
  return (
    <div className="LandingPage">
      <Nav/>
      <Header />
      <Card />
      <Feedback />
      <Footer />
    </div>
  );
}

export default LandingPage;
