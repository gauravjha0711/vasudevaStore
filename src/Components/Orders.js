import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import noData from "./noData.jpg"
import User from './User';
import loginBack from "./loginBack12.jpg" 

export default function Orders({isLoggedIn}) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const cancelOrderBtn = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };
  const backToLoginPage = ()=>{
    navigate("/user") ; 
  }

  const backToHomes = () => {
    navigate("/");
  };

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const userLocation = userData.location || 'Location not available';

  return (
    <div className='containers-order'>
      <Navbar />
      {isLoggedIn ? <div className='cards'>
        {orders.length > 0 ? (
          orders.map(({ id, image, info, price, name }) => (
            <div className='card' key={id}>
              <img src={image} className='image' alt={name}></img>
              <div className='tour-info'>
                <div className='tour-details'>
                  <h4 className='tour-price'>₹ {price}</h4>
                  <h4 className='tour-name'>{name}</h4>
                  <h4 className='tour-info'>{info}</h4>
                  <h5>Your Order is in the way </h5>
                  <div className='address-orders'>
                  <h5 >Address :- {userData.address}  PIN :- {userData.pin} House Number :- {userData.houseNo}</h5>
                  
                  </div>

                  <h4>Your order {name} will be deliver within 5 days at your house address{userData.houseNo} ,  {userData.pin} at {userData.address} {userData.location}</h4>
                  <h4>Payment Mode : Cash On Delivery</h4>
                  
                  <button 
                    className='cancel-button' 
                    onClick={() => cancelOrderBtn(id)}
                  >                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div>
         
          <div className='cart-footerFix'>  
          <img src={noData} alt="Random image" />
          <h3>No Orders Yet</h3>
          </div>
          </div>
          
        )}
      </div> : <div className='cards-cart'> 
        <img src={loginBack} alt="Random Image" />
        <button onClick={backToLoginPage} >Login </button>
         </div> }
      
      <button onClick={backToHomes} className="button-back">Go To Home</button>
      <Footer />
    </div>
  );
}
