import React, { useState } from 'react';
import './Form.css'; // Import your CSS file
import rogo from '../../assets/MainLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../config/configure'


const Form = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const handleLogin = async (e) => {

        e.preventDefault();
        const url = `${BASE_URL}/authenticate/auth/token/`;
            
        try {
            const response = await axios.post(`${BASE_URL}/authenticate/auth/token/`, {
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {

            const url = `${BASE_URL}/authenticate/auth/token/`;
            console.log('Request URL:', url);
            
            await axios.post(`${BASE_URL}/authenticate/register/`, {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
            });
            let username= email;
            // Then, log the user in automatically
            const response = await axios.post(`${BASE_URL}/authenticate/auth/token/`, {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setError('');
            navigate('/dashboard'); // Redirect to dashboard or any other page
        } catch (error) {
            console.error('Sign up or login failed', error);
            setError('Registration or login failed. Please try again.');
            setUsername('');
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }
    };

    return (
        <>
            <div className='rogo'><img src={rogo} alt="Logo" /></div>
            <div className="login-container">
                <div className="login-box">
                    {isLogin ? (
                        <>
                            <h1>Welcome Back</h1>
                            <p>Please enter your account details</p>
                            <form onSubmit={handleLogin}>
                                <label>Email/Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter Email/Username"
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
                                <a href="#" onClick={() => setIsLogin(false)}>Forgot password?</a>
                                <div className="auth-options">
                                    <a href="#"><i className="fab fa-github"></i></a>
                                    <a href="#"><i className="fab fa-google"></i></a>
                                </div>
                            </div>
                            <p>No Account? <a href="#" onClick={() => setIsLogin(false)}>Sign Up</a></p>
                        </>
                    ) : (
                        <>
                            <h1>Create an Account</h1>
                            <p>Please fill in the details to sign up</p>
                            <form onSubmit={handleSignUp}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                <button type="submit">Sign Up</button>
                                {error && <div className="error-message">{error}</div>}
                            </form>
                            <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Form;
