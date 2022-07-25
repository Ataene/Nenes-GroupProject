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
import { TradeContext } from "../../providers/TradedProvider";
import useDialogModal from ".././productdetail/useDialogModal";
import ItemDetail from ".././productdetail/ProductDetail";

const Traded = () => {
  const tradedContext = useContext(TradeContext);
  const { traded, addToTraded, removeFromTraded } = tradedContext;

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);
  const [search, setSearch] = useState("");
  return (
    <>
      <Box>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
          </Box>
          <Grid container spacing={1}>
            {traded &&
              traded.map((item) => (
                <Grid item md={3} key={item.description}>
                  <Card
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
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
                        <IconButton aria-label="share">
                          <ChatIcon sx={{ color: "green" }} />
                        </IconButton>
                        {/* <IconButton aria-label="share" type="click">
                        <ListAltIcon
                          sx={{ color: "purple" }}
                          onClick={() => handleClickTraded(item)}
                        />
                      </IconButton> */}
                        {/* <IconButton aria-label="share">
                        <CancelPresentationIcon
                          sx={{ color: "green" }}
                          onClick={() => removeFromWantList(item)}
                        />
                      </IconButton> */}
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

export default Traded;
