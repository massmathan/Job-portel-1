import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const RecruiterDashboard = () => {
  const { token } = useContext(AuthContext) ?? { token: localStorage.getItem("accessToken") };

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ totalJobs: 0, openPositions: 0, applications: 0, hires: 0 });
  const [pipeline, setPipeline] = useState({ Applied: [], Interview: [], Offer: [], Hired: [] });
  const [recentApplications, setRecentApplications] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, pipelineRes, recentRes] = await Promise.all([
          axios.get("http://localhost:8080/api/recruiter/metrics", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8080/api/recruiter/pipeline", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8080/api/recruiter/recent-applicants", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        console.log("Metrics Response:", metricsRes.data);
        console.log("Pipeline Response:", pipelineRes.data);
        console.log("Recent Applicants Response:", recentRes.data);

        setMetrics(metricsRes.data);

        const data = pipelineRes.data || {};
        setPipeline({
          Applied: data.Applied || [],
          Interview: data.Interview || [],
          Offer: data.Offer || [],
          Hired: data.Hired || [],
        });

        console.log("Normalized Pipeline State:", {
          Applied: data.Applied || [],
          Interview: data.Interview || [],
          Offer: data.Offer || [],
          Hired: data.Hired || [],
        });

        setRecentApplications(recentRes.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDragEnd = (result) => {
    console.log("Drag Result:", result);

    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = Array.from(pipeline[source.droppableId]);
    const destCol = Array.from(pipeline[destination.droppableId]);
    const [movedItem] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedItem);

    console.log("Moved Item:", movedItem);
    console.log("Updated Source Column:", sourceCol);
    console.log("Updated Destination Column:", destCol);

    setPipeline({
      ...pipeline,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  if (loading) return <p className="text-center py-5">Loading dashboard...</p>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Recruiter Dashboard</h2>

      {/* Metrics */}
      <Row className="mb-4">
        {Object.entries(metrics).map(([key, value]) => (
          <Col key={key}>
            <Card className="text-center p-3 shadow-sm">
              <h5 className="text-capitalize">{key.replace(/([A-Z])/g, " $1")}</h5>
              <h3>{value}</h3>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pipeline */}
      <h4 className="mb-3">Application Pipeline</h4>
      <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Row style={{ minWidth: "800px" }}>
            {Object.keys(pipeline).map((status) => (
              <Col key={status} style={{ minWidth: "200px" }}>
                <h5 className="text-center">{status}</h5>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="border rounded p-2"
                      style={{ minHeight: "200px", maxHeight: "400px", backgroundColor: "#f9f9f9", overflowY: "auto" }}
                    >
                      {pipeline[status].map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-2 my-2 bg-white rounded shadow-sm"
                            >
                              <strong>{item.name}</strong>
                              <div><small>{item.position}</small></div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            ))}
          </Row>
        </DragDropContext>
      </div>

      {/* Recent Applicants */}
      <h4 className="mt-4 mb-3">Recent Applicants</h4>
      <div style={{ overflowX: "auto" }}>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {recentApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.jobTitle}</td>
                <td>
                  <Badge
                    bg={app.status === "Hired" ? "success" : app.status === "Rejected" ? "danger" : "info"}
                    text="dark"
                    pill
                    className="p-2"
                  >
                    {app.status}
                  </Badge>
                </td>
                <td>
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
      </div>
    </div>
  );
};

export default RecruiterDashboard;
