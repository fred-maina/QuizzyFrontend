import React from 'react';
import './feedback.css';
import star from '../../assets/stars-removebg-preview.png';
import John from '../../assets/avatar.jpg';
import Linda from '../../assets/Avatar2.jpg';
import James from '../../assets/3d-illustration-teenager-with-funny-face-glasses.jpg';

function Feedback() {
  return (
    <div className="feedback">
      <h2>What Our Users Say</h2>
      <div>
        <p>
          “Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit. Pellentesque ultricies ligula sed ultrices 
          dapibus. Quisque risus nulla, egestas ac maximus at,
          pretium vel ante. Praesent ut ante neque. Nullam 
          tempor.”
        </p>
        <img src={star} alt="Star Rating" className="stars" />
        <img src={Linda} alt="Linda Brown" className="avatar" />
        <label htmlFor="">Linda Brown</label>
      </div>
      <div>
        <p>
          “Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit. Pellentesque ultricies ligula sed ultrices 
          dapibus. Quisque risus nulla, egestas ac maximus at,
          pretium vel ante. Praesent ut ante neque. Nullam 
          tempor.”
        </p>
        <img src={star} alt="Star Rating" className="stars" />
        <img src={John} alt="John Doe" className="avatar" />
        <label htmlFor="">John Doe</label>
      </div>
      <div>
        <p>
          “Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit. Pellentesque ultricies ligula sed ultrices 
          dapibus. Quisque risus nulla, egestas ac maximus at,
          pretium vel ante. Praesent ut ante neque. Nullam 
          tempor.”
        </p>
        <img src={star} alt="Star Rating" className="stars" />
        <img src={James} alt="James Smith" className="avatar" />
        <label htmlFor="">James Smith</label>
      </div>
    </div>
  );
}

export default Feedback;
