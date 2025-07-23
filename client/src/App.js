import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import Productpage from './Pages/Productpage';
import Cartpage from './Pages/Cartpage';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
import Profilepage from './Pages/Profilepage';
import Shippingpage from './Pages/Shippingpage';
import Paymentpage from './Pages/Paymentpage';
import Placeorderpage from './Pages/Placeorderpage';
import Orderpage from './Pages/Orderpage';
import Userlistpage from './Pages/Userlistpage';
import Usereditpage from './Pages/Usereditpage';
import Productlistpage from './Pages/Productlistpage';
import Producteditpage from './Pages/Producteditpage';
import Orderlistpage from './Pages/Orderlistpage';
import './App.css'; 





const App = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/product/:id" element={<Productpage/>} />                     
          <Route path="/cart/:id?" element={<Cartpage/>} />
          <Route path="/search/:keyword" element={<Homepage/>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/register" element={<Registerpage/>} />
          <Route path="/profile" element={<Profilepage/>} />
          <Route path="/shipping" element={<Shippingpage/>} />
          <Route path="/payment" element={<Paymentpage/>} />
          <Route path="/placeorder" element={<Placeorderpage/>} />  
          <Route path="/order/:id" element={<Orderpage/>} />  
          <Route path="/admin/userlist" element={<Userlistpage/>} />
          <Route path="/admin/user/:id/edit" element={<Usereditpage/>} />
          <Route path="/admin/productlist" element={<Productlistpage/>} />
          <Route path="/admin/product/:id/edit" element={<Producteditpage/>} />
          <Route path="/admin/orderlist" element={<Orderlistpage/>} />
          <Route path="*" element={<Homepage/>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
