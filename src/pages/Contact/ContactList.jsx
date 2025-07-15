import React, { useEffect, useState, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../redux/slices/contactSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";
import { FaUsers, FaEnvelope } from "react-icons/fa";
import clsx from "clsx";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, pagination, loading } = useSelector(
    (state) => state.contact
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getContacts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  // Memoize columns to avoid re-creation on each render
  const columns = useMemo(
    () => [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Message", key: "message" },
      { label: "Date", key: "date" },
      { label: "Action", key: "action" },
    ],
    []
  );

  // Memoize rowRender to avoid re-creation
  const rowRender = useCallback(
    (contact, index, rowBg) => (
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
        <td className={clsx("border-0 p-3", rowBg)}>{contact.name}</td>
        <td className={clsx("border-0 p-3", rowBg)}>{contact.email}</td>
        <td className={clsx("border-0 p-3", rowBg)}>{contact.message}</td>
        <td className={clsx("border-0 p-3", rowBg)}>
          {formatDateDDMMYYYY(contact.createdAt)}
        </td>
        <td className={clsx("border-0 p-3", rowBg)}>
          <a href={`mailto:${contact.email}`} className="text-decoration-none">
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
    ),
    []
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
        />
      </motion.main>
    </div>
  );
};

export default ContactList;
