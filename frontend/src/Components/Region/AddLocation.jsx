import React, { useContext, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HomeIcon from "@mui/icons-material/Home";
import Search from "./seachPostalCode";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  Box,
  CardActions,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  CardContent,
  Paper,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import OnlineStatus from "../../Components/Profile/OnlineStatus";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from ".././productdetail/useDialogModal";
import ItemDetail from ".././productdetail/ProductDetail";
import { AuthContext } from "../../auth/AuthProvider";

const searchStyle = {
  position: "absolute",
  top: 0,
  right: 50,
};

const MAP_TOKEN =
  "pk.eyJ1IjoiYXRhZW5lIiwiYSI6ImNsMnRpc3EwcDAxaXMzY3FlOGg4a3A5ZmEifQ.dtj_XStiWa_Uy15mfMAM7Q";

const AddLocation = () => {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, setUserToMessage } = authContext;
  const [postalData, setPostalData] = useState();
  const [adsByPostalCode, setadsByPostalCode] = useState([]);
  const [postedAds, setPostedAds] = useState([]);
  const handleClick = (item) => {
    console.log(item);
    setSelectedItems(item);
  };

  useEffect(() => {
    let data = postedAds.reduce((object, ad) => {
      let postalCode = ad.postalCode;

      if (object[postalCode]) {
        object[postalCode].push(ad);
      } else {
        object[postalCode] = [ad];
      }
      return object;
    }, {});
    setadsByPostalCode(data);
  }, [postedAds]);
  console.log(adsByPostalCode);

  useEffect(() => {
    if (db) {
      let collectionRef = collection(db, "areaCodes");
      let queryRef = query(collectionRef, orderBy("postalCode"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("Ads not found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          let postalObject = usersData.reduce((object, item) => {
            object[item.postalCode] = item;
            return object;
          }, {});
          setPostalData(postalObject);
        }
      });
      return unsubscribe;
    }
  }, [db]);

  useEffect(() => {
    if (db) {
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef);
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setPostedAds(usersData);
        }
      });
      return unsubscribe;
    }
  }, [db]);

  const [long, setLong] = useState(-114.0719);
  const [lat, setLat] = useState(51.0447);
  const [zoom, setZoom] = useState(9.4);
  const [selectedItems, setSelectedItems] = useState(null);
  const [viewport, setViewport] = useState();
  const [searchItems, setSearchItems] = useState();

  const [viewState, setViewState] = useState({
    longitude: -114.0719,
    latitude: 51.0447,
    center: [-144, 51],
    zoom: zoom,
  });

  const mapRef = useRef(null);
  const initialViewState = {
    longitude: long,
    latitude: lat,
    center: [-144, 51],
    zoom: zoom,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //search bar for map
  useEffect(() => {
    if (searchItems > -1) {
      let items = postalData[searchItems];
      let itemsLat = items.latitude;
      let itemsLong = items.longitude;
      setViewState((cur) => {
        return {
          ...cur,
          zoom: 13,
          latitude: itemsLat,
          longitude: itemsLong,
        };
      });
    }
  }, [searchItems]);
  console.log(postalData);
  return (
    postalData && (
      <>
        <Container>
          <Map
            initialViewState={initialViewState}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapboxAccessToken={MAP_TOKEN}
            style={{ width: 1300, height: 660 }}
            mapStyle="mapbox://styles/ataene/cl4lf3mv9000h14nyykjem276"
          >
            {Object.keys(adsByPostalCode).map((postal) => {
              console.log(postal, postalData[postal]);
              return (
                <Marker
                  key={postal}
                  latitude={postalData[postal].latitude}
                  longitude={postalData[postal].longitude}
                  onClick={() => {
                    handleClick(postalData[postal]);
                  }}
                >
                  <HandshakeIcon
                    color="primary"
                    style={{
                      height: "30px",
                      width: "40px",
                    }}
                  />
                </Marker>
              );
            })}

            {selectedItems ? (
              <Popup
                latitude={selectedItems.latitude}
                longitude={selectedItems.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
              >
                <div className="card-container">
                  {adsByPostalCode[selectedItems.postalCode].map((item) => (
                    <Grid
                      item
                      xs={6}
                      md={4}
                      lg={3}
                      key={item.timeStamp}
                      component={Paper}
                      sx={{
                        border: "4px solid rgba(0,0,0,0.2)",
                        padding: 1,
                        width: 275,
                        height: 125,
                        "&::-webkit-scrollbar": {
                          width: 17,
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "lightgreen",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "darkgreen",
                          borderRadius: 2,
                        },
                        overflowX: "hidden",
                      }}
                    >
                      {" "}
                      
                      <Card
                        elevation={3}
                        sx={{
                          height: "30rem",
                          marginTop: "10px",
                          margin: "10px",
                        }}
                        item={item}
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
                          sx={{ height: "180px" }}
                          image={item.url}
                          title={item.title}
                          onClick={() => {
                            console.log(item);
                            showProductDetailDialog(item);
                          }}
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
                            <IconButton
                              aria-label="chat"
                              onClick={() => setUserToMessage(item.uid)}
                            >
                              <ChatIcon sx={{ color: "green" }} />
                            </IconButton>
                            <IconButton
                              aria-label="share"
                              type="click"
                              onClick={() => handleClick(item)}
                            >
                              <ListAltIcon sx={{ color: "purple" }} />
                            </IconButton>
                            <ProductDetailDialog item={item} />
                          </CardActions>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </div>
              </Popup>
            ) : null}

            <div className="sidebar">
              Longitude: {viewState.longitude.toFixed(2)}| Latitude:{" "}
              {viewState.latitude.toFixed(2)} | Zoom:{" "}
              {viewState.zoom.toFixed(2)}
              {/* <div ref={mapRef}></div> */}
            </div>

            <button>
              <HomeIcon
                className="home"
                onClick={(evt) => setViewState(initialViewState)}
              />
            </button>

            <div style={searchStyle}>
              <Search setSearchItems={setSearchItems} />
            </div>

            {/* <div className="nav" style={navStyle}>
          <GeolocateControl />
          <NavigationControl
            showCompass={true}
            onViewportChange={(viewport) => setViewport({ viewport })}
          />
          <ScaleControl />
        </div> */}
          </Map>
        </Container>
      </>
    )
  );
};
export default AddLocation;
