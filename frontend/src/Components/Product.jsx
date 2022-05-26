import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import { userTable, userDelete, avatarImage } from "./Styles"
import { Link } from "react-router-dom";

const Product = (props) => {

  const rows = props.productData
  const [data, setData ] = useState(rows)

  const handleDelete = (id) => {
    const newData = data.filter((user) => user.id !== id);
    setData(newData)
  }
  const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'product', headerName: 'Product', width: 200, renderCell: (params) => {
        return (
          <div>
            <img src={params.row.avatar} alt="" style={avatarImage} />
            {params.row.product}
          </div>
        )
      } },
      { field: 'stock', headerName: 'Stock', width: 130 },
      { field: 'status', headerName: 'Status', width: 90, },
      { field: 'price', headerName: 'Price',  width: 130},
      {field: "action", headerName: "Action", width: 150, renderCell: (params) => {
        return (
          <>
          <Link to={"/username/" + params.row.id}>
            <button style={userTable}>Edit</button>
          </Link>
            <DeleteOutlineIcon onClick={() => handleDelete(params.row.id)} style={userDelete} />
          </>
        )
      }}
    ];
  return (

    <div flex={4} style={{ height: 500, width: "100%" }}>
      <DataGrid
        disableSelectionOnClick
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  )
}

export default Product;