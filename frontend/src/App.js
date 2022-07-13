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
// import { Location } from "./Components/Region/Location";
import Welcome from "./Components/Region/Welcome";
import NearMe from "./Components/Region/NearMe";
import Maps from "./Components/Region/Maps";

import FirebaseProvider from "./auth/FirebaseProvider";
//import Test from "./Components/WantList/Want";
import Wishlist from "./Components/WantList/Wishlist";
import Traded from "./Components/WantList/Traded";
import Add from "./Components/WantList/Add";
import WantProvider from "./providers/WantProvider";
import TradedProvider from "./providers/TradedProvider";
import DetailPageProvider from "./providers/ItemDetailProvider";
import HowItWorks from "./Pages/HowItWorks";

// import AddLocation from "./Components/Region/AddLocation";

function App() {
  return (
    <>
      <FirebaseProvider>
        <AuthProvider>
          <DetailPageProvider>
            <WantProvider>
              <TradedProvider>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/products" element={<ProductPage />} /> */}
                  <Route path="/about" element={<About />} />
                  <Route path="/howitworks" element={<HowItWorks />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/nearme" element={<NearMe />} />
                  {/* <Route path="/addlocation" element={<AddLocation />} /> */}
                  <Route path="/maps" element={<Maps />} />
                  {/*<Route path="/wishlist" element={<WishList />} />*/}

                  {/*<Route path="/test" element={<Test />} />*/}
                  {/*<Route path="/watchlist" element={<Wishlist />} />*/}
                  <Route path="/traded" element={<Traded />} />
                  {/*<Route path="/add" element={<Add />} />/*}
            {/* <Route path="/postadd" element={<AddProducts />} /> */}
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
              </TradedProvider>
            </WantProvider>
          </DetailPageProvider>
        </AuthProvider>
      </FirebaseProvider>
    </>
  );
}

export default App;
