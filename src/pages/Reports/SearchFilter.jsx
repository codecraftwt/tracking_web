import { s } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Badge,
} from "react-bootstrap";
import { FaSearch, FaFilter, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  filterMonth,
  setFilterMonth,
  resultsCount,
}) => {
  const totalItems = useSelector((state) => state.PaymentData.totalItems);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    // Function to generate the last 6 months including the current month
    const getLastSixMonths = () => {
      const monthsArray = [];
      const currentDate = new Date();

      // Include current month first
      const currentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      monthsArray.push(currentMonth.toISOString().slice(0, 7)); // "YYYY-MM"

      // Add the last 5 months
      for (let i = 1; i <= 5; i++) {
        const month = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i
        );
        const monthString = month.toISOString().slice(0, 7); // "YYYY-MM"
        monthsArray.push(monthString);
      }

      return monthsArray;
    };

    setMonths(getLastSixMonths());
  }, []);

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text
                className="border-0"
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  color: "#3B82F6",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                }}
              >
                <FaSearch size={16} />
              </InputGroup.Text>
              <FormControl
                placeholder="Search by name or plan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0"
                style={{
                  background: "rgba(59, 130, 246, 0.05)",
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text
                className="border-0"
                style={{
                  background: "rgba(168, 85, 247, 0.1)",
                  color: "#A855F7",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                }}
              >
                <FaFilter size={16} />
              </InputGroup.Text>
              <Form.Select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="border-0"
                style={{
                  background: "rgba(168, 85, 247, 0.05)",
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
              >
                <option value="all">All Months</option>
                {months.map((month) => {
                  const monthDate = new Date(month + "-01");
                  const monthName = monthDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <option key={month} value={month}>
                      {monthName}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
          </Col>
          <Col md={3} className="text-md-end mt-3 mt-md-0">
            <Badge
              bg="primary"
              className="px-3 py-2 rounded-pill"
              style={{ fontSize: "14px" }}
            >
              <FaUsers className="me-2" />
              {totalItems || resultsCount} Results
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SearchFilter;
