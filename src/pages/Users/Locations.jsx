import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import Navbar from "../../components/Navbar";
import "./Locations.css";

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

const GOOGLE_MAPS_APIKEY = "AIzaSyBO02PT60O5rJxH4QuRQc_hmbtUjuTN3jI";

const Locations = () => {
  const location = useLocation();
  const { locations } = location.state || {};
  const [coordinates, setCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(14);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries: ["places"],
  });

  // Get icon configuration only when Google Maps is loaded
  const getIconConfig = useCallback(
    (color, size = 32) => {
      if (!isLoaded) return undefined;

      return {
        url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size),
      };
    },
    [isLoaded]
  );

  // Process locations and set coordinates
  useEffect(() => {
    if (isLoaded && locations?.length) {
      const coords = locations
        .map((loc) => ({
          lat: parseFloat(loc.latitude),
          lng: parseFloat(loc.longitude),
          timestamp: loc.timestamp || loc.createdAt,
          accuracy: loc.accuracy,
        }))
        .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

      setCoordinates(coords);

      // Set map center and zoom level
      if (coords.length > 0) {
        const midIndex = Math.floor(coords.length / 2);
        setMapCenter(coords[midIndex]);

        // Calculate bounds and zoom level
        try {
          const bounds = new window.google.maps.LatLngBounds();
          coords.forEach((coord) => bounds.extend(coord));
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          const latDiff = Math.abs(ne.lat() - sw.lat());
          const lngDiff = Math.abs(ne.lng() - sw.lng());
          const maxDiff = Math.max(latDiff, lngDiff);

          if (maxDiff > 0.1) setMapZoom(10);
          else if (maxDiff > 0.05) setMapZoom(12);
          else if (maxDiff > 0.01) setMapZoom(14);
          else setMapZoom(16);
        } catch (error) {
          console.error("Error calculating bounds:", error);
          setMapZoom(14); // Default zoom if bounds calculation fails
        }
      }
    }
  }, [locations, isLoaded]);

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (coordinates.length > 0 && isLoaded) {
        try {
          const bounds = new window.google.maps.LatLngBounds();
          coordinates.forEach((coord) => bounds.extend(coord));
          map.fitBounds(bounds);

          window.google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            () => {
              map.setZoom(Math.min(map.getZoom(), 16));
            }
          );
        } catch (error) {
          console.error("Error fitting bounds:", error);
        }
      }
    },
    [coordinates, isLoaded]
  );

  if (loadError) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center error-container">
        <div className="text-center">
          <h4>Error loading maps</h4>
          <p className="text-light">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center loading-container">
        <div className="text-center">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Maps...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle="Route Tracking" showBackButton={true} />
      <main
        className="container-fluid p-0"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          onLoad={handleMapLoad}
          center={mapCenter}
          zoom={mapZoom}
          options={{
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
            zoomControl: true,
            scaleControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {/* Route Polyline */}
          {coordinates.length > 1 && (
            <Polyline
              path={coordinates}
              options={{
                strokeColor: "#3B82F6",
                strokeOpacity: 0.8,
                strokeWeight: 4,
                geodesic: true,
                icons: [
                  {
                    icon: {
                      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                      scale: 3,
                      strokeColor: "#3B82F6",
                    },
                    offset: "50%",
                    repeat: "100px",
                  },
                ],
              }}
            />
          )}

          {/* Start Marker */}
          {coordinates.length > 0 && (
            <Marker
              position={coordinates[0]}
              title="Start Location"
              icon={getIconConfig("green")}
              label={{
                text: "START",
                className: "marker-label start-label",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          )}

          {/* End Marker */}
          {coordinates.length > 1 && (
            <Marker
              position={coordinates[coordinates.length - 1]}
              title="End Location"
              icon={getIconConfig("red")}
              label={{
                text: "END",
                className: "marker-label end-label",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          )}
        </GoogleMap>

        {/* Route Information Panel */}
        {coordinates.length > 0 && (
          <div
            className="position-absolute top-0 end-0 m-3 p-3 route-info-panel rounded"
            style={{
              maxWidth: "300px",
              zIndex: 1000,
              backgroundColor: "white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h6 className="fw-bold mb-2">Route Information</h6>
            <div className="small">
              <div className="d-flex justify-content-between mb-1">
                <span>Total Points:</span>
                <span className="fw-semibold">{coordinates.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>Start Time:</span>
                <span className="fw-semibold">
                  {coordinates[0]?.timestamp
                    ? new Date(coordinates[0].timestamp).toLocaleTimeString()
                    : "N/A"}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>End Time:</span>
                <span className="fw-semibold">
                  {coordinates[coordinates.length - 1]?.timestamp
                    ? new Date(
                        coordinates[coordinates.length - 1].timestamp
                      ).toLocaleTimeString()
                    : "N/A"}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Route Type:</span>
                <span className="fw-semibold text-primary">GPS Tracking</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Locations;
