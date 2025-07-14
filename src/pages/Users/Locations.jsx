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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries: ["places"],
  });

  const imageCoordinates = coordinates.filter((c) => c.location_image);
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

  // Get camera icon for locations with images
  const getCameraIcon = useCallback(
    (size = 28) => {
      if (!isLoaded) return undefined;

      return {
        url: `https://cdn-icons-png.freepik.com/512/609/609673.png`,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size),
      };
    },
    [isLoaded]
  );

  const snapToRoads = async (rawCoords) => {
    if (!rawCoords || rawCoords.length === 0) return [];

    const path = rawCoords
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join("|");

    const url = `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(
      path
    )}&interpolate=true&key=${GOOGLE_MAPS_APIKEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.snappedPoints) return rawCoords;

      // Attach metadata to the snapped points
      const snapped = data.snappedPoints.map((point, i) => {
        // Try to use original metadata if available (match by originalIndex)
        const originalIndex = point.originalIndex;
        const original = rawCoords[originalIndex] || {};

        return {
          lat: point.location.latitude,
          lng: point.location.longitude,
          timestamp: original.timestamp || null,
          accuracy: original.accuracy || null,
          location_image: original.location_image || null,
          id: original.id || i,
        };
      });

      return snapped;
    } catch (err) {
      console.error("Failed to snap to roads:", err);
      return rawCoords;
    }
  };

  // Process locations and set coordinates
  useEffect(() => {
    const processCoordinates = async () => {
      if (isLoaded && locations?.length) {
        const rawCoords = locations
          .map((loc) => ({
            lat: parseFloat(loc.latitude),
            lng: parseFloat(loc.longitude),
            timestamp: loc.timestamp || loc.createdAt,
            accuracy: loc.accuracy,
            location_image: loc.location_image || null,
            id: loc._id,
          }))
          .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

        const snappedCoords = await snapToRoads(rawCoords);
        setCoordinates(snappedCoords);

        if (snappedCoords.length > 0) {
          const midIndex = Math.floor(snappedCoords.length / 2);
          setMapCenter(snappedCoords[midIndex]);

          try {
            const bounds = new window.google.maps.LatLngBounds();
            snappedCoords.forEach((coord) => bounds.extend(coord));
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
            setMapZoom(14);
          }
        }
      }
    };

    processCoordinates();
  }, [locations, isLoaded]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowRight") {
          setSelectedImageIndex(
            (selectedImageIndex + 1) % imageCoordinates.length
          );
        } else if (e.key === "ArrowLeft") {
          setSelectedImageIndex(
            (selectedImageIndex - 1 + imageCoordinates.length) %
              imageCoordinates.length
          );
        } else if (e.key === "Escape") {
          handleCloseInfoWindow();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, imageCoordinates.length]);

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

  const handleImageMarkerClick = (coord) => {
    const index = imageCoordinates.findIndex((c) => c.id === coord.id);
    if (index !== -1) {
      setSelectedImageIndex(index);
    }
  };
  const handleCloseInfoWindow = () => {
    setSelectedImageIndex(null);
  };

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

          {/* Image Markers */}
          {coordinates.map(
            (coord, index) =>
              coord.location_image && (
                <Marker
                  key={`image-${coord.id || index}`} // Use id if available, otherwise fall back to index
                  position={coord}
                  // title="Image Location"
                  icon={getCameraIcon()}
                  clickable={true}
                  onClick={() => handleImageMarkerClick(coord, index)}
                />
              )
          )}

          {selectedImageIndex !== null && (
            <div className="fullscreen-overlay" onClick={handleCloseInfoWindow}>
              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseInfoWindow();
                }}
              >
                &times;
              </button>

              {/* Prev Button */}
              <button
                className="nav-button left"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(
                    (selectedImageIndex - 1 + imageCoordinates.length) %
                      imageCoordinates.length
                  );
                }}
              >
                <FaArrowLeft />
              </button>

              {/* Image */}
              <img
                src={imageCoordinates[selectedImageIndex].location_image}
                alt="Location fullscreen"
              />

              {/* Timestamp */}
              <div className="mt-3 text-light small">
                {imageCoordinates[selectedImageIndex]?.timestamp &&
                  new Date(
                    imageCoordinates[selectedImageIndex].timestamp
                  ).toLocaleString()}
              </div>

              {/* Next Button */}
              <button
                className="nav-button right"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(
                    (selectedImageIndex + 1) % imageCoordinates.length
                  );
                }}
              >
                <FaArrowRight />
              </button>
            </div>
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
                <span>Images:</span>
                <span className="fw-semibold">
                  {coordinates.filter((c) => c.location_image).length}
                </span>
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
