import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaChevronCircleLeft, FaTint } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

// Reusable Checkbox component
const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    style={{ transform: "scale(1.2)" }}
    checked={checked}
    onChange={onChange}
  />
);

// TableRow component
const TableRow = ({ item, index, selectedItems, onCheckboxChange }) => {
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
            // color: isActive ? "#399717" : "#9B2A2A",
          }}
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

const Table = () => {
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
      status: "Inactive",
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
      status: "Inactive",
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

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

  return (
    <div style={styles.container}>
      {/* Search Box */}
      <div style={styles.searchContainer}>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
        {/* <IoSearch style={styles.searchIcon} /> */}
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
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FFFF",
    // minHeight: "100vh",
    padding: "16px",
    color: "#333",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    position: "relative", // This is necessary to position the icon inside the input
  },
  searchInput: {
    width: "100%",
    maxWidth: "236px",
    padding: "6px 16px", // Left and right padding to make room for the icon
    paddingRight: "30px", // Adjust padding on the right to give space for the icon
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "1px solid #E0E0E0",
    outline: "none",
    fontSize: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.2s ease-in-out",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)", // To vertically center the icon
    color: "#333", // Icon color (same as input text color)
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
      textAlign: "center"
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
  },
  actionButton: () => ({
    // color: color,
    cursor: "pointer",
    border: "none",
    backgroundColor: "#FFFF",
    // transition: "color 0.2s",
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
    gap: "8px",
  },
  paginationButton: {
    // padding: "8px 16px",
    //   /  borderRadius: "30px",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    transition: "background-color 0.2s",
    border: "none",
  },
  icon: {
    fontSize: "18px",
    color: "#636087", // Initial base color
    transition: "color 0.3s ease, transform 0.2s ease",
  },
  iconHover: {
    color: "#339FFF", // Hover state (light blue)
  },
  iconActive: {
    color: "#66A9FF", // Active state (even lighter blue)
  },
  iconFocus: {
    color: "#99B3FF", // Focus state (lighter blue)
  },
};

export default Table;
