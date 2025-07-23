import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Components/ComponentCSS/Checkout.css';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="checkout-steps">
      <div className={step1 ? 'active' : ''}>
        {step1 ? (
          userInfo ? (
            <span>Login</span> // already logged in
          ) : (
            <Link to="/login">Login</Link> // not logged in yet
          )
        ) : (
          <span>Login</span>
        )}
      </div>

      <div className={step2 ? 'active' : ''}>
        {step2 ? <Link to="/shipping">Shipping</Link> : <span>Shipping</span>}
      </div>
      <div className={step3 ? 'active' : ''}>
        {step3 ? <Link to="/payment">Payment</Link> : <span>Payment</span>}
      </div>
      <div className={step4 ? 'active' : ''}>
        {step4 ? <Link to="/placeorder">Place Order</Link> : <span>Place Order</span>}
      </div>
    </div>
  );
}

export default CheckoutSteps;
