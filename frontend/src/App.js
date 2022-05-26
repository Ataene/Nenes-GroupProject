import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Components/Dashboard';
import ProductDetail from './Components/ProductDetail';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navigation />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' exact element={<ProductPage />}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
        <Footer />
        </div>
      </div>
  );
}

export default App;
