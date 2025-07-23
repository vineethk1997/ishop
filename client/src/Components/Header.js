import React, { useState } from 'react';
import '../Components/ComponentCSS/Header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Actions/userActions';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      navigate(`/search/${trimmedKeyword}`);
    } else {
      navigate('/');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="main_header">
      <ul>
        <li className="iShop">&copy; iShop</li>

        <li>
        {/* /*  <form onSubmit={submitHandler} className="search-form">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Submit
            </button>
          </form> */ }
        </li>

        <div className="header_links">
          <li>
            <Link to="/cart">
              <span className="shopping_cart">
                <ShoppingCartIcon /> Cart
              </span>
            </Link>
          </li>

          {userInfo ? (
            <>
              <li>
                <Link to="/profile">
                  <span className="login">👤 {userInfo.name}</span>
                </Link>
              </li>
              <li onClick={logoutHandler}>
                <span className="login">🚪 Logout</span>
              </li>

              {userInfo.isAdmin && (
                <li>
                  <div className="admin-dropdown">
                    <span className="login">Admin</span>
                    <div className="admin-dropdown-content">
                      <Link to="/admin/userlist">Users</Link>
                      <Link to="/admin/productlist">Products</Link>
                      <Link to="/admin/orderlist">Orders</Link>
                    </div>
                  </div>
                </li>
              )}
            </>
          ) : (
            <li>
              <Link to="/login">
                <span className="login">
                  <LoginIcon /> Login
                </span>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Header;
