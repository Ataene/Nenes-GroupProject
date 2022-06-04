import React from 'react'
import { Navigate  } from 'react-router-dom';
import { useSession } from "../auth/UserProvider"

const ProtectedRoute = (props) => {

    const authContext = useSession();

    const userLoggIn = authContext.userLoggIn;
    const isLoading = authContext.isLoading;

    const mustBeUser = props.mustBeUser;
    const element = props.element;

    if(isLoading) {
        return <div>Loading...</div>
    }

     if(userLoggIn) {
       return element;
      } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute;