import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import cardImage from "../images/Alaf.jpg"
import { AuthContext  } from '../auth/AuthProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';

const TopProfile = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext;
  return (
    <>
     <Card sx={{ height: "20rem", marginTop: "10px" }}>
      <CardActionArea>
        <Avatar src={cardImage} sx={{margin: "15px", height: "100px", width: "100px"}} />
          <Typography sx={{margin: "15px", fontSize: "50px"}} gutterBottom variant="h5" component="div">
            {user.displayName}
          </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <FavoriteIcon />
        </Button>
        <Button size="small" color="primary">
          <ChatIcon />
        </Button>
      </CardActions>
     </Card>
    </>
  )
}

export default TopProfile;