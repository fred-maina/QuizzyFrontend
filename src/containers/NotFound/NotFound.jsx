import React from 'react';
import './404.css'; // Ensure this file is correctly linked

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-emoji">🚫</div>
                <h1 className="not-found-heading">404 Error!</h1>
                <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
                <p>
                    It seems like the link you followed might be broken or the page has been moved. <br /> 
                    You can go back to the <a className="not-found-link" href="/">homepage</a> or try searching for what you need.
                </p>
            </div>
        </div>
    );
}

export default NotFound;
