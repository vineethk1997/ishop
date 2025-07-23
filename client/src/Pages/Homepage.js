import React, { useEffect } from 'react';
import Product from '../Components/Product';
import './pagecss/homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/Actions/productActions'; 
import { listproductssearch } from '../redux/Actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useParams } from 'react-router-dom';

const Homepage = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList || {};

  useEffect(() => {
    if (keyword) {
      dispatch(listproductssearch(keyword));
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, keyword]);

  return (
    <div className="home-screen">
      <h1>{keyword ? `Search results for "${keyword}"` : 'Latest Products'}</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-grid-item">
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
