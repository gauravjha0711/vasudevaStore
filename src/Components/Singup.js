import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import userModel from './userModel';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [pin,setPin] = useState("") ; 
  const [address,setAdress] = useState("") ; 
  const [houseNo , setHouseNo] = useState("") ; 
  const navigate = useNavigate() ; 
  const [showPopup, setShowPopup] = useState(false);
  const [password,setPassword] = useState("") ; 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const handleInputName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }
  const handlePhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  }
  const handleLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  }
  const handleInputPassword = (e)=>{
    e.preventDefault() ; 
    setPassword(e.target.value) ; 
  }
  const handleInputPin = (e)=>{
    e.preventDefault() ; 
    setPin(e.target.value) ; 
  }
  const handleInputAddress = (e)=>{
    e.preventDefault() ; 
    setAdress(e.target.value) ; 
  }
  const handleInputhouseNo = (e)=>{
    e.preventDefault() ; 
    setHouseNo(e.target.value) ; 
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  // const handleSubmitFinal = (e)=>{
  //   e.preventDefault() ; 
  //   console.log(`All the details that are filled in the form is :- ${name} , ${email} , ${phone} , ${location}`) ; 
  // }
  // const handleSubmitFinal = async (e) => {
  //   const user = {
  //     name: name,
  //     email: email,
  //     phone: phone,
  //     location: location
  //   }
  //   console.log(`Require user is :- ${user}`);
  //   const response = await fetch(`http://localhost:5000/userInfo/user`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
      // body: JSON.stringify(user)
  //   })
  // }
  const handleSubmitFinal = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior if this function is used in a form event.
  
    const user = {
      name: name,
      email: email,
      phone: phone,
      location: location,
      pin : pin , 
      address : address , 
      houseNo : houseNo , 
      password : password 
    };
    console.log(`Required user is:`, user);
  
    try {
      const response = await fetch('http://localhost:5000/userInfo/users', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body:JSON.stringify(user)
    });
    
    if (!response.ok) {
        console.error("Failed:", response.statusText); 
    } else {
        const data = await response.json();
        console.log("Success:", data);
        navigate("/") ; 
        alert("Signup Successful go back to the login page  and login..")
    } 
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    }
  };
  


  const popupStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '5px',
    fontSize: '18px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f4f7fc', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Navbar />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <div
          className="user-start"
          style={{
            background: '#ffffff',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            width: '380px',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          <h2 className="heading" style={{ fontSize: '28px', marginBottom: '10px', color: '#333' }}>Welcome to SAI STORE</h2>
          <p className="subheading" style={{ color: '#777', fontSize: '16px', marginBottom: '30px' }}>Join us for exclusive updates and offers!</p>

          <form className="user-forms" action='/userInfo/users' method='post' onSubmit={handleSubmitFinal}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={labelStyle}>Enter your name</label>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={handleInputName}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={labelStyle}>Enter your email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleEmail}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="phone" style={labelStyle}>Enter your phone</label>
              <input
                type="tel"
                placeholder="Enter phone"
                name="phone"
                value={phone}
                onChange={handlePhone}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="city" style={labelStyle}>Enter your city / location</label>
              <input
                type="text"
                placeholder="Enter your city"
                name="city"
                value={location}
                onChange={handleLocation}
                required
                style={inputStyle}
              />
            </div>


          <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="city" style={labelStyle}>Enter your Pin Number</label>
              <input
                type="text"
                placeholder="Enter your PinNumber"
                name="pin"
                value={pin} 
                onChange={handleInputPin}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="city" style={labelStyle}>Enter your address</label>
              <input
                type="text"
                placeholder="Enter your address"
                name="address"
                value={address} 
                onChange={handleInputAddress}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="city" style={labelStyle}>Enter your House Number</label>
              <input
                type="text"
                placeholder="Enter your House Number"
                name="address"
                value={houseNo} 
                onChange={handleInputhouseNo}
                required
                style={inputStyle}
              />
            </div>


            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="city" style={labelStyle}>Enter your password</label>
              <input
                type="text"
                placeholder="Enter your password"
                name="password"
                value={password} 
                onChange={handleInputPassword}
                required
                style={inputStyle}
              />
            </div>

            

            <button type="submit" style={buttonStyle}>Sign Up</button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div style={popupStyle}>
          <p>Sign Up Successful!</p>
        </div>
      )}

      <Footer />
    </div>
  );
}

const labelStyle = {
  fontSize: '16px',
  color: '#333',
  fontWeight: '600',
  marginBottom: '8px',
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '16px',
  color: '#333',
  background: '#f9f9f9',
  outline: 'none',
  marginBottom: '18px',
  transition: 'border 0.3s ease, box-shadow 0.3s ease',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '18px',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#45a049',
  transform: 'scale(1.05)',
};

inputStyle[':focus'] = {
  borderColor: '#4CAF50',
  boxShadow: '0 0 5px rgba(76, 175, 80, 0.5)',
};
