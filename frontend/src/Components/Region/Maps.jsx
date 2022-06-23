import React, { useRef, useEffect, useState } from 'react';
// import Geocoder from 'react-map-gl-geocoder'
import AddLocation from "./AddLocation";
import mapboxgl from 'mapbox-gl'; 
import "mapbox-gl/dist/mapbox-gl.css"
// import ClusterMap from "./ClusterMap";
const MAPBOX_TOKEN ="pk.eyJ1IjoiYXRhZW5lIiwiYSI6ImNsMnRpc3EwcDAxaXMzY3FlOGg4a3A5ZmEifQ.dtj_XStiWa_Uy15mfMAM7Q"

const Maps = () => {

  return (
    <>
        <AddLocation>
                {/* <Geocoder
                // mapRef={mapRef}
                // onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position="top-left"
                /> */}
        </AddLocation>
    </>
  )
}

export default Maps;