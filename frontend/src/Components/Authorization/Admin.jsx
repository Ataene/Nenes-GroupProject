import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import Table from '../Table';
import {LineData, TableRows, productData} from '../Data/Data';
import LineDetails from '../LineDetails';
import { Stack } from '@mui/material';
import Product from '../Product';

const Admin = () => {
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

export default Admin;