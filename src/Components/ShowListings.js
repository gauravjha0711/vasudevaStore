import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowListings({addToCart , isLoggedIn}) {
    
 const navigate = useNavigate() ; 
  const location = useLocation();
  const { id, image, info, price, name } = location.state || {}; 
  const backToHomes = ()=>{
    navigate("/") ; 
  }

  const handleAddToCarts = () => {
    const item = location.state ; 
    addToCart(item); 
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleGoBackToLogin = ()=>{
    navigate("/user")
  };
  return (
    <div className='showListings' >
        <div>
            <Navbar />
        </div>
        <div className='cards-show'    >
        <img src={image} className='images'></img>
        
        <div className='tour-info'  >
          <div className='tour-details'>
              <h4 className='tour-price'>₹ {price}</h4>
              <h4 className='tour-name'>{name}</h4>
              <h4 className='tour-name'>{info}</h4>
              {isLoggedIn ?   <button onClick={handleAddToCarts}>Add To Cart </button> : 
                <button onClick={handleGoBackToLogin}>Signup / Login </button>}
            
          </div>
        </div>

    </div>
    <button onClick={backToHomes}  className="button-back">Go To Home </button>

      <div>
        <Footer /> 
      </div>
      <ToastContainer />
    </div>
  );
}