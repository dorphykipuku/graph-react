import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker} from "google-maps-react";


const Clignotant = ({ google }) => {
 
const [blinkMarker, setBlinkMarker]= useState(false)


useEffect(()=>{
    const blinkInterval= setInterval(()=>{
        setBlinkMarker((prevBlinkMarker)=> !prevBlinkMarker);
    }, 500);

    return ()=>{
        clearInterval(blinkInterval);
    }
}, []);

const getBlinkMarkerIcon = ()=>{
    return blinkMarker ? 'au secours ! ' : '';
}
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
   
          <Marker
          
            icon={
             getBlinkMarkerIcon()
            }
            position={{
              lat:  -4.441931,
              lng: 15.266293
            }}
         
          />
        
    
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjDwp89gISztoEQHuaXhfrptjx_qfLeBg"
})(Clignotant);