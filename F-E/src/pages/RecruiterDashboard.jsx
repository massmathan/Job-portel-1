import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import { useContext } from "react";

const RecruiterDashboard = () => {

    const { token } = useContext(AuthContext) ?? localStorage.getItem('accessToken');
    
  const [metrics, setMetrics] = useState({
    totalJobs: 0,
    openPositions: 0,
    applications: 0,
    hires: 0
  });

  const [pipeline, setPipeline] = useState({
    Applied: [],
    Interview: [],
    Offer: [],
    Hired: []
  });

  const [recentApplicants, setRecentApplicants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/recruiter/metrics", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMetrics(res.data));

    axios.get("http://localhost:8080/api/recruiter/pipeline", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setPipeline(res.data));

    axios.get("http://localhost:8080/api/recruiter/recent-applicants", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRecentApplicants(res.data));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceCol = pipeline[source.droppableId];
    const destCol = pipeline[destination.droppableId];
    const [movedItem] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedItem);

    setPipeline({
      ...pipeline,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });

    // Optionally update backend:
    // axios.post("/api/recruiter/update-status", {applicantId: movedItem.id, status: destination.droppableId}, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Recruiter Dashboard</h2>

      <Row className="mb-4">
        <Col><Card className="text-center p-3 shadow-sm"><h5>Total Jobs</h5><h3>{metrics.totalJobs}</h3></Card></Col>
        <Col><Card className="text-center p-3 shadow-sm"><h5>Open Positions</h5><h3>{metrics.openPositions}</h3></Card></Col>
        <Col><Card className="text-center p-3 shadow-sm"><h5>Applications</h5><h3>{metrics.applications}</h3></Card></Col>
        <Col><Card className="text-center p-3 shadow-sm"><h5>Hires</h5><h3>{metrics.hires}</h3></Card></Col>
      </Row>

      <h4 className="mb-3">Application Pipeline</h4>
        <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
            {Object.keys(pipeline).map((status) => (
            <Col key={status}>
                <h5 className="text-center">{status}</h5>

                <Droppable droppableId={status} isDropDisabled={false}>
                {(provided) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="border rounded p-2"
                    style={{
                        minHeight: "200px",
                        backgroundColor: "#f9f9f9",
                    }}
                    >
                    {pipeline[status].map((item, index) => (
                        <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                        // isDragDisabled goes here if you need it:
                        isDragDisabled={false}
                        >
                        {(provided) => (
                            <div
                            className="p-2 my-2 bg-white rounded shadow-sm"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            {item.name}
                            <div>
                                <small>{item.position}</small>
                            </div>
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


      {/* Recent Applicants */}
      <h4 className="mt-4 mb-3">Recent Applicants</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentApplicants.map(app => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.jobTitle}</td>
              <td><Badge bg={app.status === "Hired" ? "success" : app.status === "Rejected" ? "danger" : "info"}>{app.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecruiterDashboard;
