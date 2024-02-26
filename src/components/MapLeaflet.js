import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import {Icon} from 'leaflet'
import iconUrl from "leaflet/dist/images/marker-icon.png";



const InfoPage = () => {
  const [coords, setCoords] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const markerIcon = new Icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  
  });


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

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handlePopupClose = () => {
    setSelectedPlace(null);
  };
 

  return (
    <div className="mapcontainer">
      <br/>
      <MapContainer
        center={[-4.441931, 15.266293]}
        zoom={10}
        maxZoom={35}
        minZoom={30}
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {coords.map((coord) => (
          <Marker
            key={coord.id}
            position={[coord.lat, coord.lng]}
         
            icon={markerIcon}
            eventHandlers={{
              click: () => handleMarkerClick(coord)
            }}
          />
        ))}
        {selectedPlace && (
          <Marker
            position={[selectedPlace.lat, selectedPlace.lng]}
          >
            <Popup onClose={handlePopupClose}>
              <div>
                <center>
                  <b>poste police</b>
                 
                  <p>adresse: {selectedPlace.adress}</p>
                  <p>contact: {selectedPlace.contact}</p>
                </center>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default InfoPage;
