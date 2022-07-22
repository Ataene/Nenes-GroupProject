import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import About from "./Pages/About";
// import Dashboard from "./Components/Authorization/Dashboard";
import ProductDetail from "./Components/ProductDisplay/ProductDetail";
import Login from "./Components/Authorization/Login";
import SignUp from "./Components/Authorization/SignUp";
import PrivateRoute from "./auth/PrivateRoute";
import AuthProvider from "./auth/AuthProvider";
import Dashboard from "./Components/Profile/Dashboard";
import Footer from "../src/Components/footer/index";
import Welcome from "./Components/Region/Welcome";
import NearMe from "./Components/Region/NearMe";
import Maps from "./Components/Region/Maps";
import FirebaseProvider from "./auth/FirebaseProvider";
import Traded from "./Components/WantList/Traded";
import WantProvider from "./providers/WantProvider";
import TradedProvider from "./providers/TradedProvider";
import DetailPageProvider from "./providers/ItemDetailProvider";
import NavBar from "./Components/NavBar";
import MyPostProvider from "./providers/MyPostProvider";
import Sidebar from "./Components/Sidebar";
import Product from "./Components/Product";
import Admin from "./Components/Authorization/Admin";

function App() {
  return (
    <>
      <FirebaseProvider>
        <AuthProvider>
          <DetailPageProvider>
            <WantProvider>
              <TradedProvider>
                <MyPostProvider>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/nearme" element={<NearMe />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/traded" element={<Traded />} />
                    {/* <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  /> */}
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/signup" element={<SignUp />} />
                  </Routes>
                  <Footer />
                </MyPostProvider>
              </TradedProvider>
            </WantProvider>
          </DetailPageProvider>
        </AuthProvider>
      </FirebaseProvider>
    </>
  );
}

export default App;
