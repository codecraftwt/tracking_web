import React, { useState } from "react";
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

const UserTable = () => {
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
    {
      id: 6,
      nickname: "Charlie Blue",
      email: "charlie@example.com",
      date: "2023-11-09",
      status: "Inactive",
    },
    {
      id: 7,
      nickname: "Eva Black",
      email: "eva@example.com",
      date: "2023-11-08",
      status: "Active",
    },
    {
      id: 8,
      nickname: "Daniel Gray",
      email: "daniel@example.com",
      date: "2023-11-07",
      status: "Active",
    },
    {
      id: 9,
      nickname: "Fiona Yellow",
      email: "fiona@example.com",
      date: "2023-11-06",
      status: "Inactive",
    },
    {
      id: 10,
      nickname: "George Red",
      email: "george@example.com",
      date: "2023-11-05",
      status: "Active",
    },
    {
      id: 11,
      nickname: "Hannah Purple",
      email: "hannah@example.com",
      date: "2023-11-04",
      status: "Inactive",
    },
    {
      id: 12,
      nickname: "Isaac Silver",
      email: "isaac@example.com",
      date: "2023-11-03",
      status: "Active",
    },
    {
      id: 13,
      nickname: "Jack Gold",
      email: "jack@example.com",
      date: "2023-11-02",
      status: "Inactive",
    },
    {
      id: 14,
      nickname: "Kim White",
      email: "kim@example.com",
      date: "2023-11-01",
      status: "Active",
    },
    {
      id: 15,
      nickname: "Liam Pink",
      email: "liam@example.com",
      date: "2023-10-31",
      status: "Active",
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Active");

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

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredData = data.filter((user) => user.status === filterStatus);

  return (
    <div style={styles.container}>
      {/* Search Box */}
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
        </div>
        <div style={styles.btnsection}>
          <div
            style={styles.activeBtn}
            onClick={() => handleFilterChange("Active")}
          >
            Active
          </div>
          <div
            style={styles.inactiveBtn}
            onClick={() => handleFilterChange("Inactive")}
          >
            Inactive
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                <Checkbox
                  checked={selectedItems.length === filteredData.length}
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
            {filteredData.map((item, index) => (
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
    width: "236px",
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
  btnsection: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  activeBtn: {
    height: "34px",
    width: "108px",
    backgroundColor: "#399717",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    border: "1px solid #399717",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveBtn: {
    height: "34px",
    width: "108px",
    backgroundColor: "#9B2A2A",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    border: "1px solid #9B2A2A",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    gap: "8px",
  },
  paginationButton: {
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
};

export default UserTable;
