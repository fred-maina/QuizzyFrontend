import React, { useState } from 'react';
import './Form.css'; // Import your CSS file
import rogo from '../../assets/MainLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://quizzy-397771394376.herokuapp.com/authenticate/auth/token/`, {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
        
            localStorage.setItem('refresh_token', response.data.refresh);
            setError('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid username or password. Please try again.');
            setUsername('');
            setPassword('');
        }
    };

    return (
        <>
            <div className='rogo'><img src={rogo} alt="Logo" /></div>
            <div className="login-container">
                <div className="login-box">
                    <h1>Welcome Back</h1>
                    <p>Please enter your account details</p>
                    
                    <form onSubmit={handleLogin}>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <div className="password-container">
                            <input
                                type={passwordType}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <i
                                className={`fa ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        <button type="submit">Login</button>
                        {error && <div className="error-message">{error}</div>}
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
