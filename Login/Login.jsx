import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Model from '../src/Models/Model.jsx'; // Import the 3D Model component

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please enter your username, email, and password.');
      return;
    }
    const otpGenerated = generateOtp();
    setOtp(otpGenerated);
    const hiddenPassword = '******';
    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('message', `Password: ${hiddenPassword}, OTP: ${otpGenerated}`);
    formData.append('access_key', '12f8b399-38e3-49b3-8da0-46585341e54f'); // Replace with actual access key

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert(`OTP sent to your email: ${otpGenerated}`);
          setOtpSent(true);
        } else {
          alert('Something went wrong. Please try again.');
        }
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '') {
      alert('Please enter the OTP received in your email.');
      return;
    }
    alert('OTP verification is handled via email. Please check your inbox.');
    navigate('/app');
  };

  const handleBackButtonClick = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setOtpSent(false);
    setOtp('');
  };

  return (
    <div className="Login-container">
      {/* Flexbox container holding both login form and 3D model */}
      <div className="Login-content">
        <div className="Login">
          <h1 className="H1">Login</h1>

          <form onSubmit={handleLogin}>
            {/* Username Input Field */}
            <h3 className="U">USERNAME</h3>
            <input
              className="textarea-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Email Input Field */}
            <h3 className="E">EMAIL</h3>
            <input
              className="textarea-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input Field */}
            <h3 className="P">PASSWORD</h3>
            <input
              className="textarea-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="login-btn" type="submit">Get OTP</button>
          </form>

          {/* Display OTP input field after OTP is sent */}
          {otpSent && (
            <form onSubmit={handleOtpSubmit}>
              <input
                className="OTP"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button className="Submit" type="submit">Submit OTP</button>
            </form>
          )}

          {/* Back button */}
          <button className="Back" onClick={handleBackButtonClick} style={{ marginTop: '10px', backgroundColor: '#ff468d', color: '#fff' }}>
            Back
          </button>
        </div>

        {/* 3D Model placed on the right side */}
        <div className="model-container">
          {/* <Model /> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
