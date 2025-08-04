import { useEffect, useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from "../../components/Navbar";
import { getActiveUserLocations } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

const GOOGLE_MAPS_APIKEY = "AIzaSyBO02PT60O5rJxH4QuRQc_hmbtUjuTN3jI";

const ActiveUserLocations = () => {
  const dispatch = useDispatch();
  const { activeUserLocations, activeUserLocationsLoading } = useSelector(
    (state) => state.UserData
  );
  const [coordinates, setCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(14);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries,
  });

  useEffect(() => {
    dispatch(getActiveUserLocations());
  }, [dispatch]);

  const flattenedArray = useCallback(() => {
    if (!activeUserLocations) return [];
    return activeUserLocations.map((item) => ({
      email: item.email,
      name: item.name,
      trackerId: item.trackerId,
      userId: item.userId,
      longitude: item.latestLocation?.longitude,
      latitude: item.latestLocation?.latitude,
      location_image: item.latestLocation?.location_image,
      location_id: item.latestLocation?._id,
      timestamp: item.latestLocation?.timestamp,
    }));
  }, [activeUserLocations]);

  useEffect(() => {
    if (activeUserLocations?.length > 0 && mapReady) {
      const validLocations = activeUserLocations.filter(
        (item) =>
          item.latestLocation &&
          !isNaN(parseFloat(item.latestLocation.latitude)) &&
          !isNaN(parseFloat(item.latestLocation.longitude))
      );

      if (validLocations.length === 0) {
        setDataLoaded(true);
        return;
      }

      const coords = validLocations.map((item) => ({
        lat: parseFloat(item.latestLocation.latitude),
        lng: parseFloat(item.latestLocation.longitude),
        id: item.latestLocation._id,
        name: item.name,
        email: item.email,
        image: item.latestLocation.location_image,
        timestamp: item.latestLocation.timestamp,
      }));

      setCoordinates(coords);
      setDataLoaded(true);

      if (coords.length > 0) {
        const midIndex = Math.floor(coords.length / 2);
        setMapCenter(coords[midIndex]);

        if (window.google && mapRef.current) {
          try {
            const bounds = new window.google.maps.LatLngBounds();
            coords.forEach((c) => bounds.extend(c));
            mapRef.current.fitBounds(bounds);

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
            console.error("Error setting map bounds:", error);
            setMapZoom(14);
          }
        }
      }
    }
  }, [activeUserLocations, mapReady]);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapReady(true);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker((prev) => (prev?.id === marker.id ? null : marker));
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const LoadingSpinner = () => (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span className="ms-3">Loading user locations...</span>
    </div>
  );

  if (loadError) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h4>Error loading maps</h4>
          <p>Please check your internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle="Live User Locations" showBackButton={true} />
      <main
        className="container-fluid p-0"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={mapZoom}
          onLoad={handleMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
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
          {!activeUserLocationsLoading &&
            coordinates.map((coord) => (
              <Marker
                key={coord.id}
                position={coord}
                onClick={() => handleMarkerClick(coord)}
                icon={
                  coord.image
                    ? {
                        url: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
                        scaledSize: new window.google.maps.Size(32, 32),
                      }
                    : undefined
                }
              >
                {selectedMarker?.id === coord.id && (
                  <InfoWindow onCloseClick={handleInfoWindowClose}>
                    <div className="info-window-content">
                      <h6>{selectedMarker.name}</h6>
                      <p className="mb-1 small">{selectedMarker.email}</p>
                      <p className="small text-muted">
                        Last updated:{" "}
                        {new Date(selectedMarker.timestamp).toLocaleString()}
                      </p>
                      {selectedMarker.image && (
                        <img
                          src={selectedMarker.image}
                          alt="Location"
                          className="img-fluid mt-2"
                          style={{ maxWidth: "150px" }}
                        />
                      )}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>

        {activeUserLocationsLoading && <LoadingSpinner />}
      </main>
    </div>
  );
};

export default ActiveUserLocations;
