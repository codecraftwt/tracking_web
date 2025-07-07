import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaCalendarAlt,
  FaEye,
  FaRoute,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserTrack,
  getUserTrackedDates,
} from "../../redux/slices/userSlice";
import { Card, Badge, Button } from "react-bootstrap";
import { formatDateLocal } from "../../utils/dateFormat";

const TrackingData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.UserData.userTrackInfo);
  const trackedDates = useSelector((state) => state.UserData.trackedDates);
  const location = useLocation();
  const navigate = useNavigate();
  const trackData = location.state?.item;
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("data from the user of tracking data", trackedDates);

  // Check if user is coming back from `/locations`
  const isReturningFromLocations =
    sessionStorage.getItem("returningFromLocations") === "true";

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
      dispatch(
        getUserTrack({ id: trackData?._id, date: formattedDate })
      ).finally(() => setLoading(false));
    }
  }, [selectedDate, dispatch, trackData?._id, formattedDate]);

  useEffect(() => {
    dispatch(getUserTrackedDates(trackData?._id));
  }, [dispatch, trackData?._id]);

  // Save selected date to localStorage when user changes it
  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date);
    setShowCalendar(false);
    setShowCalendar(false); // Close calendar after selection
  };

  // Clear filter and show latest data
  const clearFilter = () => {
    const today = new Date();
    setSelectedDate(today);
    localStorage.removeItem("selectedDate"); // Remove stored date
    setShowCalendar(false);
  };

  // Check if current date is today
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Handle navigation to locations page
  const handleViewLocations = (locations) => {
    sessionStorage.setItem("returningFromLocations", "true"); // Set flag before navigating
    navigate(`/locations`, { state: { locations } });
  };

  // Filter data based on selected date
  const filteredData = data?.filter((item) => {
    return (
      new Date(item.createdAt).toDateString() === selectedDate.toDateString()
    );
  });

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Tracking Routes" showBackButton={true} />
      <main className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <FaRoute className="me-2" style={{ color: "#3B82F6" }} />
                <div>
                  <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                    Tracking Routes
                  </h5>
                  <small className="text-muted">
                    {isToday
                      ? "Showing latest tracking data"
                      : `Showing data for ${selectedDate.toLocaleDateString()}`}
                  </small>
                </div>
              </div>
              <Badge
                bg="primary"
                className="px-3 py-2 rounded-pill"
                style={{ fontSize: "14px", whiteSpace: "nowrap" }}
              >
                {filteredData?.length || 0} Records
              </Badge>
            </div>

            {/* Date Filter Section */}
            <Card
              className="border-0 shadow-sm mb-4"
              style={{ borderRadius: "12px" }}
            >
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt
                      className="me-2"
                      style={{ color: "#3B82F6" }}
                    />
                    <span className="fw-semibold" style={{ color: "#374151" }}>
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {!isToday && (
                      <Badge
                        bg="warning"
                        className="ms-2 px-2 py-1"
                        style={{ fontSize: "10px" }}
                      >
                        Filtered
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center"
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{ borderRadius: "8px" }}
                  >
                    <FaCalendarAlt className="me-2" />
                    Change Date
                  </Button>
                </div>

                {showCalendar && (
                  <div className="mt-3 p-3 bg-white">
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                      maxDate={new Date()}
                      tileClassName="text-dark"
                      next2Label={null}
                      prev2Label={null}
                      tileContent={({ date, view }) => {
                        if (view === "month") {
                          const dateStr = formatDateLocal(date);
                          if (trackedDates.includes(dateStr)) {
                            return (
                              <div
                                style={{
                                  height: 6,
                                  width: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "#0047b3",
                                  margin: "0 auto",
                                  marginTop: 2,
                                }}
                              />
                            );
                          }
                        }
                        return null;
                      }}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Loading State */}
            {loading && (
              <Card
                className="border-0 shadow-sm text-center py-5"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="text-muted">Loading tracking data...</h6>
                </Card.Body>
              </Card>
            )}

            {/* Empty State */}
            {!loading && filteredData?.length === 0 && (
              <Card
                className="border-0 shadow-sm text-center py-5"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  <FaRoute size={48} className="text-muted mb-3" />
                  <h6 className="text-muted">No tracking records found</h6>
                  <p className="text-muted small">
                    No tracking data available for the selected date.
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Tracking Data Cards */}
            {!loading && filteredData?.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {filteredData.map((data, index) => (
                  <Card
                    key={`${data._id || data.id || "track"}-${index}-${
                      data.createdAt
                    }`}
                    className="border-0 shadow-sm"
                    style={{ borderRadius: "12px" }}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3">
                              <FaRoute size={20} style={{ color: "#3B82F6" }} />
                            </div>
                            <div>
                              <h6
                                className="fw-semibold mb-1"
                                style={{ color: "#1f2937" }}
                              >
                                Tracking Session #{index + 1}
                              </h6>
                              <small className="text-muted">
                                Route ID: {data.id}
                              </small>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-2">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-2"
                                  style={{ color: "#22C55E" }}
                                />
                                <div>
                                  <small className="text-muted d-block">
                                    Check In
                                  </small>
                                  <span
                                    className="fw-semibold"
                                    style={{ color: "#374151" }}
                                  >
                                    {formatTime(data?.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6 mb-2">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-2"
                                  style={{ color: "#F59E0B" }}
                                />
                                <div>
                                  <small className="text-muted d-block">
                                    Check Out
                                  </small>
                                  <span
                                    className="fw-semibold"
                                    style={{ color: "#374151" }}
                                  >
                                    {formatTime(data.end_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center">
                            <FaMapMarkerAlt
                              className="me-2"
                              style={{ color: "#3B82F6" }}
                            />
                            <small className="text-muted">
                              {data?.locations?.length || 0} locations tracked
                            </small>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          className="d-flex align-items-center"
                          onClick={() => handleViewLocations(data?.locations)}
                          style={{
                            borderRadius: "8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <FaEye className="me-2" />
                          View Route
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingData;
