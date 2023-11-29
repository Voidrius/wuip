import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../styles/styles.css";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

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
      <h1>Product Details</h1>
      <img src={product.image} alt={product.title} className="detail_image" />
      <p>Title: {product.title}</p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetails;
