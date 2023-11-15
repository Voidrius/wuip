import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <img
        style={{
          paddingLeft: "30%",
          scale: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
        }}
        src={product.image}
        alt={product.title}
      />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
