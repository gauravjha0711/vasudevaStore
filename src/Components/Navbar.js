

import React, { useContext } from 'react'
import "./Navbar.css" 
import Image from "./vashu.png"; 
import { useNavigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import Listings from './Listings'
import allData from './allListings' 
import { SearchContext } from './SearchContext'


export default function Navbar({ carts , isLoggedIn }) {
  const { setSearchQuery, setFilteredData } = useContext(SearchContext);
  const [val, setValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = allData.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchQuery(val);
    navigate('/search');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <img src={Image} alt="Vasudeva Stores Logo" />
        <span>Vasudeva Stores</span>
      </div>
      <ul className="navbar-links">
        <li onClick={() => navigate('/')} className="nav-item">
          <i className="fa-solid fa-house"></i> <span>Home</span>
        </li>
        <li onClick={() => navigate('/all')} className="nav-item">
          <i className="fa-solid fa-list-check"></i> <span>Listings</span>
        </li>
        <li className="nav-item">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={val}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </li>
          <li onClick={() => navigate('/cart')} className="nav-item">
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Cart</span>
          <span className="cart-badge">{carts}</span>
        </li>
        <li onClick={() => navigate('/orders')} className="nav-item">
        <i className="fa-solid fa-truck-fast"></i>
          <span>Orders</span>
          <span className="cart-badge">{carts}</span>
        </li>
        
        
        <li onClick={() => navigate('/user')} className="nav-item">
          <i className="fa-solid fa-user"></i> <span>User</span>
        </li>
      </ul>
    </nav>
  );
}
