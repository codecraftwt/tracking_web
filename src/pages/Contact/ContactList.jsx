import React, { useEffect, useState, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  updateContactStatus,
} from "../../redux/slices/contactSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";
import { FaUsers, FaEnvelope, FaFilter } from "react-icons/fa";
import clsx from "clsx";
import { Form } from "react-bootstrap";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, pagination, loading } = useSelector(
    (state) => state.contact
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });

  useEffect(() => {
    dispatch(
      getContacts({
        page: currentPage,
        limit: itemsPerPage,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, dateRange]);

  const handleDateChange = (newDateRange) => {
    setCurrentPage(1);
    setDateRange(newDateRange);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setCurrentPage(1);
    setItemsPerPage(newItemsPerPage);
  };

  const columns = useMemo(
    () => [
      { label: "#", key: "index" },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Message", key: "message" },
      { label: "Status", key: "status" },
      { label: "Date", key: "date" },
      { label: "Action", key: "action" },
    ],
    []
  );

  const rowRender = useCallback(
    (contact, index, rowBg) => {
      const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

      const handleStatusChange = (newStatus) => {
        dispatch(updateContactStatus({ id: contact._id, status: newStatus }));
      };

      return (
        <motion.tr
          key={contact.id}
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
          <td className={clsx("border-0 p-3", rowBg)}>{contact.name}</td>
          <td className={clsx("border-0 p-3", rowBg)}>{contact.email}</td>
          <td className={clsx("border-0 p-3", rowBg)}>{contact.message}</td>
          <td className={clsx("border-0 p-3", rowBg)}>
            <Form.Select
              value={contact.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              size="sm"
              style={{ width: "113px", fontSize: "0.8rem" }}
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="replied">Replied</option>
            </Form.Select>
          </td>
          <td
            className={clsx("border-0 p-3", rowBg)}
            style={{ width: "150px", minWidth: "120px" }}
          >
            {formatDateDDMMYYYY(contact.createdAt)}
          </td>
          <td className={clsx("border-0 p-2", rowBg)}>
            <a
              href={`mailto:${contact.email}`}
              className="text-decoration-none"
            >
              <FaEnvelope
                style={{
                  color: "#2563EB",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              />
            </a>
          </td>
        </motion.tr>
      );
    },
    [currentPage, itemsPerPage]
  );

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Contact List" />
      <motion.main
        className="container-fluid py-4 px-4"
        initial="hidden"
        animate="visible"
      >
        <PaginatedTable
          title="Contact List"
          subtitle="Complete list of all contacts"
          icon={<FaUsers className="me-2" />}
          columns={columns}
          data={contacts}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalContacts}
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

export default ContactList;
