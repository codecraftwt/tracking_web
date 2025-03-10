import React, { useState } from "react";
import { FaChevronCircleLeft, FaTint } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    style={{ transform: "scale(1.2)" }}
    checked={checked}
    onChange={onChange}
  />
);

const TableRow = ({ item, index, selectedItems, onCheckboxChange }) => {
  const decisionColors = {
    Removed: "#B8AADA",
    Deactivated: "#9B2A2A",
    None: "#b5b5b5",
    Denied: "#FF9292",
  };

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
      <td style={styles.cell}>{item.reporterName}</td>
      <td style={styles.cell}>{item.reportedPerson}</td>
      <td style={styles.cell}>{item.email}</td>
      <td style={styles.cell}>
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: decisionColors[item.decision] || "#FFFFFF",
            color: isActive ? "#fff" : "#fff",
            border: "none",
          }}
        >
          {item.decision}
        </span>
      </td>
    </tr>
  );
};

const ReportTables = () => {
  const data = [
    {
      id: 1,
      reporterName: "John Doe",
      reportedPerson: "Alice Green",
      email: "john@example.com",
      decision: "Removed",
    },
    {
      id: 2,
      reporterName: "Jane Smith",
      reportedPerson: "Tom Brown",
      email: "jane@example.com",
      decision: "Deactivated",
    },
    {
      id: 3,
      reporterName: "Tom Brown",
      reportedPerson: "Bob White",
      email: "tom@example.com",
      decision: "None",
    },
    {
      id: 4,
      reporterName: "Alice Green",
      reportedPerson: "John Doe",
      email: "alice@example.com",
      decision: "Denied",
    },
    {
      id: 5,
      reporterName: "Bob White",
      reportedPerson: "Jane Smith",
      email: "bob@example.com",
      decision: "Removed",
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
      <div style={styles.searchContainer}>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
        {/* <IoSearch style={styles.searchIcon} /> */}
      </div>

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
              <th style={styles.headerCell}>REPORTER’S NAME</th>
              <th style={styles.headerCell}>REPORTED PERSON</th>
              <th style={styles.headerCell}>EMAIL</th>
              <th style={styles.headerCell}>DECISION</th>
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
    border: "1px solid #E0E0E0",
    outline: "none",
    fontSize: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.2s ease-in-out",
  },
  tableWrapper: {
    overflowX: "auto",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#333",
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
    width: "87px",
    height: "21px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: "400",
    borderWidth: "1px",
    borderStyle: "solid",
    color: "#000",

    margin: "0 auto",
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
    color: "#636087",
    transition: "color 0.3s ease, transform 0.2s ease",
  },
  iconHover: {
    color: "#339FFF",
  },
  iconActive: {
    color: "#66A9FF",
  },
  iconFocus: {
    color: "#99B3FF",
  },
};

export default ReportTables;
