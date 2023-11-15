import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        padding: "10px",
        border: "1px solid #ccc",
        width: "35%",
      }}>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>${item.price}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove from Cart
          </button>
        </div>
      ))}
      <p>Total: ${calculateTotalPrice()}</p>
    </div>
  );
};

export default ShoppingCart;
