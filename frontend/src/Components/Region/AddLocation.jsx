import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Box } from '@mui/material';
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"
import { Container } from '@mui/system';
mapboxgl.accessToken = "pk.eyJ1IjoiYXRhZW5lIiwiYSI6ImNsMnRpc3EwcDAxaXMzY3FlOGg4a3A5ZmEifQ.dtj_XStiWa_Uy15mfMAM7Q";

const AddLocation = () => {
        const mapContainer = useRef(null)
        const map = useRef(null)
        const [ lng, setLng   ] = useState(-114.067)
        const [ lat, setLat   ] = useState(51.049)
        const [ zoom, setZoom   ] = useState(12)
        const [ pointer, setPointer   ] = useState()

        // const marker = new mapboxgl.Marker()
        // .setLngLat([-114.067, 51.149])
        // .addTop(map)
        // setPointer(marker);

        // const geocoder = new MapboxGeocoder({
        //         accessToken: mapboxgl.accessToken, 
        //         mapboxgl: mapboxgl, 
        //         marker: false,
        //         placeholder: 'Search for places in Berkeley', 
        //         bbox: [-122.30937, 37.84214, -122.23715, 37.89838], 
        //         proximity: {
        //         longitude: -122.25948,
        //         latitude: 37.87221
        //         }
        //         });
                 
                // map.addControl(geocoder);
                // map.on('load', () => {
                // map.addSource('single-point', {
                // 'type': 'geojson',
                // 'data': {
                // 'type': 'FeatureCollection',
                // 'features': []
                // }
                // });
                 
                // map.addLayer({
                // 'id': 'point',
                // 'source': 'single-point',
                // 'type': 'circle',
                // 'paint': {
                // 'circle-radius': 10,
                // 'circle-color': '#448ee4'
                // } });
                // geocoder.on('result', (event) => {
                // map.getSource('single-point').setData(event.result.geometry);
                // });
                // });


        useEffect(() => {
                if(map.current) return;
                map.current = new mapboxgl.Map({
                        container: mapContainer.current,
                        style: "mapbox://styles/ataene/cl4lf3mv9000h14nyykjem276",
                        center: [lng, lat],
                        zoom: zoom,
                })
}, []);

        useEffect(() => {
                if(!map.current) return;
                map.current.on("move", () => {
                        setLng(map.current.getCenter().lng.toFixed(4))
                        setLat(map.current.getCenter().lat.toFixed(4))
                        setZoom(map.current.getZoom().toFixed(4))
                //        setPointer(map.current.getCenter().toFixed(5))
                })
        }, [])
  return (
    <Box>
        <Box sx={{height: 20}}>
                Longitude: {lng} || Latitude: {lat} || Zoom: {zoom}
        </Box>
        <Box sx={{height: 400,  position: "relative"}}  ref={mapContainer}/>
    </Box>
  )
}

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