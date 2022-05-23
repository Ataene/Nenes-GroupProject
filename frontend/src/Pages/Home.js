import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import LineDetails from '../Components/LineDetails';
import image from "../images/logo.png";

const Home = () => {
  return (
    <>
      <div style={{display: "flex", flexDirection: "row"}}>
        <Sidebar />
        <Table />
      </div>
      <div>
      <LineDetails />
      </div>
      <header className="App-header">
        <img src={image} alt="logo" />
        <p>
          THE NENES 
        </p>
        <h3>
          TRADE BY BARTER SYSTEM
        </h3>
      </header>
    </>
  )
}

export default Home;