import React, { useState } from 'react';
import Data from "./Data.js"; 
import Tours from './Components/Tours';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listings from './Components/Listings.js';
import User from './Components/User.js';
import allData from './Components/allListings.js';
import { SearchProvider } from './Components/SearchContext.js';
import SearchOption from './Components/SearchOption.js';
import Cart from './Components/Cart.js';
import Navbar from './Components/Navbar.js';
import Signup from './Components/Singup.js'; // spelling fix (Signup)
import ShowListings from './Components/ShowListings.js';
import Orders from './Components/Orders.js';

// Functional Component Start
const App = () => {

  // Login State — check if already logged in from localStorage
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Tours data (imported from Data.js)
  const [tours, setTours] = useState(Data);

  // Listings data (imported from allListings.js)
  const [listings, setListings] = useState(allData);

  // Cart state — stores items added by user
  const [cart, setCart] = useState([]);

  // Function: Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function: Remove item from cart by ID
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      {/* SearchProvider se context wrap kiya gaya hai */}
      <SearchProvider>

        {/* BrowserRouter ke andar sabhi routes define honge */}
        <BrowserRouter>

          <Routes>
            {/* Home page — tours list */}
            <Route
              path="/"
              element={
                <Tours
                  tours={tours}
                  addToCart={addToCart}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* All listings page */}
            <Route
              path="/all"
              element={
                <Listings
                  tours={listings}
                  addToCart={addToCart}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* User login page */}
            <Route
              path="/user"
              element={
                <User
                  isLoggedIn={isLoggedIn}
                  setLoggedIn={setLoggedIn}
                />
              }
            />

            {/* Search result page */}
            <Route
              path="/search"
              element={
                <SearchOption
                  addToCart={addToCart}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* Navbar Route (optional for testing) */}
            <Route
              path="/nav"
              element={
                <Navbar
                  carts={cart}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* Cart page */}
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  removeItems={removeFromCart}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* Signup page */}
            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* Show Listings page */}
            <Route
              path="/show"
              element={
                <ShowListings
                  addToCart={addToCart}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* Orders page */}
            <Route
              path="/orders"
              element={<Orders isLoggedIn={isLoggedIn} />}
            />

          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </div>
  );
};

//  Export Component
export default App;
