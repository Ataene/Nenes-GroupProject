import "./App.css";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Components/Dashboard';
import ProductDetail from './Components/ProductDisplay/ProductDetail';
=======
import Home from "./Pages/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProductPage from "./Pages/ProductPage";
import Dashboard from "./Components/Dashboard";
import ProductDetail from "./Components/ProductDetail";
>>>>>>> 93c038ef257aed8fe25d53e0ce06ecfbd0dc54df

function App() {
  return (
    <div className="container">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" exact element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
