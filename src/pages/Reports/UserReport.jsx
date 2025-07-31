import React, { useEffect, useState, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getReportsByAdmin } from "../../redux/slices/reportSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateTimeDDMMYYYY } from "../../utils/dateFormat";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import clsx from "clsx";
import { useDebounce } from "../../hooks/useDebounce";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const UserReport = () => {
  const dispatch = useDispatch();
  const { reports, pagination, loading } = useSelector((state) => state.report);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Use the debounce hook
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Single effect to handle all API calls
  useEffect(() => {
    dispatch(
      getReportsByAdmin({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchQuery || undefined, // Send undefined if empty
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, dateRange, debouncedSearchQuery]);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setCurrentPage(1); // Reset to first page when changing items per page
    setItemsPerPage(newItemsPerPage);
  };

  const handleDateChange = (newDateRange) => {
    setCurrentPage(1); // Reset to first page when changing date range
    setDateRange(newDateRange);
  };

  const handleSearchChange = (e) => {
    setCurrentPage(1); // Reset to first page when searching
    setSearchQuery(e.target.value);
  };
  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text("User Reports", 105, 15, { align: "center" });

      // Timestamp
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 25, {
        align: "center",
      });

      // Date range if applied
      if (dateRange.fromDate || dateRange.toDate) {
        doc.setFontSize(10);
        doc.text(
          `Date range: ${
            dateRange.fromDate
              ? new Date(dateRange.fromDate).toLocaleDateString()
              : "Start"
          } - ${
            dateRange.toDate
              ? new Date(dateRange.toDate).toLocaleDateString()
              : "End"
          }`,
          105,
          35,
          { align: "center" }
        );
      }

      // Table headers
      const headers = [
        "#",
        "User Name",
        "Email",
        "Check In",
        "Check Out",
        "Distance (km)",
        "Status",
      ];

      // Prepare table data
      const data = reports.map((report, index) => [
        index + 1,
        report.user?.name || "-",
        report.user?.email || "-",
        report.check_in_time
          ? formatDateTimeDDMMYYYY(report.check_in_time)
          : "-",
        report.check_out_time
          ? formatDateTimeDDMMYYYY(report.check_out_time)
          : "-",
        report.tracker?.direction_distance_travelled
          ? `${report.tracker.direction_distance_travelled}`
          : "-",
        report.tracker?.status || "-",
      ]);

      // Generate table
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: dateRange.fromDate || dateRange.toDate ? 45 : 35,
        styles: {
          cellPadding: 2,
          fontSize: 9,
          valign: "middle",
          halign: "left",
        },
        headStyles: {
          fillColor: [59, 130, 246], // Blue color
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        columnStyles: {
          0: { cellWidth: 10 }, // Index column
          1: { cellWidth: 25 }, // Name
          2: { cellWidth: 30 }, // Email
          3: { cellWidth: 40 }, // Check In
          4: { cellWidth: 40 }, // Check Out
          5: { cellWidth: 20 }, // Distance
          6: { cellWidth: 20 }, // Status
        },
      });

      // Save the PDF
      const filename = `user-reports-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const columns = useMemo(
    () => [
      { label: "#", key: "index" },
      { label: "User Name", key: "userName" },
      { label: "Email", key: "email" },
      { label: "Check In", key: "checkIn" },
      { label: "Check Out", key: "checkOut" },
      { label: "Total Distance", key: "distance" },
      { label: "Status", key: "status" },
    ],
    []
  );

  const rowRender = useCallback(
    (report, index, rowBg) => {
      const globalIndex = (currentPage - 1) * 10 + index + 1;

      return (
        <motion.tr
          key={report._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onMouseEnter={(e) =>
            Array.from(e.currentTarget.children).forEach(
              (td) => (td.style.background = "rgba(59, 130, 246, 0.1)")
            )
          }
          onMouseLeave={(e) =>
            Array.from(e.currentTarget.children).forEach(
              (td) => (td.style.background = rowBg)
            )
          }
        >
          <td className={clsx("border-0 p-3", rowBg)}>{globalIndex}</td>
          <td className={clsx("border-0 p-3", rowBg)}>{report.user?.name}</td>
          <td className={clsx("border-0 p-3", rowBg)}>{report.user?.email}</td>
          <td className={clsx("border-0 p-3", rowBg)}>
            {formatDateTimeDDMMYYYY(report.check_in_time)}
          </td>
          <td className={clsx("border-0 p-3", rowBg)}>
            {report.check_out_time
              ? formatDateTimeDDMMYYYY(report.check_out_time)
              : "-"}
          </td>
          <td className={clsx("border-0 p-3", rowBg)}>
            {report.tracker?.direction_distance_travelled
              ? `${report.tracker.direction_distance_travelled} km`
              : "-"}
          </td>
          <td className={clsx("border-0 p-3", rowBg)}>
            {report.tracker?.status || "-"}
          </td>
        </motion.tr>
      );
    },
    [currentPage]
  );

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Reports" />
      <motion.main
        className="container-fluid py-4 px-4"
        initial="hidden"
        animate="visible"
      >
        {/* New Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">User Reports</h4>
            <p className="text-muted small mb-0">
              All user check-in/check-out reports
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              className="px-4 d-flex align-items-center gap-2"
              onClick={handleDownloadPDF}
              disabled={loading || isDownloading}
            >
              {isDownloading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                <BiDownload />
              )}
              <span className="d-none d-md-inline">Download PDF</span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search reports by user name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </div>

        {/* Table Component */}
        <PaginatedTable
          title="User Report List"
          subtitle="All user check-in/check-out reports"
          icon={<FaClipboardList className="me-2" />}
          columns={columns}
          data={reports}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalItems}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          loading={loading}
          rowRender={rowRender}
          showDateFilter={true}
          onDateChange={handleDateChange}
          currentDateRange={dateRange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </motion.main>
    </div>
  );
};

export default UserReport;
