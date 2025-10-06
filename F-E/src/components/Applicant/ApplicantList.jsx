import React, { useEffect, useState, useContext } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import ApiService from "../../Service/ApiService";

function ApplicantList() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
      const { validateToken } = useContext(AuthContext) ;

  const { token, role, user } = useContext(AuthContext) ?? {
    token: localStorage.getItem("accessToken"),
    role: localStorage.getItem("role"),
  };

  useEffect(() => {

    
         validateToken(token);
    // axios
    //   .get("http://localhost:8080/api/applicants/all", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
        ApiService.get("/applicants/all",0,{ headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("mathan");
        setApplications(res.data);
      })
      .catch((err) => console.error("Error fetching applications:", err));
  }, [token]);

  const handleStageChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/applicants/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );  

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status, hireDate: status === "Hired" ? new Date().toISOString() : app.hireDate } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApps = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Applications Dashboard</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Recruiter</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Created At</th>
            <th>Hired At</th>
            {user && (role === "ADMIN" || role === "RECRUITER") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedApps.map((app) => (
            <tr key={app.id}>
              <td className="text-capitalize">{app.name}</td>
              <td>{app.job?.companies?.companyName}</td>
              <td>{app.email}</td>
              <td className="text-capitalize">{app.jobTitle}</td>
              <td>{app.recruiter?.email}</td>
              <td>
                <Badge
                  bg={
                    app.status === "Hired"
                      ? "success"
                      : app.status === "Rejected"
                      ? "danger"
                      : "info"
                  }
                >
                  {app.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="link"
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `http://localhost:8080/api/applicants/${app.id}/resume`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      if (!res.ok) throw new Error("Failed to fetch resume");

                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      window.open(url, "_blank"); // open PDF in new tab
                    } catch (err) {
                      console.error(err);
                      alert("Unable to fetch resume");
                    }
                  }}
                >
                  View Resume
                </Button>
              </td>
              <td>{formatDate(app.createdDate)}</td>
              <td>{app.status === "Hired" ? formatDate(app.hireDate) : "-"}</td>
              {user && (role === "ADMIN" || role === "RECRUITER") && (
                <td>
                  <div className="d-flex gap-1">
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => handleStageChange(app.id, "Interview")}
                    >
                      Interview
                    </Button>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleStageChange(app.id, "Hired")}
                    >
                      Hire
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleStageChange(app.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ApplicantList;
