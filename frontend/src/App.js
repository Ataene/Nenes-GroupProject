import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ProductPage from "./Pages/ProductPage";
import Dashboard from "./Components/Authorization/Dashboard";
import ProductDetail from "./Components/ProductDisplay/ProductDetail";
import Login from "./Components/Authorization/Login";
import SignUp from "./Components/Authorization/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import AuthProvider from "./auth/AuthProvider";
import Profile from "./Components/Profile/Profile";
import Footer from "../src/Components/footer/index";
import AppBar from "./Components/appbar/appbar";
import { Location } from "./Components/Region/Location";
import Welcome from "./Components/Region/Welcome";
import NearMe from "./Components/Region/NearMe";


import Maps from "./Components/Region/Maps";


import PostAdPage from "./Components/PostAdPage";
import WishList from "./Components/Profile/WishList";
import FirebaseProvider from "./auth/FirebaseProvider";
//import PostAd from "./Components/PostAd";
//import Want from "./Components/WantList";
import Test from "./Components/WantList/Test";
import { Watchlist, Wishlist } from "./Components/WantList/Wishlist";
import { Watched, Exchanged } from "./Components/WantList/Wished";
import { Add } from "./Components/WantList/Add";

function App() {
  return (
    <>
      <FirebaseProvider>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/products" element={<ProductPage />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/nearme" element={<NearMe />} />
            <Route path="/maps" element={<Maps />} />
            {<Route path="/wishlist" element={<WishList />} />}
            <Route path="/postad" element={<PostAdPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/maps" element={<Maps />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            {<Route path="/watchlist" element={<Wishlist />} />}
            <Route path="/watched" element={<Exchanged />} />
            <Route path="/add" element={<Add />} />
            {/* <Route path="/postadd" element={<AddProducts />} /> */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
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
