import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";
import { Container } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PersonIcon from "@mui/icons-material/Person";
import { WantContext } from "../../providers/WantProvider";
import { TradeContext } from "../../providers/TradedProvider";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from ".././productdetail/useDialogModal";
import ItemDetail from ".././productdetail/ProductDetail";
import OnlineStatus from "../Profile/OnlineStatus";

const Wishlist = () => {
  const wantContext = useContext(WantContext);
  const tradedContext = useContext(TradeContext);
  const { wantList, removeFromWantList } = wantContext;
  const { trade, addToTraded, removeFromTraded } = tradedContext;
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);
  const [search, setSearch] = useState("");

  const handleClicked = (item) => {
    addToTraded(item);
  };
  return (
    <>
      <Box>
        <Container>
          <Grid container spacing={1}>
            {wantList &&
              wantList.map((item) => (
                <Grid item xs={6} md={2} lg={4} key={item.description}>
                  <Card
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                  >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                        <OnlineStatus uid={item.owner} />
                        </Box>
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
                        {/* <IconButton aria-label="share">
                        <ChatIcon sx={{ color: "green" }} />
                      </IconButton> */}
                        <IconButton
                          aria-label="share"
                          type="click"
                          onClick={() => handleClicked(item)}
                        >
                          <ListAltIcon sx={{ color: "purple" }} />
                        </IconButton>
                        <IconButton aria-label="share">
                          <CancelPresentationIcon
                            sx={{ color: "green" }}
                            onClick={() => removeFromWantList(item)}
                          />
                        </IconButton>
                        <ProductDetailDialog item={item} />
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

export default Wishlist;
