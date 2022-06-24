import React, { useState } from "react";
import { Avatar, Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Typography, CardContent } from "@mui/material";
import { Container } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PersonIcon from '@mui/icons-material/Person';

const Want = ({wantList, removeItem}) => {
  const [search, setSearch ] = useState('')
  return (
    <>
      <Box>
        <Container>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
            <IconButton>
              <PersonIcon fontSize="large" style={{ color: "#ec5e6f" }} />
            </IconButton>
              <input 
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                placeholder="Search list..."
                style={{border: "none", borderRadius: "30px", width: "20rem", height: "35px", paddingLeft: "30px", fontSize: "15px"}}
                 />
            <IconButton>
              <ChatIcon fontSize="large" className="headerIcon" style={{ color: "#ec5e6f" }} />
            </IconButton>
          </Box>
            <Grid container spacing={1}>
            {wantList.map(( item) => (
              <Grid item md={3} key={item.description}>
                <Card
                  sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "red"[500] }}
                          aria-label="recipe"
                        >
                          R
                        </Avatar>
                      }
                      title={item.title}
                      name="title"
                    />
                      <CardMedia
                        component="img"
                        sx={{height: "280px"}}
                        image={item.url}
                        title={item.title}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{item.name}</Typography>
                      </CardContent>
                  <Box
                    sx={{  justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}
                  >
                    <Typography>{item.description}</Typography>
                    <Typography>Condition: {item.condition}</Typography>
                    <Typography>I want : {item.want}</Typography>
                    <CardActions sx={{marginBottom: "20px"}}>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{color: "red"}} />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon sx={{color: "#62b4f9" }} />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ChatIcon sx={{color: "green"}}  />
                      </IconButton>
                      <IconButton aria-label="share">
                        <CancelPresentationIcon sx={{color: "green"}} onClick={() => removeItem(item)} />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Want;
