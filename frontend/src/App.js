import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Components/Dashboard';
import ProductDetail from './Components/ProductDisplay/ProductDetail';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import {PrivateRoute} from "./auth/PrivateRoute";
import AuthProvider  from "./auth/AuthProvider";
import Profile from "./Components/Profile";
import Footer from "../src/Components/footer/index";
import AppBar from "./Components/appbar/appbar";
import React from "react"
import ModalPop from "./Components/modal.js";
import WishList  from "./Components/WishList";
import FirebaseProvider from "./auth/FirebaseProvider";
// import { AddProducts } from "./Components/PostAd";

function App() {
  
  return (
    <>
      <FirebaseProvider>
        <AuthProvider>
          <AppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/modal" element={<ModalPop />} />
            <Route path="/wishlist" element={<WishList />} />
            {/* <Route path="/postadd" element={<AddProducts />} /> */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </FirebaseProvider>
    </>
  );
}

export default App;  
