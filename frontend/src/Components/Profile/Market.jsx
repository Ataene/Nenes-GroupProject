import React, { useContext, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from ".././productdetail/useDialogModal";
import ItemDetail from ".././productdetail/ProductDetail";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import OnlineStatus from "./OnlineStatus";
import CircleLoader from "react-spinners/CircleLoader";

const Market = ({ postedAds, handleClick, newStatus, loading }) => {
  const authContext = useContext(AuthContext);
  const { user, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [open, setOpen] = useState(false);

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);
    console.log("666", loading)
  return (
    <>
        <Box>
          <Grid container spacing={1}>
          
          { loading ? 
            (
              <div style={{display: "flex", marginLeft: "500px", marginTop: 150}}>
              <CircleLoader  color={"#FBB454"} loading={loading}  size={100} />
              </div>
              ): postedAds
              .filter((item) => item.uid !== user.uid)
              .map((item) => (
                <Grid item  xs={6}  md={4} lg={3} key={item.uid} >
                  <Card
                    elevation={10}
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                    item={item}
                  >
                  <Box sx={{display: "flex", flexDirection: "row"}}>
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
                      <OnlineStatus uid={item.uid} />
                  </Box>
                    <CardMedia
                      component="img"
                      sx={{ height: "260px" }}
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
                      <CardActions xs={6} sx={{ marginBottom: "20px" }}>
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
    </>
  );
};

export default Market;
