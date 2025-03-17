import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import Navbar from "../../components/Navbar";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const polylineOptions = {
  strokeColor: "#0000FF",
  strokeOpacity: 1,
  strokeWeight: 4,
};

const Locations = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const start = queryParams.get("start");
  const end = queryParams.get("end");

  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    getCoordinates();
  }, [start, end, location.search]);
 
    const getCoordinates = async () => {
      if (!start || !end) return;

      try {
        setLoading(true);
        const geocode = async (address) => {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address
            )}&key=AIzaSyCzAtEFCqCmNC-fmQLmFsJr9YLCmHoL6T8`
          );
          const data = await response.json();
          return data.status === "OK"
            ? data.results[0]?.geometry.location
            : null;
        };

        const [startCoords, endCoords] = await Promise.all([
          geocode(start),
          geocode(end),
        ]);

        if (startCoords && endCoords) {
          setCoordinates([startCoords, endCoords]);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };   

  

  useEffect(() => {
    if (mapRef.current && coordinates.length === 2) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
    }
  }, [coordinates]);

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle="Location" showBackButton={true} />
      <main className="container my-4">
        <LoadScript googleMapsApiKey="AIzaSyCzAtEFCqCmNC-fmQLmFsJr9YLCmHoL6T8">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            onLoad={(map) => (mapRef.current = map)}
            zoom={10}
            center={coordinates[0] || { lat: 37.7749, lng: -122.4194 }}
          >
            {!loading && coordinates.length === 2 && (
              <>
                <Marker position={coordinates[0]} label="Start" />
                <Marker position={coordinates[1]} label="End" />
                <Polyline path={coordinates} options={polylineOptions} />
              </>
            )}
          </GoogleMap>
        </LoadScript>
      </main>
    </div>
  );
};

export default Locations;
