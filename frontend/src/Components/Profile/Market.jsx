import React, {  useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActions, CardHeader, CardMedia, Container, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";

import useDialogModal  from ".././productdetail/useDialogModal";
import  ItemDetail  from ".././productdetail/ProductDetail";

import { AuthContext } from "../../auth/AuthProvider";
import CircularProgress from '@mui/material/CircularProgress';
import ChatBox from "./ChatBox";



const Market = ({postedAds, handleClick, loading}) => {

  
  const authContext = useContext(AuthContext);
  const { user, setUserToMessage, isOnline } = authContext;
  const [ open, setOpen ] = useState(false)



   const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
     useDialogModal(ItemDetail);


  

  if (!postedAds) {
    return <p className="mx-auto">Loading Data...</p>;
  }

  return (
    <>
      <Container>
        <Box>
          <Grid container spacing={1}>
            {postedAds
              .filter((item) => item.uid !== user.uid)
              .map((item) => (
                <Grid item md={3} key={item.timeStamp}>
                  <Card
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                    item={item}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "red"[500] }}
                          aria-label="recipe"
                          src={item.userPicture}
                        />
                      }
                      title={item.displayName}
                      name="title"
                    />
                    <CardMedia
                      component="img"
                      sx={{ height: "280px" }}
                      image={item.url}
                      title={item.title}
                      onClick={() => showProductDetailDialog()}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{item.name}</Typography>
                    </CardContent>
                    <Box
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>{item.description}</Typography>
                      <Typography>Condition: {item.condition}</Typography>
                      <Typography>I want : {item.want}</Typography>
                      <CardActions sx={{ marginBottom: "20px" }}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon sx={{ color: "#62b4f9" }} />
                        </IconButton>
                        <IconButton aria-label="chat">
                          <ChatIcon
                            sx={{ color: "green" }}
                            onClick={() => setUserToMessage(item.uid)}
                          />
                        </IconButton>
                        <IconButton aria-label="share" type="click">
                          <ListAltIcon
                            sx={{ color: "purple" }}
                            onClick={() => handleClick(item)}
                          />
                        </IconButton>
                        <ProductDetailDialog item={item} />
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Market;
