import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Badge,
  Dropdown,
  Spinner,
  Table,
  Container,
  Form,
} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import {
  BiSearch,
  BiUserPlus,
  BiPencil,
  BiTrash,
  BiDotsVerticalRounded,
  BiFilterAlt,
  BiSortUp,
  BiSortDown,
  BiDownload,
  BiCalendar,
} from "react-icons/bi";
import {
  FaUser,
  FaUsers,
  FaUserShield,
  FaRegClock,
  FaRegCheckCircle,
  FaEye,
} from "react-icons/fa";
import { FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  getAllAdmins,
  getAllUsers,
  deleteUser,
  getUserById,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import moment from "moment";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { convertImageUrlToBase64 } from "../../utils/hepler";
import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

const User = () => {
  const [key, setKey] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.UserData.userInfo);
  const role_id = userData?.role_id;
  const maxUser = userData?.currentPaymentId?.maxUser;
  const totalUsers = useSelector((state) => state.UserData.totalUsers);
  const subscriptionExpiry = userData?.currentPaymentId?.expiresAt;

  const isExpired =
    subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

  const canCreateUser =
    role_id === 2 ||
    (maxUser &&
      totalUsers < maxUser &&
      (!subscriptionExpiry || moment(subscriptionExpiry).isAfter(moment())));

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      if (role_id === 1 && userData?._id) {
        await Promise.all([
          dispatch(getUserById(userData._id)),
          dispatch(getAllUsers(userData._id)),
        ]);
      } else if (role_id === 2) {
        await dispatch(getAllAdmins());
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [dispatch, role_id, userData?._id]);

  const users =
    useSelector((state) =>
      role_id === 1 ? state.UserData.usersList : state.UserData.adminList
    ) || [];

  const loading = useSelector((state) =>
    role_id === 1 ? state.UserData.loadingUser : state.UserData.loadingAdmin
  );

  // Filter users by date range if dates are selected
  const filterUsersByDateRange = (users) => {
    if (!startDate && !endDate) return users;

    return users.filter((user) => {
      const joinedDate = moment(user.createdAt);
      const start = startDate ? moment(startDate) : null;
      const end = endDate ? moment(endDate) : null;

      if (start && end) {
        return joinedDate.isBetween(start, end, null, "[]"); // inclusive
      } else if (start) {
        return joinedDate.isSameOrAfter(start);
      } else if (end) {
        return joinedDate.isSameOrBefore(end);
      }
      return true;
    });
  };

  // Sort users by joined date
  const sortedUsers = [...filterUsersByDateRange(users)].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const activeUsers = sortedUsers.filter((user) => user.isActive);
  const inactiveUsers = sortedUsers.filter((user) => !user.isActive);

  const filteredActiveUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInactiveUsers = inactiveUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = () => {
    setIsDeleting(true);
    dispatch(deleteUser(selectedUser._id))
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        toast.success("User deleted successfully!");
        refreshData();
      })
      .catch((error) => {
        toast.error("Failed to delete user");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleBulkDelete = () => {
    setIsDeleting(true);
    Promise.all(selectedUsers.map((userId) => dispatch(deleteUser(userId))))
      .then(() => {
        toast.success(
          `${selectedUsers.length} user${
            selectedUsers.length === 1 ? "" : "s"
          } deleted successfully!`
        );
        setSelectedUsers([]);
        setIsBulkDeleteMode(false);
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        toast.error("Failed to delete some users");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleBulkDeleteMode = () => {
    setIsBulkDeleteMode(!isBulkDeleteMode);
    if (isBulkDeleteMode) {
      setSelectedUsers([]);
    }
  };

  const handleCloseModal = () => setShowLimitModal(false);
  const handleShowModal = () => setShowLimitModal(true);
  const handleNavigateToSubscription = () => navigate("/payment-plans");
  const toggleViewMode = () =>
    setViewMode(viewMode === "card" ? "table" : "card");

  const applyDateFilter = () => {
    setShowDateFilter(false);
    refreshData();
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
    setShowDateFilter(false);
    refreshData();
  };

  const downloadUsersPDF = async () => {
    const doc = new jsPDF();

    // Show avatar if available
    if (userData?.avtar) {
      try {
        const base64Image = await convertImageUrlToBase64(userData.avtar);
        doc.addImage(base64Image, "JPEG", 10, 5, 20, 20);
      } catch (error) {
        console.warn("Could not load avatar image:", error);
      }
    }

    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.setFont(undefined, "bold");
    doc.text("Team Trackify", 105, 15, { align: "center" });

    doc.setFont(undefined, "normal");
    doc.setTextColor(0, 0, 0);

    // Title
    doc.setFontSize(16);
    doc.text("User List Report", 105, 30, { align: "center" });

    // Timestamp
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, {
      align: "center",
    });

    // Date range if applied
    if (startDate || endDate) {
      doc.setFontSize(10);
      doc.text(
        `Date range: ${
          startDate ? moment(startDate).format("MMM D, YYYY") : "Start"
        } - ${endDate ? moment(endDate).format("MMM D, YYYY") : "End"}`,
        105,
        40,
        { align: "center" }
      );
    }

    // Table headers and data
    const headers = [["No.", "Name", "Email", "Status", "Joined Date"]];
    const data = users.map((user, index) => [
      index + 1,
      user.name,
      user.email,
      user.isActive ? "Active" : "Inactive",
      moment(user.createdAt).format("MMM D, YYYY"),
    ]);

    // Render table
    autoTable(doc, {
      head: headers,
      body: data,
      startY: startDate || endDate ? 60 : 50,
      styles: {
        cellPadding: 2,
        fontSize: 9,
        valign: "middle",
        halign: "left",
      },
      headStyles: {
        fillColor: [220, 53, 69],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    // Save file
    doc.save(`users-report-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div className="min-vh-100 bg-gray-50">
      <Navbar
        pageTitle={
          role_id === 1 ? "User Management" : "Organization Management"
        }
      />

      <main className="px-0">
        <Container fluid className="px-4 py-3">
          {/* Header and Actions */}
          <div className="row align-items-center mb-4 gy-3">
            {/* Left side: Title and subscription info */}
            <div className="col-12 col-md">
              <h4 className="fw-bold mb-1">
                {role_id === 1 ? "User Management" : "Organizations"}
              </h4>
              <p className="text-muted small mb-0">
                {role_id === 1
                  ? "Manage your team members and their access"
                  : "Manage organizations and their users"}

                {userData?.currentPaymentId?.expiresAt && (
                  <>
                    <br />
                    <div className="text-warning fw-semibold pt-2">
                      Subscription expires:{" "}
                      {formatDateDDMMYYYY(userData.currentPaymentId.expiresAt)}{" "}
                      {planExpiresIn(userData.currentPaymentId.expiresAt) >
                      0 ? (
                        <span>
                          (Expires in{" "}
                          {planExpiresIn(userData.currentPaymentId.expiresAt)}{" "}
                          {planExpiresIn(
                            userData.currentPaymentId.expiresAt
                          ) === 1
                            ? "day"
                            : "days"}
                          )
                        </span>
                      ) : (
                        <span className="text-danger">(Expired)</span>
                      )}
                    </div>
                  </>
                )}
              </p>
            </div>

            {/* Right side: Buttons */}
            <div className="col-12 col-md-auto d-flex flex-wrap gap-2 justify-content-start justify-content-md-end">
              <Button
                variant="light"
                className="px-3 d-flex align-items-center gap-2"
                onClick={refreshData}
                disabled={isRefreshing}
              >
                <FiRefreshCw className={isRefreshing ? "spin" : ""} />
                <span className="d-none d-md-inline">Refresh</span>
              </Button>

              <Button
                variant={viewMode === "card" ? "outline-primary" : "primary"}
                className="px-3 d-flex align-items-center gap-2"
                onClick={toggleViewMode}
              >
                {viewMode === "card" ? <FaUsers /> : <BiFilterAlt />}
                <span className="d-none d-md-inline">
                  {viewMode === "card" ? "Table View" : "Card View"}
                </span>
              </Button>

              <Button
                variant="outline-primary"
                className="px-4 d-flex align-items-center gap-2"
                onClick={downloadUsersPDF}
                disabled={loading || isRefreshing}
              >
                <BiDownload />
                <span className="d-none d-md-inline">Download PDF</span>
              </Button>

              {isBulkDeleteMode ? (
                <>
                  <Button
                    variant="danger"
                    className="px-4 d-flex align-items-center gap-2"
                    onClick={() => {
                      if (selectedUsers.length > 0) {
                        setShowDeleteModal(true);
                      } else {
                        toast.warning("No users selected");
                      }
                    }}
                    disabled={selectedUsers.length === 0 || isDeleting}
                  >
                    {isDeleting ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      <BiTrash />
                    )}
                    <span className="d-none d-md-inline">
                      Delete ({selectedUsers.length})
                    </span>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="px-4 d-flex align-items-center gap-2"
                    onClick={toggleBulkDeleteMode}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline-primary"
                  className="px-4 d-flex align-items-center gap-2"
                  onClick={toggleBulkDeleteMode}
                >
                  <BiTrash />
                  <span className="d-none d-md-inline">Bulk Actions</span>
                </Button>
              )}
            </div>
          </div>

          {/* Search and Filter Card */}
          <Card className="border-0 shadow-sm mb-4 rounded-3">
            <Card.Body className="p-3">
              <Row className="align-items-center g-3">
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Text className="bg-transparent border-end-0">
                      <BiSearch className="text-muted" />
                    </InputGroup.Text>
                    <FormControl
                      placeholder={`Search ${
                        role_id === 1 ? "users" : "organizations"
                      }...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-start-0"
                    />
                  </InputGroup>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className="d-flex flex-wrap gap-2 justify-content-start justify-content-md-end"
                >
                  <Dropdown
                    show={showDateFilter}
                    onToggle={(isOpen) => setShowDateFilter(isOpen)}
                  >
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      className="d-flex align-items-center gap-2 flex-shrink-0"
                    >
                      <BiCalendar />
                      <span className="d-none d-md-inline">Date Filter</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-3" style={{ width: "300px" }}>
                      <div className="mb-3">
                        <label className="form-label small">Start Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small">End Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate}
                        />
                      </div>
                      <div className="d-flex justify-content-between gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={clearDateFilter}
                          disabled={!startDate && !endDate}
                        >
                          Clear
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={applyDateFilter}
                        >
                          Apply
                        </Button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    variant="outline-secondary"
                    className="d-flex align-items-center gap-2 flex-shrink-0"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? <BiSortUp /> : <BiSortDown />}
                    <span className="d-none d-md-inline">
                      Joined Date {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  </Button>

                  <Button
                    variant="primary"
                    className="px-4 d-flex align-items-center gap-2 flex-shrink-0"
                    onClick={
                      canCreateUser
                        ? () => navigate("/add-admin")
                        : handleShowModal
                    }
                  >
                    <BiUserPlus />
                    <span className="d-none d-md-inline">
                      {role_id === 1 ? "Add User" : "Add Organization"}
                    </span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Tabs Section */}
          <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="flex-nowrap d-flex px-2 pt-2 pb-1 border-0"
              style={{ minWidth: "max-content" }}
            >
              <Tab
                eventKey="active"
                title={
                  <div
                    className="d-flex align-items-center gap-2 gap-sm-1 px-3 px-sm-2 py-2 py-sm-1"
                    style={{ fontSize: "1rem" }} // base font size for md+
                  >
                    <FaUsers
                      className="text-success"
                      size={16} // default for md+
                      style={{ fontSize: "14px" }} // overridden for mobile via media query
                    />
                    <span className="d-none d-sm-inline">
                      {role_id === 1 ? "Active Users" : "Active Organizations"}
                    </span>
                    <span className="d-inline d-sm-none">
                      {role_id === 1 ? "Active" : "Active"}
                    </span>
                    <Badge
                      bg="success"
                      className="ms-2 rounded-pill"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {filteredActiveUsers.length}
                    </Badge>
                  </div>
                }
              >
                <UserList
                  users={filteredActiveUsers}
                  navigate={navigate}
                  loading={loading}
                  role_id={role_id}
                  searchQuery={searchQuery}
                  onDeleteClick={(user) => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                  viewMode={viewMode}
                  isBulkDeleteMode={isBulkDeleteMode}
                  selectedUsers={selectedUsers}
                  onToggleSelect={toggleUserSelection}
                  sortOrder={sortOrder}
                  isDeleting={isDeleting}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Tab>
              <Tab
                eventKey="inactive"
                title={
                  <div
                    className="d-flex align-items-center gap-2 gap-sm-1 px-3 px-sm-2 py-2 py-sm-1"
                    style={{ fontSize: "1rem" }} // default size for sm and up
                  >
                    <FaUserShield
                      className="text-secondary"
                      size={16}
                      style={{ fontSize: "14px" }} // for smaller screens
                    />
                    {/* Responsive text label */}
                    <span className="d-none d-sm-inline">
                      {role_id === 1
                        ? "Inactive Users"
                        : "Inactive Organizations"}
                    </span>
                    <span className="d-inline d-sm-none">
                      {role_id === 1 ? "Inactive" : "Inactive"}
                    </span>

                    {/* Badge */}
                    <Badge
                      bg="secondary"
                      className="ms-2 rounded-pill"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {filteredInactiveUsers.length}
                    </Badge>
                  </div>
                }
              >
                <UserList
                  users={filteredInactiveUsers}
                  navigate={navigate}
                  loading={loading}
                  role_id={role_id}
                  searchQuery={searchQuery}
                  onDeleteClick={(user) => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                  viewMode={viewMode}
                  isBulkDeleteMode={isBulkDeleteMode}
                  selectedUsers={selectedUsers}
                  onToggleSelect={toggleUserSelection}
                  sortOrder={sortOrder}
                  isDeleting={isDeleting}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Tab>
            </Tabs>
          </Card>
        </Container>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={selectedUser ? handleDeleteUser : handleBulkDelete}
        title={selectedUser ? "Confirm Deletion" : "Confirm Bulk Deletion"}
        message={
          selectedUser
            ? `Are you sure you want to delete ${selectedUser?.name}?`
            : `Are you sure you want to delete ${selectedUsers.length} users?`
        }
        subMessage="This user will be hidden and access will be blocked, but not permanently deleted."
        loading={isDeleting}
        confirmDisabled={isDeleting}
        cancelDisabled={isDeleting}
      />

      {/* User Limit Modal */}
      <Modal
        show={showLimitModal}
        onHide={handleCloseModal}
        centered
        aria-labelledby="limit-modal-title"
        aria-describedby="limit-modal-description"
        backdrop="static"
        keyboard={false}
        animation={true}
      >
        <Modal.Header className="border-0 pb-3 bg-warning" closeButton>
          <Modal.Title
            id="limit-modal-title"
            className="fw-bold text-center w-100 fs-5 text-white"
          >
            {isExpired ? "Subscription Expired" : "User Limit Reached"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center py-4">
          <div className="mb-4">
            <div
              className={`rounded-circle d-inline-flex p-4 ${
                isExpired
                  ? "bg-danger bg-opacity-10"
                  : "bg-warning bg-opacity-10"
              }`}
              aria-hidden="true"
            >
              <BiUserPlus
                size={36}
                className={isExpired ? "text-danger" : "text-warning"}
              />
            </div>
          </div>

          <h5 className="fw-bold mb-3">
            {isExpired
              ? "Your subscription has expired"
              : "You've reached your user limit"}
          </h5>
          <p id="limit-modal-description" className="text-muted mb-0 px-3">
            {isExpired
              ? "Renew your subscription to continue adding users."
              : "Upgrade your plan to add more users to your account."}
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0 justify-content-center gap-3">
          <Button
            variant="outline-secondary"
            className="px-4"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant={isExpired ? "danger" : "warning"}
            onClick={handleNavigateToSubscription}
            className="px-3 fw-bold text-white"
            autoFocus
          >
            {isExpired ? "Renew Now" : "Upgrade Plan"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const UserList = ({
  users,
  navigate,
  loading,
  role_id,
  searchQuery,
  onDeleteClick,
  viewMode,
  isBulkDeleteMode,
  selectedUsers,
  onToggleSelect,
  sortOrder,
  isDeleting,
  startDate,
  endDate,
}) => {
  if (loading) {
    return (
      <div className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">
          Loading {role_id === 1 ? "users" : "organizations"}...
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-3">
          <FaUsers size={48} className="text-muted opacity-25" />
        </div>
        <h5 className="text-muted fw-normal">
          No {role_id === 1 ? "users" : "organizations"} found
        </h5>
        <p className="text-muted small">
          {searchQuery || startDate || endDate
            ? "Try adjusting your search or filters"
            : `No ${
                role_id === 1 ? "users" : "organizations"
              } have been added yet`}
        </p>
      </div>
    );
  }

  return viewMode === "card" ? (
    <ListGroup variant="flush">
      {users.map((user) => (
        <motion.div
          key={user._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ListGroup.Item className="border-0 px-4 py-3 hover-bg-light">
            <div className="d-flex align-items-center">
              {isBulkDeleteMode && (
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => onToggleSelect(user._id)}
                  className="me-3"
                  disabled={isDeleting}
                />
              )}
              {user?.avtar ? (
                <img
                  src={user?.avtar}
                  alt="User Avatar"
                  className="rounded-circle me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <FaUser size={18} />
                </div>
              )}

              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-3">
                  <h6 className="fw-bold mb-1">{user.name}</h6>
                  <Badge
                    bg={user.isActive ? "success" : "secondary"}
                    className="rounded-pill"
                    pill
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-muted small mb-1">{user.email}</p>
                <div className="d-flex align-items-center gap-3 mt-1">
                  <span className="text-muted small d-flex align-items-center gap-1">
                    <FaRegClock size={12} />
                    Joined {moment(user.createdAt).format("MMM D, YYYY")}
                    {sortOrder === "asc" ? (
                      <BiSortUp className="text-primary" />
                    ) : (
                      <BiSortDown className="text-primary" />
                    )}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 ms-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-3"
                  onClick={() => {
                    if (role_id === 1) {
                      navigate("/trackingdata", { state: { item: user } });
                    } else if (role_id === 2) {
                      navigate(`/list-users/${user._id}`);
                    }
                  }}
                  disabled={isDeleting}
                >
                  View Details
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="rounded-3"
                  onClick={() => navigate("/add-admin", { state: { user } })}
                  disabled={isDeleting}
                >
                  <BiPencil size={14} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-3"
                  onClick={() => onDeleteClick(user)}
                  disabled={isDeleting}
                >
                  {isDeleting && selectedUsers.includes(user._id) ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    <BiTrash size={14} />
                  )}
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        </motion.div>
      ))}
    </ListGroup>
  ) : (
    <div className="table-responsive">
      <Table striped hover className="mb-0">
        <thead className="bg-light" style={{ fontSize: "0.90rem" }}>
          <tr>
            {isBulkDeleteMode && <th></th>}
            <th>User</th>
            <th>Email</th>
            <th>Status</th>
            <th>
              <div className="d-flex align-items-center gap-1">
                <span>Joined Date</span>
                {sortOrder === "asc" ? (
                  <BiSortUp className="text-primary" />
                ) : (
                  <BiSortDown className="text-primary" />
                )}
              </div>
            </th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.85rem" }}>
          {users.map((user) => (
            <tr key={user._id}>
              {isBulkDeleteMode && (
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => onToggleSelect(user._id)}
                    disabled={isDeleting}
                  />
                </td>
              )}
              <td>
                <div className="d-flex align-items-center">
                  {user?.avtar ? (
                    <img
                      src={user?.avtar}
                      alt="User Avatar"
                      className="rounded-circle me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <FaUser size={16} />
                    </div>
                  )}
                  <div>
                    <div className="fw-bold">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <Badge
                  bg={user.isActive ? "success" : "secondary"}
                  className="rounded-pill"
                  pill
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td>{moment(user.createdAt).format("MMM D, YYYY")}</td>
              <td className="text-end">
                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      if (role_id === 1) {
                        navigate("/trackingdata", { state: { item: user } });
                      } else if (role_id === 2) {
                        navigate(`/list-users/${user._id}`);
                      }
                    }}
                    disabled={isDeleting}
                  >
                    <FaEye size={14} />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => navigate("/add-admin", { state: { user } })}
                    disabled={isDeleting}
                  >
                    <BiPencil size={14} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteClick(user)}
                    disabled={isDeleting}
                  >
                    {isDeleting && selectedUsers.includes(user._id) ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      <BiTrash size={14} />
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
