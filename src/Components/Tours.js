import React from 'react'
import Card from './Card';
import Navbar from './Navbar';
import "./Navbar.css" 
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Tours({tours ,addToCart , isLoggedIn}) {
  const handleAddToCart = (item) => {
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
  return (
    <div className='container'>
        <div className='nav-div'>
            <Navbar />
        </div>
        <div className='cards'>
          {
            tours.map((tour) => {
              return <Card key={tour.id} {...tour}  addToCart={() => handleAddToCart(tour)}  isLoggedIn={isLoggedIn} ></Card>
            })
          }
        </div>
        <div>
          <Footer />
        </div>
        <ToastContainer />
    </div>
  );
}
