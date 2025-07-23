import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckoutSteps from '../Components/CheckoutSteps';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { createOrder } from '../redux/Actions/orderActions';
import './pagecss/placeorderpage.css';

const PlaceorderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems = [], shippingAddress = {}, paymentMethod } = cart || {};

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error } = orderCreate;

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 50000 ? 0 : 500;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    if (cartItems.length === 0) {
      alert('🛒 Your cart is empty.');
      return;
    }

    if (!paymentMethod || paymentMethod !== 'Razorpay') {
      alert('❌ Only Razorpay is supported right now.');
      return;
    }

    try {
      // Load Razorpay script if not already present
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject('Razorpay SDK failed to load.');
        });
      }

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) {
        alert('🔒 Please login first.');
        return;
      }

      const { data: razorpayOrder } = await axios.post(
        '/api/orders/razorpay',
        { amount: Math.round(totalPrice * 100) },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const options = {
        key: razorpayOrder.key_id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'iShop',
        description: 'Order Payment',
        order_id: razorpayOrder.order_id,
        handler: (response) => {
          dispatch(
            createOrder({
              orderItems: cartItems,
              shippingAddress,
              paymentMethod,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
              razorpayPaymentResult: {
                id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
            })
          );

          alert('✅ Payment successful! Redirecting to homepage...');
          navigate('/');
        },
        prefill: {
          name: shippingAddress.fullName || 'Customer',
          email: shippingAddress.email || 'customer@example.com',
          contact: shippingAddress.phone || '9999999999',
        },
        notes: {
          address: `${shippingAddress.address || ''}, ${shippingAddress.city || ''}`,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (err) => {
        alert(`❌ Payment Failed: ${err.error.description}\nRedirecting to homepage...`);
        navigate('/');
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert('❌ Could not initiate payment.');
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="placeorder">
        <div className="placeorder-left">
          {/* Shipping */}
          <section className="placeorder-section">
            <h2>Shipping</h2>
            {shippingAddress.address ? (
              <p>
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            ) : (
              <Message variant="danger">Shipping address not found.</Message>
            )}
          </section>

          {/* Payment Method */}
          <section className="placeorder-section">
            <h2>Payment</h2>
            <p>
              <strong>Method:</strong> {paymentMethod}
            </p>
          </section>

          {/* Order Items */}
          <section className="placeorder-section">
            <h2>Order Items</h2>
            {cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul>
                {cartItems.map((item, idx) => (
                  <li key={idx} className="order-item">
                    <span>{item.name}</span>
                    <span>
                      {item.qty} × ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Order Summary */}
        <div className="placeorder-right order-summary">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Items:</span>
            <span>₹{itemsPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span>₹{shippingPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax:</span>
            <span>₹{taxPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <strong>Total:</strong>
            <strong>₹{totalPrice.toFixed(2)}</strong>
          </div>

          {/* {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>} */}

          <button
            className="btn-placeorder"
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceorderPage;
