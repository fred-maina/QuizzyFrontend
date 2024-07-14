import React, { useState } from 'react';
import './Form.css'; // Import your CSS file
import rogo from '../../assets/MainLogo.png';

const Form = () => {
    const [passwordType, setPasswordType] = useState("password");

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    return (
        <>
            <div className='rogo'><img src={rogo} alt="Logo" /></div>
            <div className="login-container">
                <div className="login-box">
                    <h1>Welcome Back</h1>
                    <p>Please enter your account details</p>
                    <form>
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" />
                        <label>Password</label>
                        <div className="password-container">
                            <input type={passwordType} placeholder="Enter Password" />
                            <i className={`fa ${passwordType === "password" ? "fa-eye" : "fa-eye-slash"}`} onClick={togglePasswordVisibility}></i>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <div className="extra-options">
                        <a href="#">Forgot password?</a>
                        <div className="auth-options">
                            <a href="#"><i className="fab fa-github"></i></a>
                            <a href="#"><i className="fab fa-google"></i></a>
                        </div>
                    </div>
                    <p>No Account? <a href="#">Sign Up</a></p>
                </div>
            </div>
           
        </>
    );
};



export default Form;
