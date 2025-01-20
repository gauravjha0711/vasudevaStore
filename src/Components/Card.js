import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ShowListings from './ShowListings';
import User from './User';

export default function Card({id, image, info, price, name ,addToCart,isLoggedIn}) {
  const navigate = useNavigate() ; 
  const handleAddToCart = () => {
    const item = { id, image, info, price, name };  
    addToCart(item);  
    console.log(item) ; 
  }
  const navigateToMore = () => {
    navigate("/show", {
      state: { id, image, info, price, name }
    });
  };
  const handleGoBackToLogin = ()=>{
    navigate("/user") ; 
  }
  
  return (
    <div className='card'     >
        <img src={image} className='image' onClick={navigateToMore} ></img>
        
        <div className='tour-info'  >
          <div className='tour-details'>
              <h4 className='tour-price'>₹ {price}</h4>
              <h4 className='tour-name'>{name}</h4>
              <h4 className='tour-name'>{info}</h4>
              {isLoggedIn ?   <button onClick={handleAddToCart}>Add To Cart </button> : 
                <button onClick={handleGoBackToLogin}>Signup / Login </button>}
            
          </div>
         
        
        </div>

    </div>
  )
}
