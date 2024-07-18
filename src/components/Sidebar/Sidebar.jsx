import React from 'react';
import './Sidebar.css';
import Profile_icon from '../../assets/Dashboard/account.png';
import Graph from '../../assets/Dashboard/data-analytics.png';
import Pencil from '../../assets/Dashboard/edit.png';
import Notification_Icon from '../../assets/Dashboard/bell.png';
import Add from '../../assets/Dashboard/add.png';
import { useState } from 'react';
import Analytics from '../Analytics/Analytics';

const Sidebar = ({ onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState('Analytics');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  return (
    <div className="Sidebar">
      <div className={`Sidebar_item ${selectedItem === 'Analytics' ? 'selected' : ''}`} onClick={() => handleItemClick('Analytics')}>
        <img src={Graph} alt="Analytics" />
        <label>Analytics</label>
      </div>
      <div className={`Sidebar_item ${selectedItem === 'TakeQuiz' ? 'selected' : ''}`} onClick={() => handleItemClick('TakeQuiz')}>
        <img src={Pencil} alt="Take a Quiz" />
        <label>Take a Quiz</label>
      </div>
      <div className={`Sidebar_item ${selectedItem === 'CreateQuiz' ? 'selected' : ''}`} onClick={() => handleItemClick('CreateQuiz')}>
        <img src={Add} alt="Create New Quiz" />
        <label>Create New Quiz</label>
      </div>
      <div className={`Sidebar_item ${selectedItem === 'Notifications' ? 'selected' : ''}`} onClick={() => handleItemClick('Notifications')}>
        <img src={Notification_Icon} alt="Notifications" />
        <label>Notifications</label>
      </div>
      <div className={`Sidebar_item ${selectedItem === 'Profile' ? 'selected' : ''}`} onClick={() => handleItemClick('Profile')}>
        <img src={Profile_icon} alt="Profile" />
        <label>Profile</label>
      </div>
    </div>
  );
};

export default Sidebar;
