import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeProducts } from "../redux/actions";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      dispatch(storeProducts(response.data));
    });
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "80%" }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            width: "350px",
            margin: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
