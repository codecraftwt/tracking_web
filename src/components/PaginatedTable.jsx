import React from "react";
import { Table, Card, Pagination, Spinner, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

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
}) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Card className="border-0 shadow-sm pb-4" style={{ borderRadius: "16px" }}>
      <Card.Header
        className="border-0 p-4"
        style={{
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="text-white fw-bold mb-1">{title}</h5>
            <p className="text-white-50 mb-0 small">{subtitle}</p>
          </div>
          <Badge
            bg="light"
            className="text-primary px-3 py-2 rounded-pill"
            style={{ fontSize: "14px" }}
          >
            {icon}
            <span className="ms-2">{totalCount || data.length} Results</span>
          </Badge>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table className="mb-0" style={{ fontSize: "0.85rem" }}>
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

      {totalPages > 1 && (
        <Card.Footer className="d-flex justify-content-center py-3">
          <Pagination>
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
        </Card.Footer>
      )}
    </Card>
  );
};

export default PaginatedTable;
