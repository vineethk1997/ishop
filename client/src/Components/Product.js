import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../Components/ComponentCSS/Product.css';



function Product({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-body">
        <Link to={`/product/${product._id}`} className="product-title">
          <strong>{product.name}</strong>
        </Link>

        <div className="product-rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color="#f8e825"
          />
        </div>

        <h3 className="product-price">Rs {product.price}</h3>
      </div>
    </div>
  );
}

export default Product;
