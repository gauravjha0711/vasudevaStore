import React, { useState } from 'react';
import Data from "./Data.js" 
import Tours from './Components/Tours';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Listings from './Components/Listings.js';
import User from './Components/User.js';
import allData from './Components/allListings.js';
import { SearchProvider } from './Components/SearchContext.js';
import SearchOption from './Components/SearchOption.js';
import Cart from './Components/Cart.js';
import Navbar from './Components/Navbar.js';
import Singup from './Components/Singup.js';
import ShowListings from './Components/ShowListings.js';
import Orders from './Components/Orders.js';

const App=()=> {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [tours, setTours] = useState(Data);
  const [listings , allListings] = useState(allData ) ; 
  const [cart, setCart] = useState([]);  

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); 
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item=>item.id != id)) ; 
  }
  
  return (
    <div className="App">
      <SearchProvider>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tours tours={tours}  addToCart={addToCart}  isLoggedIn={isLoggedIn}  />}>
        </Route>
        <Route path="/all" element = {<Listings tours={listings}   addToCart={addToCart} isLoggedIn={isLoggedIn} />} ></Route>
        <Route path="/user" element={<User   isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} ></Route>
        <Route path="/search" element={<SearchOption addToCart={addToCart} isLoggedIn={isLoggedIn} />} ></Route>
        <Route path="/nav" element={<Navbar carts={cart}  isLoggedIn={isLoggedIn}  />}></Route>
        <Route path="/cart" element={<Cart cartItems={cart} removeItems={removeFromCart}  isLoggedIn={isLoggedIn}  />}></Route>
        <Route path="/signup" element={<Singup/>}></Route>
        <Route path="/show" element={<ShowListings addToCart={addToCart} isLoggedIn={isLoggedIn} />}></Route>
        <Route path="/orders" element={<Orders  isLoggedIn={isLoggedIn}    />} ></Route>
      </Routes>
      </BrowserRouter>
      </SearchProvider>
      
    </div>
  );
}

export default App;