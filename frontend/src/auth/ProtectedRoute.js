import React from 'react'
import { Navigate  } from 'react-router-dom';

const ProtectedRoute = ({isAuthed, isLoading, element }) => {
  
  console.log(isAuthed)
  console.log(element)

    if(isLoading) {
      
        return <div>Loading...</div>
    }
     if(!isAuthed) {
        return <Navigate to="/login" />
    }
  return (
    // <Route {...props} />
    <>
      {element}
    </>
  )
}

export default ProtectedRoute;