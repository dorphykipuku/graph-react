import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import axios from "axios";

const InfoPage = ({ google }) => {
  const [coords, setCoords] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/marker/tout');
        setCoords(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (props, marker, place) => {
    setSelectedPlace(place);
    setActiveMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
    setActiveMarker(null);
  };

 

  return (
    <div className="mapcontainer">
      <br/>
      <Map
        google={google}
        initialCenter={{
          lat: -4.441931,
          lng: 15.266293
        }}
        zoom={9}
      >
        {coords.map((coord) => (
          <Marker
            key={coord.id}
            
            
            
            position={{
              lat: coord.lat,
              lng: coord.lng
            }}
            onClick={(props, marker) => handleMarkerClick(props, marker, coord)}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={selectedPlace !== null}
          onClose={handleInfoWindowClose}
        >
          <div>
            <center>
              <b>poste police</b>
              <p>adresse: {selectedPlace?.adress}</p>
              <p>contact: {selectedPlace?.contact}</p>
            </center>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg"
})(InfoPage);