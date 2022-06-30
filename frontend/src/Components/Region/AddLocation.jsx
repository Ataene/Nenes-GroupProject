import React, { useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import { Box, Button, Link  } from "@mui/material";
// import postalData from "../Data/testData.json";
import postalData from "../Data/postalCode.json";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/system";

const MAP_TOKEN ="pk.eyJ1IjoiYXRhZW5lIiwiYSI6ImNsMnRpc3EwcDAxaXMzY3FlOGg4a3A5ZmEifQ.dtj_XStiWa_Uy15mfMAM7Q";

const AddLocation = () => {

  const [long, setLong] = useState(-114.0719);
  const [lat, setLat] = useState(51.0447);
  const [zoom, setZoom] = useState(9.4);
  const [selectedPark, setSelectedPark] = useState(null);
  const [viewport, setViewport] = useState();
  const [searchPark, setSearchPark] = useState();

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

  return (
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
        {postalData.map((postal) => (
          <Marker
            key={postal.postalCode}
            latitude={postal.latitude}
            longitude={postal.longitude}
          >
              <HandshakeIcon
                color="primary"
                style={{
                  height: "30px",
                  width: "40px",
                }}
              />
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={parseFloat(selectedPark.latitude)}
            longitude={parseFloat(selectedPark.longitude)}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
          >
            <div className="card-container">
              <label className="popups-label">Place</label>
              <h5 className="place">{selectedPark.postalCode}</h5>
              <p className="descInfo">{selectedPark.neighborhood}</p>
              <label className="popups-label">Review</label>
              <br />
              <Link to="http://localhost:3000/">
                <Button>Review</Button>
              </Link>
              <br />
              <label className="popups-label">Ratings</label>
              {/* <p className="star">{(selectedPark.Ratings).fill(<MapRatings className="star"/>)}</p> */}
              <label className="popups-label">Information</label>
              <p className="descInfo">{selectedPark.neighborhood}</p>
              <div className="btn">
                <Button className="btn-button">
                  <Link to="/blog">Survey</Link>
                </Button>
              </div>
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

        {/* <div style={searchStyle}>
          <Search setSearchPark={setSearchPark} />
        </div> */}

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
