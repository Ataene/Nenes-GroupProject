import { Typography } from '@mui/material';
import React from 'react'
import { useSession  } from '../auth/UserProvider'

const Profile = () => {
  const { user } = useSession();

  if (!user){
      return null;
  }

  return (
    <div>
        <Typography>
            Name: {user.displayName}
        </Typography>
        <Typography>
            email: {user.email}
        </Typography>
    </div>
    )
}

export default Profile;