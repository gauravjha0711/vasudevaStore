import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function User({isLoggedIn , setLoggedIn}) {
  // const [isLoggedIn , setLoggedIn] = useState(false) ; 
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setLoggedIn(true);
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      setUserData(storedUserData);
    }
  }, []);

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData([]);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userData', JSON.stringify({}));
    setPopupMessage("Logout Successful!");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); 
    navigate('/'); 
    alert("Logged Out Successfully")  ; 
  };

  const handleSubmitFinals = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/userInfocheckUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Login Successful:', data);
        setLoggedIn(true);
        setUserData(data.user);
        setPopupMessage("Login Successful!");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(data.user));
        navigate('/');
        alert("Loggedin Successfully");
      } else {
        console.error('Login Failed:', data);
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />

      {showPopup && (
        <div style={popupStyle}>
          <p>{popupMessage}</p>
        </div>
      )}

      <div
        className="user-main"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 100px)',
        }}
      >
        {isLoggedIn ? (
          <div className="user-info-container">
            <h2 className="user-info-title">User Information</h2>
            <div className="user-details">
              <h3 className="user-greeting">Hello, {userData.name || 'User'}!</h3>
              <h3 className="user-detail">Email: {userData.email}</h3>
              <h3 className="user-detail">PIN: {userData.pin}</h3>
              <h3 className="user-detail">House No: {userData.houseNo}</h3>
              <h3 className="user-detail">Address: {userData.address}</h3>
              <h3 className="user-detail">Location: {userData.location}</h3>
              <h3 className="user-detail">Phone: {userData.phone}</h3>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div
            className="user-start"
            style={{
              background: '#fff',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              width: '350px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: '#333', fontSize: '28px', marginBottom: '30px' }}>SAI STORE</h2>
            <form className="user-form" onSubmit={handleSubmitFinals}>
              <input
                type="text"
                placeholder="Enter username or email"
                name="email"
                value={email}
                onChange={handleInputEmail}
                required
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleInputPassword}
                required
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>
                Login
              </button>
              <p style={{ fontSize: '14px', color: '#777' }}>
                Don't have an account?{' '}
                <span>
                  <a href="/signup" style={{ color: '#4CAF50', textDecoration: 'none' }}>
                    Signup
                  </a>
                </span>
              </p>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '16px',
  color: '#333',
  marginBottom: '20px',
  background: '#f9f9f9',
  outline: 'none',
  transition: 'border 0.3s ease',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  cursor: 'pointer',
  marginTop: '15px',
  transition: 'background-color 0.3s ease',
};

const popupStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '15px 25px',
  borderRadius: '8px',
  fontSize: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 9999,
};
