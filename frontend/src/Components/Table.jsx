import React, { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid } from '@mui/x-data-grid';
import { userTable, userDelete, avatarImage } from "./Styles"
import { Link } from "react-router-dom";

const Table = (props) => { 

  const rows = props.TableRows
  const [data, setData ] = useState(rows)

  const handleDelete = (id) => {
    const newData = data.filter((user) => user.id !== id);
    setData(newData)
  }
  const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'username', headerName: 'Username', width: 200, renderCell: (params) => {
        return (
          <div>
            <img src={params.row.avatar} alt="" style={avatarImage} />
            {params.row.username}
          </div>
        )
      } },
      { field: 'email', headerName: 'email', width: 130 },
      { field: 'status', headerName: 'Status', width: 90, },
      { field: 'transaction', headerName: 'Transaction',  width: 130},
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
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        disableSelectionOnClick
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Table;
