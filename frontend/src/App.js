// import Navigation from "./Components/Navigation";
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Components/Dashboard';
import ProductDetail from './Components/ProductDisplay/ProductDetail';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
// import {PrivateRoute} from "./auth/PrivateRoute";
import { UserContextProvider } from "./auth/userContextProvider";
import Profile from "./Components/Profile";
import Footer from "../src/Components/footer/index";
import AppBar from "./Components/appbar/appbar";
import AppDrawer from "./Components/drawer";

function App() {
  
  return (
    <>
      <UserContextProvider>
        <AppBar />
        <AppDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
