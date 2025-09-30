import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Table, Badge, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext); // token from context
  const accessToken = token || localStorage.getItem("accessToken");

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };



  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveUser = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/users/${selectedUser.id}`,
        {
          username: selectedUser.username,
          email: selectedUser.email,
          password: selectedUser.password || "", // optional
          role: selectedUser.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // update user list
        setRecentUsers((prev) =>
          prev.map((u) => (u.id === res.data.id ? res.data : u))
        );
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // metrics
    axios
      .get("http://localhost:8080/api/admin/metrics", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8080/api/admin/latest-applications", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);setRecentApplications(res.data)})
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8080/api/admin/latest-users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => setRecentUsers(res.data))
      .catch((err) => console.error(err));
  }, [accessToken]);

  return (
    <div className="container py-4">
  

      <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>

      {/* Top Metrics */}
      <Row className="mb-4 ">
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Users</h5>
            <h3>{metrics.totalUsers}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Recruiters</h5>
            <h3>{metrics.totalRecruiters}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Jobs</h5>
            <h3>{metrics.totalJobs}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Applications</h5>
            <h3>{metrics.totalApplications}</h3>
          </Card>
        </Col>
      </Row>
      

      {/* Latest Users */}
      <h4 className="mt-4 mb-3">Recent Users</h4>
      <Table striped hover  responsive >
        <thead>
          <tr className="text-capitalize">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
            <th>CreateAt</th>

          </tr>
        </thead>
        <tbody>
          {recentUsers.map((user) => (
            <tr key={user.id}>
              <td className="text-capitalize">{user.username}</td>
              <td>{user.email}</td>
              <td className="text-capitalize">{user.role}</td>
              <td className="text-capitalize">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>{" "}
                <Button size="sm" variant="outline-danger">
                  Deactivate
                </Button>
              </td>
              <td>{formatDate(user.createdAt)}</td>

            </tr>
          ))}
        </tbody>
      </Table>

      {/* Latest Applications */}
      <h4 className="mt-4 mb-3">Recent Applications</h4>
      <Table striped hover responsive>
        <thead>
          <tr className="text-capitalize">
            <th>Applicant</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Resume</th>
            <th>CreateAt</th>
          </tr>
        </thead>
        <tbody>
          {recentApplications.map((app) => (
            <tr key={app.id}>
              <td className="text-capitalize">{app.name}</td>
              <td>{app.email}</td>
              <td className="text-capitalize">{app.jobTitle}</td>
              <td className="text-capitalize">
                <Badge
                  bg={
                    app.status === "Hired"
                      ? "success"
                      : app.status === "Rejected"
                      ? "danger"
                      : "info"
                  }
                  text="dark"
                  
                  className="p-2"
                >
                  {app.status}
                </Badge>
              </td>
              <td className="text-capitalize">
                <Button
                  size="sm"
                  variant="link"
                  href={`http://localhost:8080/api/applicants/${app.id}/resume`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </Button>
              </td>
            <td>{formatDate(app.createdDate)}</td>

            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="USER">USER</option>
                  <option value="RECRUITER">RECRUITER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
