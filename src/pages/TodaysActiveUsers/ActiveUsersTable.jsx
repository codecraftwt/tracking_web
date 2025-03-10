import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

// Reusable Checkbox component
const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    style={{ transform: "scale(1.2)" }}
    checked={checked}
    onChange={onChange}
  />
);

// Modal Component to show user details
const Modal = ({ user, onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeButton}>
          &times;
        </button>

        {/* Modal Content */}
        <div style={styles.content}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            <div style={styles.field}>
              <p style={styles.label}>Name</p>
              <div style={styles.value}>{user.nickname}</div>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Email</p>
              <div style={styles.value}>{user.email}</div>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Birth Day</p>
              <div style={styles.value}>{user.date}</div>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            {/* <img
              src={user.profileImage}
              alt="Profile"
              style={styles.profileImage}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// TableRow component
const TableRow = ({ item, index, selectedItems, onCheckboxChange, onStatusClick }) => {
  const isActive = item.status === "Active";
  return (
    <tr style={styles.row}>
      <td style={{ ...styles.cell, textAlign: "center" }}>
        <Checkbox
          checked={selectedItems.includes(item.id)}
          onChange={() => onCheckboxChange(item.id)}
        />
      </td>
      <td style={styles.cell}>{index + 1}</td>
      <td style={styles.cell}>{item.nickname}</td>
      <td style={styles.cell}>{item.email}</td>
      <td style={styles.cell}>{item.date}</td>
      <td style={styles.cell}>
        <span
          style={{
            ...styles.statusBadge,
            borderColor: isActive ? "#399717" : "#9B2A2A",
          }}
          onClick={() => onStatusClick(item)} // Trigger modal on click
        >
          {item.status}
        </span>
      </td>
      <td style={styles.cell}>
        <button style={styles.actionButton("")} onClick={() => alert("Delete")}>
          <img
            src="src/assets/Images/block.png"
            width="19.25px"
            height="19.25px"
            alt="demo"
            style={{ marginTop: 4 }}
          />
        </button>
        <button
          style={styles.actionButton("")}
          onClick={() => alert("Message")}
        >
          <img
            src="src/assets/Images/msg.png"
            width="19.25px"
            height="19.25px"
            alt="demo"
            style={{ marginLeft: 3, marginTop: 4 }}
          />
        </button>
      </td>
    </tr>
  );
};

const ActiveUsersTable = () => {
  const data = [
    {
      id: 1,
      nickname: "John Doe",
      email: "john@example.com",
      date: "2023-11-14",
      status: "Active",
    },
    {
      id: 2,
      nickname: "Jane Smith",
      email: "jane@example.com",
      date: "2023-11-13",
      status: "Active",
    },
    {
      id: 3,
      nickname: "Tom Brown",
      email: "tom@example.com",
      date: "2023-11-12",
      status: "Active",
    },
    {
      id: 4,
      nickname: "Alice Green",
      email: "alice@example.com",
      date: "2023-11-11",
      status: "Active",
    },
    {
      id: 5,
      nickname: "Bob White",
      email: "bob@example.com",
      date: "2023-11-10",
      status: "Active",
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [modalData, setModalData] = useState(null); // State to hold user data for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const handleStatusClick = (user) => {
    setModalData(user); // Set the user data when status is clicked
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalData(null); // Reset modal data
  };

  return (
    <div style={styles.container}>
      {/* Search Box */}
      <div style={styles.searchContainer}>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                <Checkbox
                  checked={selectedItems.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={styles.headerCell}>#</th>
              <th style={styles.headerCell}>Nick Name</th>
              <th style={styles.headerCell}>Email</th>
              <th style={styles.headerCell}>Date</th>
              <th style={styles.headerCell}>Status</th>
              <th style={styles.headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                item={item}
                index={index}
                selectedItems={selectedItems}
                onCheckboxChange={handleCheckboxChange}
                onStatusClick={handleStatusClick} // Pass status click handler
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <span>1</span>
        <div style={styles.paginationButtons}>
          <button style={styles.paginationButton}>
            <FaChevronCircleLeft style={styles.icon} />
          </button>
          <button style={styles.paginationButton}>
            <FaChevronCircleRight style={styles.icon} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <Modal user={modalData} onClose={closeModal} />
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FFFF",
    padding: "16px",
    color: "#333",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    position: "relative",
  },
  searchInput: {
    width: "100%",
    maxWidth: "236px",
    padding: "6px 16px",
    paddingRight: "30px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "1px solid #E0E0E0",
    outline: "none",
    fontSize: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.2s ease-in-out",
  },
  table: {
    width: "100%",
    textAlign: "left",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  headerCell: {
    padding: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#F5F3FA",
    color: "#000",
    textAlign: "center",
    minWidth: "100px",
  },
  cell: {
    padding: "12px",
    color: "#333",
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "center",
  },
  row: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #E0E0E0",
  },
  statusBadge: {
    padding: "0px 15px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: "400",
    borderWidth: "1px",
    borderStyle: "solid",
    color: "#000",
    cursor: "pointer",
  },
  actionButton: () => ({
    cursor: "pointer",
    border: "none",
    backgroundColor: "#FFFF",
  }),
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    color: "#666",
  },
  paginationButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  paginationButton: {
    backgroundColor: "#F5F3FA",
    padding: "5px 10px",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    cursor: "pointer",
  },
  icon: {
    fontSize: "16px",
    color: "#666",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    padding: "24px",
    width: "400px",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    // gap: "8px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  },
  value: {
    backgroundColor: "#F5F3FA",
    padding: "8px 12px",
    borderRadius: "5px",
    color: "#333",
    fontSize: "14px",
  },
  rightColumn: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover",
  },
};

export default ActiveUsersTable;
