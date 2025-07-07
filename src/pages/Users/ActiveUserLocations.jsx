import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Navbar from "../../components/Navbar";
import "./Locations.css";
import { getActiveUserLocations } from "../../redux/slices/userSlice";

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
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center on India by default
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
    libraries: ["places"],
  });

  useEffect(() => {
    dispatch(getActiveUserLocations());
  }, [dispatch]);

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (activeUserLocations?.length && window.google && window.google.maps) {
        const bounds = new window.google.maps.LatLngBounds();
        activeUserLocations.forEach((user) => {
          if (user.latestLocation?.latitude && user.latestLocation?.longitude) {
            bounds.extend({
              lat: parseFloat(user.latestLocation.latitude),
              lng: parseFloat(user.latestLocation.longitude),
            });
          }
        });
        map.fitBounds(bounds);
      }
    },
    [activeUserLocations]
  );

  const userMarkerIcon = useMemo(() => {
    if (isLoaded && window.google && window.google.maps) {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 32),
      };
    }
    return null;
  }, [isLoaded]);

  if (loadError)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center error-container">
        <div className="text-center">
          <h4>Error loading maps</h4>
          <p className="text-light">Please check your internet connection</p>
        </div>
      </div>
    );

  if (!isLoaded || activeUserLocationsLoading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center loading-container">
        <div className="text-center">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Map & Locations...</h4>
        </div>
      </div>
    );

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
          zoom={5}
          onLoad={handleMapLoad}
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
          {activeUserLocations.map((user) => {
            const { latitude, longitude } = user.latestLocation || {};
            if (!latitude || !longitude) return null;

            return (
              <Marker
                key={user._id}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                title={`${user.name} (${user.email})`}
                // icon={userMarkerIcon || undefined}
                label={{
                  text: user.name || "User",
                  className: "marker-label",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              />
            );
          })}
        </GoogleMap>
      </main>
    </div>
  );
};

export default ActiveUserLocations;
