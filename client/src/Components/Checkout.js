import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/ComponentCSS/Checkout.css';


function Checkout({ step1, step2, step3, step4 }) {
  return (
    <div className="checkout-steps">
      <div className={step1 ? 'step active' : 'step disabled'}>
        {step1 ? <Link to="/login">Login</Link> : 'Login'}
      </div>
      <div className={step2 ? 'step active' : 'step disabled'}>
        {step2 ? <Link to="/shipping">Shipping</Link> : 'Shipping'}
      </div>
      <div className={step3 ? 'step active' : 'step disabled'}>
        {step3 ? <Link to="/payment">Payment</Link> : 'Payment'}
      </div>
      <div className={step4 ? 'step active' : 'step disabled'}>
        {step4 ? <Link to="/placeorder">Place Order</Link> : 'Place Order'}
      </div>
    </div>
  );
}

export default Checkout;
