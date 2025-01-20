import React, { useContext } from 'react'
import { SearchContext } from './SearchContext'
import allData from './allListings'
import Navbar from './Navbar';
import Footer from './Footer';
import Card from './Card';
import noData from "./noData.jpg"   
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchOption({addToCart , isLoggedIn}) {
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
    const {filteredData} = useContext(SearchContext) ; 
    return (
    <div className='container'>
        <div className='nav-div'>
            <Navbar />
        </div>
        <div className='cards'>
            {filteredData.length > 0   ?  (
                filteredData.map(item => {
                    return <Card key={item.id} {...item}  addToCart={() => handleAddToCart(item)}   isLoggedIn={isLoggedIn}  />
                }) 
            ) : <div className='noData'>
                 <h3>No Data Found </h3>
                <img src={noData} alt="Random image" className='img-noData' />
               
            </div> } 
        </div>
        
        <div>
          <Footer />
        </div>
        <ToastContainer />
    </div>
  )
}
