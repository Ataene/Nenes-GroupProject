import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import {LineData, TableRows} from '../Components/Data/Data';
import LineDetails from '../Components/LineDetails';

const Home = () => {
  return (
    <>
      <div style={{display: "flex", flexDirection: "row"}}>
        <Sidebar />
        <Table TableRows={TableRows} />
      </div>
        <LineDetails lineData={LineData} />
    </>
  )
}

export default Home;
