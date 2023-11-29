import React, { useState, useEffect } from "react";
import Link from "next/link";

const Home = () => {
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

      <h1>Home</h1>
      <Link href="/products">
        <p>View Products</p>
      </Link>
    </div>
  );
};

export default Home;
