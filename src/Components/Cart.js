import React from 'react';
import Navbar from './Navbar';
import Card from './Card';
import Footer from './Footer';
import noData from "./noData.jpg"
import CardsCart from './CardsCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart({ cartItems  , removeItems ,isLoggedIn}) {
  const handleRemoveItem = (id) => {
    removeItems(id); 
    toast.success('Item successfully removed!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className='carts' >
      <div>
        <Navbar />
      </div>
      <div className='cart-header'>
      <h2>Your Cart Items are  </h2>
      </div>
      <div className='cards'>
        {cartItems.length > 0 ? (
         
          cartItems.map((item,index)=>(
            
            <div className='cart-removal'> 
            <CardsCart key={index} {...item} removeItems={() => handleRemoveItem(item.id)}  />
          
            </div>
          ))
        ) : <div className='cart-footerFix'>  
          <img src={noData} alt="Random image" />
          <h3>No item in the cart</h3>
          </div>}
      </div>
      <div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
