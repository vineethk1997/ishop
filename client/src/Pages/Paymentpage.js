import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import CheckoutSteps from '../Components/CheckoutSteps';
import { savePaymentMethod } from '../redux/Actions/cartActions';
import './pagecss/paymentpage.css';

function Paymentpage() {
  const navigate = useNavigate(); // ✅ Replace history with navigate
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping'); // ✅ Updated from history.push
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder'); // ✅ Updated from history.push
  };

  return (
    <div className="form-container">
      <CheckoutSteps step1 step2 step3 />
      <h2>Select Payment Method</h2>
      <form onSubmit={submitHandler} className="payment-form">
        <div className="form-group">
          <input
            type="radio"
            id="razorpay"
            name="paymentMethod"
            value="Razorpay"
            checked={paymentMethod === 'Razorpay'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="razorpay">Razorpay</label>
        </div>

        <button type="submit" className="btn-primary">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Paymentpage;
