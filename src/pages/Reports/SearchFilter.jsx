import React from "react";
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

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  filterMonth,
  setFilterMonth,
  resultsCount,
}) => {
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
                <option value="2025-01">January 2025</option>
                <option value="2025-02">February 2025</option>
                <option value="2025-03">March 2025</option>
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
              {resultsCount} Results
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SearchFilter;
