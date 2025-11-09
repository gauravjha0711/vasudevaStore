import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ id, image, info, price, name, addToCart, isLoggedIn }) {
  const navigate = useNavigate();

  // Add item to cart
  const handleAddToCart = () => {
    const item = { id, image, info, price, name };
    addToCart(item);
    console.log("🛒 Added item:", item);
  };

  // Navigate to ShowListings page with product details
  const navigateToMore = () => {
    navigate("/show", {
      state: { id, image, info, price, name },
    });
  };

  // Redirect to login/signup page
  const handleGoBackToLogin = () => {
    navigate("/user");
  };

  return (
    <div className="card">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="image"
        onClick={navigateToMore}
        style={{ cursor: "pointer" }}
      />

      <div className="tour-info">
        <div className="tour-details">
          <h4 className="tour-price">₹ {price}</h4>
          <h4 className="tour-name">{name}</h4>
          <h4 className="tour-name">{info}</h4>

          {/* Conditional Rendering for Login */}
          {isLoggedIn ? (
            <button onClick={handleAddToCart}>Add To Cart</button>
          ) : (
            <button onClick={handleGoBackToLogin}>Signup / Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
