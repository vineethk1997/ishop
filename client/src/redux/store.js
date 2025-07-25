import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { productDetailsReducer,
         productListReducer,
          productDeleteReducer,
          productCreateReducer,
          productUpdateReducer,
          productReviewCreateReducer,
          productTopRatedReducer,
        } from './Reducers/productReducer';

import {cartReducer} from './Reducers/cartReducer';

import {userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer, 
      }from './Reducers/userReducer';

import { orderCreateReducer,  
          orderDetailsReducer,
          orderPayReducer,
          orderListMyReducer,
          orderListReducer,
          orderDeliverReducer } from './Reducers/orderReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
});



const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk];

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
