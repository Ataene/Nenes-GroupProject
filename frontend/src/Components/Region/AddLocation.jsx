import React, { useContext, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import { Box, Button, Link } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/system";
import Search from "./seachPostalCode";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// import postalCode from "../Data/postalCode.json";

const searchStyle = {
  position: "absolute",
  top: 0,
  right: 50,
};

const MAP_TOKEN =
  "pk.eyJ1IjoiYXRhZW5lIiwiYSI6ImNsMnRpc3EwcDAxaXMzY3FlOGg4a3A5ZmEifQ.dtj_XStiWa_Uy15mfMAM7Q";

const AddLocation = () => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [postalData, setPostalData] = useState();
  const [adsByPostalCode, setadsByPostalCode] = useState([]);
  const [postedAds, setPostedAds] = useState([]);
  const handleClick =(item) => {
    console.log(item)
    setSelectedItems(item)
  }

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
    // console.log(adsByPostalCode)
  }, [postedAds]);
  console.log(adsByPostalCode);

  // console.log(postedAds)

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
  return postalData && ( 
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
           console.log(postal, postalData[postal])
           return (
              <Marker
                key={postal}
                latitude={postalData[postal].latitude}
                longitude={postalData[postal].longitude}
                onClick= {()=> {
                  handleClick(postalData[postal])
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
              latitude= {selectedItems.latitude}
              longitude={selectedItems.longitude}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
            >
              <div className="card-container">
                {JSON.stringify(adsByPostalCode[selectedItems.postalCode])}
              </div>
            </Popup>
          ) : null}

          <div className="sidebar">
            Longitude: {viewState.longitude.toFixed(2)}| Latitude:{" "}
            {viewState.latitude.toFixed(2)} | Zoom: {viewState.zoom.toFixed(2)}
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
  );
};
export default AddLocation;

// import { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';

//   const handleSelect = async (address, placeId) => {
//     const results = await geocodeByAddress(address);
//     const latLng = await getLatLng(results[0]);
//     const [place] = await geocodeByPlaceId(placeId);
//     const { long_name: postalCode = '' } =
//       place.address_components.find(c => c.types.includes('postal_code')) || {};
//     console.log("postalCode",postalCode);
//   };

// const mapContainer = useRef(null)
//         const map = useRef(null)
//         const [ lng, setLng   ] = useState(-114.067)
//         const [ lat, setLat   ] = useState(51.049)
//         const [ zoom, setZoom   ] = useState(12)
//         const [ pointer, setPointer   ] = useState()

//         useEffect(() => {
//                 if(map.current) return;
//                 map.current = new mapboxgl.Map({
//                         container: mapContainer.current,
//                         style: "mapbox://styles/ataene/cl4lf3mv9000h14nyykjem276",
//                         center: [lng, lat],
//                         zoom: zoom,
//                 })
// }, []);

//         useEffect(() => {
//                 if(!map.current) return;
//                 map.current.on("move", () => {
//                         setLng(map.current.getCenter().lng.toFixed(4))
//                         setLat(map.current.getCenter().lat.toFixed(4))
//                         setZoom(map.current.getZoom().toFixed(4))
//                 })
//         }, [])
//   return (
//     <Box>
//         <Box sx={{height: 20}}>
//                 Longitude: {lng} || Latitude: {lat} || Zoom: {zoom}
//         </Box>
//         <Box sx={{height: 400,  position: "relative"}}  ref={mapContainer}/>
//     </Box>
//   )
//useEffect to call db
//  const [loading, setLoading] = useState(false);
//  //useEffect to call db
//    useEffect(() => {
//      if (db) {
//        let collectionRef = collection(db, "postedAds");
//        let queryRef = query(collectionRef);
//        const unsubscribe = onSnapshot(queryRef, (querySnap) => {
//          if (querySnap.empty) {
//          } else {
//            let usersData = querySnap.docs.map((doc) => {
//              return { ...doc.data(), DOC_ID: doc.id };
//            });
//            setSetAllPostedAds(usersData);
//            setLoading(true)
//          }
//        });
//        return unsubscribe;
//      }
//    }, [db]);
