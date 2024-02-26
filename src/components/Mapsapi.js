import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import axios from "axios";


const InfoPage = ({ google }) => {
  const [coords, setCoords] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchedCoords, setSearchedCoords] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const [services, setServices] = useState('')
  

useEffect(() => {
  // Utiliser la géolocalisation du navigateur pour obtenir la position de l'utilisateur
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      console.error('Erreur de géolocalisation : ', error);
    }
  );
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/p");
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

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (services.trim() !== "") {
      try {
        // Utilisez l'état services ici
        const response = await axios.get(
          `http://localhost:8080/p/services/${services}`
        );
        setSearchedCoords(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearchChange = (event) => {
    // Utilisez l'état services ici
    setServices(event.target.value);
  };

  const filterMarkers = () => {
    if (services === "") {
      return coords;
    } else {
      return coords.filter((coord) => coord.services === services);
    }
  };


  return (
    <div className="mapcontainer">
      <div className="row">
        <div className="col-md-5 ">
       
      
       
        </div>
      <form onSubmit={handleSearchSubmit} className="col-md-3 mt-1">
        <input
          type="text"
          placeholder="Rechercher une adresse"
          value={services}
          onChange={handleSearchChange}
          className="form-control"
        />
          
        
      </form>
   
      </div>
    
      <br />
      <Map
        google={google}
        initialCenter={{
          lat: -4.441931,
          lng: 15.266293
        }}
        zoom={11}
      >
        {filterMarkers().map((coord) => (
          
          <Marker
            key={coord.idPoste}
            icon={{
             
              url: "https://cdn-icons-png.flaticon.com/128/4468/4468532.png",
              scaledSize: new google.maps.Size(50, 50)
            }}
            position={{
              lat: coord.latitude,
              lng: coord.longitude,
            }}
            onClick={(props, marker) => handleMarkerClick(props, marker, coord)}
          />
          
        ))}
          {userLocation && (
      
          <Marker
            position={userLocation}
            title="Emplacement actuel de l'utilisateur"
          />
        
      )}


        <InfoWindow
          marker={activeMarker}
          visible={selectedPlace !== null}
          onClose={handleInfoWindowClose}
        >
          <div>
          
            {selectedPlace && (
              <div className="card">
                <div className="card-header">
                <h4>{selectedPlace.typePoste} {selectedPlace.nomPoste}</h4>
                </div>
               <div className="card-body">
                 <p>Adresse : {selectedPlace.adresse}</p>
                 <p>services :  {selectedPlace.services}</p>
                 <p>contact : {selectedPlace.telephone}</p>
                
               </div>
               <div className="card-footer"></div>
             
              </div>
            )}
          
          </div>
        </InfoWindow>
      </Map>
      <div className="row mt-5">
          <div className="col-md-12 text-center">
            <footer>
              <p>&copy; 2023 Urgence-App. All Rights Reserved.</p>
            </footer>
          </div>
        </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg"
})(InfoPage);
