import React, { useContext, useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import { userTable, userDelete, avatarImage } from "./Styles";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
 
const Table = (props) => {
  
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  
  // const rows = props.TableRows;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (db && user) {
      setLoading(true);
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setData(usersData);
          setLoading(false);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);


  const handleDelete = (id) => {
    const newData = data.filter((user) => user.id !== id);
    setData(newData);
  };


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <img src={params.row.avatar} alt="" style={avatarImage} />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "email", width: 130 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "transaction", headerName: "Transaction", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/username/" + params.row.id}>
              <button style={userTable}>Edit</button>
            </Link>
            <DeleteOutlineIcon
              onClick={() => handleDelete(params.row.id)}
              style={userDelete}
            />
          </>
        );
      },
    },
  ];



  return (
    <div flex={4} style={{ height: 500, width: "100%" }}>
      <DataGrid
        disableSelectionOnClick
        rows={[
  {
    id: 1,
    username: "Snow Jon",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "Jsnow@yahoo.com",
    status: "active",
    transaction: "$80.09",
  },
  {
    id: 2,
    username: "Lannister Cersei",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    email: "Lscer@yahoo.com",
    status: "active",
    transaction: "$120.99",
  },
  {
    id: 3,
    username: "Snow Jaime",
    avatar: "https://randomuser.me/api/portraits/men/95.jpg",
    email: "snowjaime@yahoo.com",
    status: "active",
    transaction: "$16.69",
  },
  {
    id: 4,
    username: "Stark Arya",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "Sarya@yahoo.com",
    status: "active",
    transaction: "$145.99",
  },
  {
    id: 5,
    username: "Targaryen Daenerys",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    email: "Dmentw@yahoo.com",
    status: "active",
    transaction: "$690.99",
  },
  {
    id: 6,
    username: "Targaryen Daenerys",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "Mehey@yahoo.com",
    status: "active",
    transaction: "$190.65",
  },
  {
    id: 7,
    username: "Melisandre Wick",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    email: "Onage@yahoo.com",
    status: "active",
    transaction: "$60.35",
  },
  {
    id: 8,
    username: "Clifford Ferrara",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    email: "Gnere@yahoo.com",
    status: "active",
    transaction: "$150.35",
  },
  {
    id: 9,
    username: "Frances Rossini",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "Fros@yahoo.com",
    status: "active",
    transaction: "$120.36",
  },
  {
    id: 10,
    username: "Roxie Harvey",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    email: "Rhoev@yahoo.com",
    status: "active",
    transaction: "$93.00",
  },
  {
    id: 11,
    username: "Targaryen Melisandre",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    email: "Haber@yahoo.com",
    status: "active",
    transaction: "$120",
  },
  {
    id: 12,
    username: "Melisandre Wick",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    email: "Jjaage@yahoo.com",
    status: "active",
    transaction: "$169.59",
  },
  {
    id: 13,
    username: "Clifford Ferrara",
    avatar: "https://randomuser.me/api/portraits/women/95.jpg",
    email: "Cford@yahoo.com",
    status: "active",
    transaction: "$250.56",
  },
  {
    id: 14,
    username: "Daenerys Rossini",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    email: "Droes@yahoo.com",
    status: "active",
    transaction: "$120.99",
  },
  {
    id: 15,
    username: "Roxie Frances",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    email: "Rfarce@yahoo.com",
    status: "active",
    transaction: "$360.35",
  },
]}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Table;
