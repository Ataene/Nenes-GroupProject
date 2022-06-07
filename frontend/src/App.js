import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Components/Dashboard';
import ProductDetail from './Components/ProductDisplay/ProductDetail';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./auth/ProtectedRoute";
import {useAuth} from "./auth/useAuth";
import { UserProvider } from "./auth/UserProvider";
import Profile from "./Components/Profile";
import AppBar from "./Components/appbar/appbar";
import AppDrawer from "./Components/drawer";

function App() {
  
  const { isLoading, user } = useAuth();
  return (
    <>
      <UserProvider>
        <AppBar />
        <AppDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* <Route path="/dashboard" element={<ProtectedRoute isAuthed={!!user} isLoading={isLoading} element={<Dashboard />} />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                isAuthed={!!user}
                isLoading={isLoading}
                element={<Dashboard />}
              />
            }
          />

          {/* <Route path="/dashboard" element={
          <ProtectedRoute mustBeLoggIn element={<Dashboard />} />
          } 
        /> */}

<<<<<<< HEAD
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </UserProvider>
=======
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
      {/* <Footer /> */}
    </UserProvider>
>>>>>>> 0f739c21b2db249a8d2045a5230632cb51979a69
    </>
  );
}

export default App;
