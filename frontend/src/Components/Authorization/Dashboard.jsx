import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import Table from '../Table';
import {LineData, TableRows, productData} from '../../Components/Data/Data';
import LineDetails from '../../Components/LineDetails';
import { Stack } from '@mui/material';
import Product from '../../Components/Product';

const Dashboard = () => {
  const [componentToShow, setComponentToShow ] = useState("Table");
  return (
    <>
    <Stack direction="row" justifyContent="space-between">
        <Sidebar setComponentToShow={setComponentToShow} />
        {componentToShow === "Table" && <Table TableRows={TableRows} />}
        {componentToShow === "Line" && <LineDetails lineData={LineData} />}
        {componentToShow === "Product" && <Product productData={productData} />}
      </Stack>
    </>
  )
}

export default Dashboard;