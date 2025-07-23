import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/Actions/cartActions'
import Message from '../Components/Message' 
import './pagecss/cartpage.css';

function Cartpage() {
  const { id: productId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const qty = new URLSearchParams(location.search).get('qty')
    ? Number(new URLSearchParams(location.search).get('qty'))
    : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/login?redirect=shipping')
    }
  }

  return (
    <div className="cart-screen">
      <div className="cart-left">
        <h3>Shopping Cart</h3>   
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.product} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <p>Rs {item.price}</p>
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCartHandler(item.product)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart-right">
        <h2>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <h3>
          Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
        </h3>
        <button
          className="checkout-button"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  )
}

export default Cartpage
