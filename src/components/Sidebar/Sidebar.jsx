import React from 'react';
import './Sidebar.css';
import Profile from '../../assets/Dashboard/account.png'
import Graph from '../../assets/Dashboard/data-analytics.png'
import Pencil from '../../assets/Dashboard/edit.png'
import Notification from '../../assets/Dashboard/bell.png'
import Add from '../../assets/Dashboard/add.png'
const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className='Sidebar_item Analytics'>
        <img src={Graph} alt="" />
        <label htmlFor=""> Analytics</label>
      </div>
     
      <div className='Sidebar_item TakeQuiz'>
        <img src={Pencil} alt="" />
        <label htmlFor=""> Take a Quiz</label>
      </div>
      <div className='Sidebar_item Add'>
        <img src={Add} alt="" />
        <label htmlFor=""> Create New Quiz</label>
      </div>
      <div className='Sidebar_item Notifications'>
        <img src={Notification} alt="" />
        <label htmlFor=""> Notifications</label>
      </div>
      <div className='Sidebar_item Profile'>
        <img src={Profile} alt="" />
        <label htmlFor=""> Profile</label>
      </div>
      
    </div>
  );
};

export default Sidebar;
