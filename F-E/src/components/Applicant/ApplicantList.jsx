import React, { useEffect, useState, useContext } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

function ApplicantList() {
  const [applications, setApplications] = useState([]);
  const { token } = useContext(AuthContext) ?? localStorage.getItem("accessToken");
  const {  role } = useContext(AuthContext)??localStorage.getItem("role");
    const {  user } = useContext(AuthContext);


  console.log("role",role);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/applicants/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
        console.log("Fetched applications:", res.data);
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
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

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
            <th>Status</th>
            <th>Resume</th>
                        {user && (role === "ADMIN"||role === "RECRUITER") &&(  <th>Actions</th>)}
           
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="text-capitalize">{app.name}</td>
              <td>{app['job']['companies']['companyName']}</td>
              <td>{app.email}</td>
              <td className="text-capitalize">{app.jobTitle}</td>
              <td>
              <Badge bg={app.status === "Hired" ? "success" : app.status === "Rejected" ? "danger" : "info"}>
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

            {user && (role === "ADMIN"||role === "RECRUITER") &&( <td>
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
              </td>)}
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default  ApplicantList ;
