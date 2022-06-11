import React, { useContext } from 'react'
import { Navigate  } from 'react-router-dom';
import { AuthContext } from "./AuthContext"

export const PrivateRoute = (props) => {

    const authContext = useContext(AuthContext);

    const loggedInUser = authContext.loggedInUser;
    const loading = authContext.loading;
    const element = props.element;

    if(loading) {
        return <div>Loading...</div>
    }
     if(loggedInUser) {
       return element;
      } else {
        return <Navigate to="/login" />
    }
}
