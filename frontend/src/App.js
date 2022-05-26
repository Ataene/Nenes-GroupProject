import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navigation />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' exact element={<ProductPage />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
        <Footer />
        </div>
      </div>
  );
}

export default App;
