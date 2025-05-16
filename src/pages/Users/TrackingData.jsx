import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrack } from "../../redux/slices/userSlice";

const TrackingData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.UserData.userTrackInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const trackData = location.state?.item;
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is coming back from `/locations`
  const isReturningFromLocations = sessionStorage.getItem("returningFromLocations") === "true";

  // Function to get stored date, reset only if coming from a different page
  const getStoredDate = () => {
    const storedDate = localStorage.getItem("selectedDate");
    if (isReturningFromLocations && storedDate) {
      return new Date(storedDate); // Keep the same date if returning from /locations
    }
    return new Date(); // Reset to today if coming from another page
  };

  const [selectedDate, setSelectedDate] = useState(getStoredDate());

  // Reset flag after component mounts
  useEffect(() => {
    sessionStorage.removeItem("returningFromLocations");
  }, []);

  // Format date for API call (DD-MM-YYYY)
  const formattedDate =
    selectedDate.getDate().toString().padStart(2, "0") +
    "-" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    selectedDate.getFullYear();

  // Fetch tracking data when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      dispatch(getUserTrack({ id: trackData?._id, date: formattedDate })).finally(() =>
        setLoading(false)
      );
    }
  }, [selectedDate, dispatch, trackData?._id, formattedDate]);

  // Save selected date to localStorage when user changes it
  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date);
  };

  // Handle navigation to locations page
  const handleViewLocations = (locations) => {
    sessionStorage.setItem("returningFromLocations", "true"); // Set flag before navigating
    navigate(`/locations`, { state: { locations } });
  };

  // Filter data based on selected date
  const filteredData = data?.filter((item) => {
    return new Date(item.createdAt).toDateString() === selectedDate.toDateString();
  });

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle="Tracking Routes" showBackButton={true} />
      <main className="container my-4">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaCalendarAlt className="me-2" /> Filter by Date
          </button>
          {showCalendar && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control ms-2"
              placeholderText="Select a date"
            />
          )}
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="text-center">
            <p>No tracking records found for the selected date.</p>
          </div>
        ) : (
          <div className="d-flex flex-column">
            {filteredData.map((data, index) => (
              <div key={data.id} className="col-md-12 mb-3">
                <div className="d-flex align-items-center bg-light p-3 rounded shadow-sm w-100">
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">Tracking #{index + 1}</h6>
                    <p className="mb-1 text-muted">
                      Check In Time: {formatTime(data?.createdAt)}
                    </p>
                    <p className="mb-0 text-muted">
                      Check Out Time: {formatTime(data.end_at)}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewLocations(data?.locations)}
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TrackingData;
