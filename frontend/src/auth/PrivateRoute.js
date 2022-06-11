import React, { useContext } from 'react'
import { Navigate  } from 'react-router-dom';
import { AuthContext  } from '../auth/AuthProvider';

export const PrivateRoute = (props) => {

    const element = props.element;
    const authContext = useContext(AuthContext);

    const { user, loading } = authContext;

    if(loading) {
        return <div>Loading...</div>
    }
     if(user) {
       return element;
      } else {
        return <Navigate to="/login" />
    }
}
