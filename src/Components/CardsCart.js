import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardsCart({id, image, info, price, name ,addToCart,removeItems}) {
  const navigate = useNavigate() ; 
  const placeOrderButton = (id) => {
   
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = { id, image, info, price, name };
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    removeItems(id) ; 

    navigate("/orders");
  };
  return (
    <div className='card'>
        <img src={image} className='image'></img>
        
        <div className='tour-info'>
          <div className='tour-details'>
              <h4 className='tour-price'>₹ {price}</h4>
              <h4 className='tour-name'>{name}</h4>
              <h4 className='tour-name'>{info}</h4>
              <button onClick={() => removeItems(id)} className='delete-button'>
                Delete <i className="fa-solid fa-trash"></i>
              </button>
              <button  className='delete-button' onClick={()=>placeOrderButton(id)}>
                Checkout
              </button>
          </div>
         
        
        </div>

    </div>
  )
}
