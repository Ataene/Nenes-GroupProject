import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
