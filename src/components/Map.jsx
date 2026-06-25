import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import Button from "./Button.jsx";

import styles from "./Map.module.css";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPcation,
    getPosition,
  } = useGeolocation();

  // with this way can i getting my global state (state as url)
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPcation)
      setMapPosition([geoLocationPcation.lat, geoLocationPcation.lng]);
  }, [geoLocationPcation]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPcation && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <img src={city.imgUrl} alt="" />
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

/* eslint-disable react/prop-types */
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// get city when i clecked
function DetectClick() {
  // for moving by imbaretive way
  const navigate = useNavigate();
  // when i clicked in a specific ciyt show position in map
  // e => it's get all information about this city i clecked early
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
