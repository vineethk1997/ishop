import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../redux/Actions/productActions';
import Rating from '../Components/Rating';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import './pagecss/productpage.css';

const Productpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="product-screen">
      <Link to="/" className="back-button">← Go Back</Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="product-grid">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-details">
            <h3>{product.name}</h3>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <p><strong>Price:</strong> ₹{product.price}</p>
          </div>

          <div className="product-summary">
            <div className="summary-item">
              <span>Price:</span>
              <strong>₹{product.price}</strong>
            </div>
            <div className="summary-item">
              <span>Status:</span>
              {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
            </div>

            {product.countInStock > 0 && (
              <div className="summary-item">
                <span>Qty:</span>
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className="add-to-cart"
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productpage;
