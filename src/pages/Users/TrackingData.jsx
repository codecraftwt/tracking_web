import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaEye, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from "react-router-dom";

const trackingData = [
  {
    id: 1,
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    startLocation: "New York, NY",
    endLocation: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 2,
    startTime: "10:00 AM",
    endTime: "11:45 AM",
    startLocation: "Los Angeles, CA",
    endLocation: "Santa Monica, CA",
    image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
  },
  {
    id: 3,
    startTime: "12:15 PM",
    endTime: "01:30 PM",
    startLocation: "Chicago, IL",
    endLocation: "Evanston, IL",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
  },
  {
    id: 4,
    startTime: "02:00 PM",
    endTime: "03:45 PM",
    startLocation: "Miami, FL",
    endLocation: "Fort Lauderdale, FL",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  },
  {
    id: 5,
    startTime: "04:30 PM",
    endTime: "06:00 PM",
    startLocation: "Seattle, WA",
    endLocation: "Bellevue, WA",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
];

const TrackingData = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalShow(true);
  };
  const navigate = useNavigate();

  const handleViewLocations = (startLocation, endLocation) => {
    navigate(
      `/locations?start=${encodeURIComponent(startLocation)}&end=${encodeURIComponent(endLocation)}`
    );
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
              onChange={(date) => setSelectedDate(date)}
              className="form-control ms-2"
              placeholderText="Select a date"
            />
          )}
        </div>

        <div className="d-flex flex-column">
          {trackingData.map((data) => (
            <div key={data.id} className="col-md-12 mb-3">
              <div className="d-flex align-items-center bg-light p-3 rounded shadow-sm w-100">
                <img
                  src={data.image}
                  alt="Tracking"
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  onClick={() => handleImageClick(data.image)}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-bold">Tracking #{data.id}</h6>
                  <p className="mb-1 text-muted">
                    <FaClock className="me-1" /> {data.startTime} -{" "}
                    {data.endTime}
                  </p>
                  <p className="mb-0 text-muted">
                    <FaMapMarkerAlt className="me-1" /> {data.startLocation} →{" "}
                    {data.endLocation}
                  </p>
                </div>
                <button className="btn btn-primary btn-sm"
                     onClick={() => handleViewLocations(data.startLocation, data.endLocation)}>
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Image Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Body className="p-3 text-center">
          <img
            src={selectedImage}
            alt="Enlarged"
            className="img-fluid rounded"
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setModalShow(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrackingData;
