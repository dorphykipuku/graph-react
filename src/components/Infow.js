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
        const response = await axios.get('http://localhost:8080/c');
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
            icon={{
              url: "https://cdn-icons-png.flaticon.com/128/1995/1995470.png",
              scaledSize: new google.maps.Size(40, 40)
            }}
            position={{
              lat: coord.latitude,
              lng: coord.longitude
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
           
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg"
})(InfoPage);