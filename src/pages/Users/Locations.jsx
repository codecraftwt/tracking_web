import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Navbar from "../../components/Navbar";

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

const GOOGLE_MAPS_APIKEY = "AIzaSyBO02PT60O5rJxH4QuRQc_hmbtUjuTN3jI"; 
const Locations = () => {
  const location = useLocation();
  const { locations } = location.state || {};
  const [coordinates, setCoordinates] = useState([]);
  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (locations?.length) {
      const coords = locations.map((loc) => ({
        lat: loc.latitude,
        lng: loc.longitude,
      }));
      setCoordinates(coords);
    }
  }, [locations]);

  useEffect(() => {
    if (isLoaded && coordinates.length > 1) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: coordinates[0], 
          destination: coordinates[coordinates.length - 1], 
          waypoints: coordinates
            .slice(1, -1)
            .map((coord) => ({ location: coord, stopover: false })), 
          travelMode: window.google.maps.TravelMode.DRIVING, 
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [isLoaded, coordinates]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle="Location" showBackButton={true} />
      <main
        className="container-fluid p-0"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          onLoad={handleMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            center: coordinates.length ? coordinates[0] : { lat: 0, lng: 0 },
            zoom: 14,
          }}
        >
          {/* ✅ Start Marker (Blue) */}
          {coordinates.length > 0 && (
            <Marker
              position={coordinates[0]}
              title="Start Location"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}

          {coordinates.length > 1 && (
            <Marker
              position={coordinates[coordinates.length - 1]}
              title="End Location"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#0000FF", 
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                },
                suppressMarkers: false, 
                suppressPolylines:false,
              }}
            />
          )}
        </GoogleMap>
      </main>
    </div>
  );
};

export default Locations;
