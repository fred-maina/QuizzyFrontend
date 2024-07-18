import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { Analytics, CreateQuiz, Notification, Profile, TakeQuiz } from '../../components/index.js';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('Analytics');

  const renderContent = () => {
    switch (selectedItem) {
      case 'Analytics':
        return <Analytics />;
      case 'TakeQuiz':
        return <TakeQuiz />;
      case 'CreateQuiz':
        return <CreateQuiz />;
      case 'Notifications':
        return <Notification />;
      case 'Profile':
        return <Profile />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="Dashboard">
      <Sidebar className="Sidebar" onSelectItem={setSelectedItem} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
