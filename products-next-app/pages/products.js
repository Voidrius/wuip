import React, { useState, useEffect } from "react";
import Link from "next/link";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Jarin Tori</h1>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <p>About</p>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <p>Products</p>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1>Products</h1>
      <ul className="product-list">
        {data.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <p>
                <img src={product.image} alt={product.title} />
                <span>{product.title}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
