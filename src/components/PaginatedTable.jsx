import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Pagination,
  Spinner,
  Badge,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUsers, FaFilter, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import moment from "moment";

const PaginatedTable = ({
  title = "Data List",
  subtitle = "Complete list of items",
  icon = <FaUsers />,
  columns = [],
  data = [],
  totalPages = 1,
  totalCount = 0,
  currentPage = 1,
  onPageChange = () => {},
  loading = false,
  rowRender = null,
  showDateFilter = false,
  onDateChange,
  currentDateRange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateRange, setDateRange] = useState(
    currentDateRange || { fromDate: "", toDate: "" }
  );

  useEffect(() => {
    setDateRange(currentDateRange || { fromDate: "", toDate: "" });
  }, [currentDateRange]);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleApplyFilter = () => {
    setShowDateModal(false);
    onDateChange(dateRange);
  };

  const handleClearFilter = () => {
    const clearedRange = { fromDate: "", toDate: "" };
    setDateRange(clearedRange);
    onDateChange(clearedRange);
    setShowDateModal(false);
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   const isCheckInData = columns.some((col) => col.key === "checkIn"); // Detect which type of data we're handling

  //   // Title
  //   doc.setFontSize(18);
  //   doc.text(`${title} Report`, 105, 15, { align: "center" });

  //   // Timestamp
  //   doc.setFontSize(10);
  //   doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 25, {
  //     align: "center",
  //   });

  //   // Date range if applied
  //   if (currentDateRange?.fromDate || currentDateRange?.toDate) {
  //     doc.setFontSize(10);
  //     doc.text(
  //       `Date range: ${
  //         currentDateRange.fromDate
  //           ? moment(currentDateRange.fromDate).format("MMM D, YYYY")
  //           : "Start"
  //       } - ${
  //         currentDateRange.toDate
  //           ? moment(currentDateRange.toDate).format("MMM D, YYYY")
  //           : "End"
  //       }`,
  //       105,
  //       35,
  //       { align: "center" }
  //     );
  //   }

  //   // Filter out the action column and any unwanted columns
  //   const pdfColumns = columns.filter(
  //     (col) => col.key !== "action" && col.key !== "extraColumn"
  //   );

  //   // Prepare table data
  //   const headers = pdfColumns.map((col) => col.label);

  //   const rows = data.map((item, index) => {
  //     return pdfColumns.map((col) => {
  //       try {
  //         // Handle index column
  //         if (col.key === "index") return index + 1;

  //         // Special handling for different column types
  //         switch (col.key) {
  //           // Contact List columns
  //           case "name":
  //             return item.name || "N/A";
  //           case "email":
  //             return item.email || "N/A";
  //           case "message":
  //             return item.message || "N/A";
  //           case "status":
  //             return item.status
  //               ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
  //               : "Pending";
  //           case "date":
  //             return item.createdAt
  //               ? moment(item.createdAt).format("MMM D, YYYY h:mm A")
  //               : "N/A";

  //           // Check-In Report columns
  //           case "userName":
  //             return item.user?.name || "N/A";
  //           case "email":
  //             return item.user?.email || "N/A";
  //           case "checkIn":
  //             return item.check_in_time
  //               ? moment(item.check_in_time).format("MMM D, YYYY h:mm A")
  //               : "N/A";
  //           case "checkOut":
  //             return item.check_out_time
  //               ? moment(item.check_out_time).format("MMM D, YYYY h:mm A")
  //               : "Not checked out";
  //           case "status":
  //             return item.tracker?.status
  //               ? item.tracker.status.charAt(0).toUpperCase() +
  //                   item.tracker.status.slice(1)
  //               : "Pending";

  //           default:
  //             return "N/A";
  //         }
  //       } catch (error) {
  //         console.error(`Error processing column ${col.key}:`, error);
  //         return "Error";
  //       }
  //     });
  //   });

  //   // Generate table with appropriate column widths
  //   const columnStyles = {
  //     // Index column
  //     0: { cellWidth: 10 },
  //     // Name columns
  //     1: { cellWidth: isCheckInData ? 25 : 20 },
  //     // Email columns
  //     2: { cellWidth: 30 },
  //     // Message/Check-In columns
  //     3: { cellWidth: isCheckInData ? 25 : 40 },
  //     // Status/Check-Out columns
  //     4: { cellWidth: isCheckInData ? 25 : 15 },
  //     // Date columns (only for contact list)
  //     ...(!isCheckInData && pdfColumns.some((col) => col.key === "date")
  //       ? {
  //           [pdfColumns.findIndex((col) => col.key === "date")]: {
  //             cellWidth: 25,
  //           },
  //         }
  //       : {}),
  //   };

  //   autoTable(doc, {
  //     head: [headers],
  //     body: rows,
  //     startY: currentDateRange?.fromDate || currentDateRange?.toDate ? 45 : 35,
  //     styles: {
  //       cellPadding: 2,
  //       fontSize: 9,
  //       valign: "middle",
  //       halign: "left",
  //     },
  //     headStyles: {
  //       fillColor: [59, 130, 246],
  //       textColor: 255,
  //       fontStyle: "bold",
  //     },
  //     alternateRowStyles: {
  //       fillColor: [240, 240, 240],
  //     },
  //     columnStyles,
  //   });

  //   // Save the PDF
  //   const filename = `${title
  //     .toLowerCase()
  //     .replace(/\s+/g, "-")}-report-${moment().format("YYYY-MM-DD")}.pdf`;
  //   doc.save(filename);
  // };

  return (
    <Card className="border-0 shadow-sm pb-4" style={{ borderRadius: "12px" }}>
      <Card.Header
        className="border-0 p-4"
        style={{
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div>
            <h5 className="text-white fw-bold mb-1">{title}</h5>
            <p className="text-white-50 mb-0 small">{subtitle}</p>
          </div>

          <div className="d-flex align-items-center gap-3">
            {showDateFilter && (
              <>
                <div className="position-relative">
                  <Button
                    variant="light"
                    className="d-flex align-items-center gap-2 rounded-pill"
                    onClick={() => setShowDateModal(true)}
                    style={{
                      padding: "6px 20px",
                      fontWeight: "600",
                      color: "#2563EB",
                      border: "2px solid #3B82F6",
                      boxShadow: "0 0 6px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    <FaFilter />
                    <span style={{ fontSize: "0.85rem" }}>Date Filter</span>
                  </Button>

                  {/* Dot indicator when filter is applied */}
                  {(currentDateRange?.fromDate || currentDateRange?.toDate) && (
                    <span
                      className="position-absolute top-0 end-0 translate-middle p-1 bg-danger border border-light rounded-circle"
                      style={{ zIndex: 1 }}
                    >
                      <span className="visually-hidden">
                        Date filter applied
                      </span>
                    </span>
                  )}
                </div>

                <Modal
                  show={showDateModal}
                  onHide={() => setShowDateModal(false)}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Filter by Date Range</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="mb-3">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="fromDate"
                        value={dateRange.fromDate}
                        onChange={(e) =>
                          setDateRange({
                            ...dateRange,
                            fromDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="toDate"
                        value={dateRange.toDate}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, toDate: e.target.value })
                        }
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="outline-secondary"
                      onClick={handleClearFilter}
                    >
                      Clear Filter
                    </Button>
                    <Button variant="primary" onClick={handleApplyFilter}>
                      Apply Filter
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}

            {/* <Button
              variant="light"
              className="d-flex align-items-center gap-2 rounded-pill"
              onClick={downloadPDF}
              style={{
                padding: "6px 20px",
                fontWeight: "600",
                color: "#2563EB",
                border: "2px solid #3B82F6",
                boxShadow: "0 0 6px rgba(59, 130, 246, 0.4)",
              }}
            >
              <FaFilePdf />
              <span style={{ fontSize: "0.85rem" }}>Export PDF</span>
            </Button> */}

            <Badge
              bg="light"
              className="text-primary px-3 py-2 rounded-pill"
              style={{ fontSize: "14px" }}
            >
              {icon}
              <span className="ms-2">{totalCount || data.length} Results</span>
            </Badge>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table className="mb-0" style={{ fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ background: "rgba(59, 130, 246, 0.05)" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item, index) => {
                  const rowBg = index % 2 === 0 ? "#f1f3f4" : "#fff";

                  const defaultRow = (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                      onMouseEnter={(e) => {
                        Array.from(e.currentTarget.children).forEach((td) => {
                          td.style.background = "rgba(59, 130, 246, 0.1)";
                        });
                      }}
                      onMouseLeave={(e) => {
                        Array.from(e.currentTarget.children).forEach((td) => {
                          td.style.background = rowBg;
                        });
                      }}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          {item[col.key]}
                        </td>
                      ))}
                    </motion.tr>
                  );

                  return rowRender ? rowRender(item, index, rowBg) : defaultRow;
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>

      <Card.Footer className="py-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
          <div style={{ width: "120px" }}></div>

          {totalPages > 1 && (
            <div className="flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
              <Pagination className="mb-0">
                <Pagination.Prev
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                />
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageClick(page)}
                      disabled={loading}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                />
              </Pagination>
            </div>
          )}

          <div className="d-flex align-items-center">
            <span className="me-2 small">Items per page:</span>
            <select
              className="form-select form-select-sm"
              style={{ width: "80px" }}
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1);
              }}
              disabled={loading}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default PaginatedTable;
