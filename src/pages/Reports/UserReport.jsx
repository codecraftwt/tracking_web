import React, { useEffect, useState, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getReportsByAdmin } from "../../redux/slices/reportSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateTimeDDMMYYYY } from "../../utils/dateFormat";
import { FaClipboardList } from "react-icons/fa";
import clsx from "clsx";

const UserReport = () => {
  const dispatch = useDispatch();
  const { reports, pagination, loading } = useSelector((state) => state.report);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getReportsByAdmin({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const columns = useMemo(
    () => [
      { label: "User Name", key: "userName" },
      { label: "Email", key: "email" },
      { label: "Check In", key: "checkIn" },
      { label: "Check Out", key: "checkOut" },
      { label: "Status", key: "status" },
    ],
    []
  );

  const rowRender = useCallback(
    (report, index, rowBg) => (
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
          {report.tracker?.status || "-"}
        </td>
      </motion.tr>
    ),
    []
  );

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Reports" />
      <motion.main
        className="container-fluid py-4 px-4"
        initial="hidden"
        animate="visible"
      >
        <PaginatedTable
          title="Report List"
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
          onDateChange={(date) => {
            setCurrentPage(1);
            dispatch(getReportsByAdmin({ page: 1, limit: 10, date }));
          }}
        />
      </motion.main>
    </div>
  );
};

export default UserReport;
