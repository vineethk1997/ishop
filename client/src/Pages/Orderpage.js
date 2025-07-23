import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../redux/Actions/orderActions'; 
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../redux/constants/orderConstant'; 
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import './pagecss/orderpage.css';


function Orderpage() {
    const { id: orderId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) navigate('/login')

        const loadRazorpayScript = () => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.async = true
            document.body.appendChild(script)
        }

        loadRazorpayScript()

        if (!order || successPay || order._id !== orderId || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, order, orderId, successPay, successDeliver, userInfo, navigate])

    const razorpayHandler = async () => {
        const res = await fetch(`/api/orders/${orderId}/razorpay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        })

        const data = await res.json()

        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID', // replace this
            amount: data.amount,
            currency: data.currency,
            name: 'iShop',
            description: 'Order Payment',
            order_id: data.id,
            handler: function (response) {
                dispatch(payOrder(orderId, response))
            },
            prefill: {
                name: userInfo.name,
                email: userInfo.email,
            },
            notes: {
                address: order.shippingAddress.address,
            },
            theme: {
                color: '#3399cc',
            },
        }

        const razor = new window.Razorpay(options)
        razor.open()
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className="order-page">
            <h1>Order: {order._id}</h1>
            <div className="order-content">
                <div className="order-left">
                    <div className="order-box">
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}
                    </div>

                    <div className="order-box">
                        <h2>Payment</h2>
                        <p><strong>Method:</strong> {order.paymentMethod}</p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}
                    </div>

                    <div className="order-box">
                        <h2>Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message variant='info'>Order is empty</Message>
                        ) : (
                            order.orderItems.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <p>{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="order-right">
                    <div className="order-summary">
                        <h2>Summary</h2>
                        <div className="summary-row">
                            <span>Items:</span>
                            <span>₹{order.itemsPrice}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>₹{order.shippingPrice}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>₹{order.taxPrice}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{order.totalPrice}</span>
                        </div>

                        {!order.isPaid && (
                            <div className="pay-button">
                                {loadingPay && <Loader />}
                                <button onClick={razorpayHandler}>Pay with Razorpay</button>
                            </div>
                        )}

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <div className="admin-button">
                                {loadingDeliver && <Loader />}
                                <button onClick={deliverHandler}>Mark As Delivered</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orderpage
