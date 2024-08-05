import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import RequestContext from "../contexts/RequestContext";
import { StatusDropdown } from "./Helpers";

function AdminDashboard() {
  const { requests, updateRequest, deleteRequest } = useContext(RequestContext);
  const [localRequests, setLocalRequests] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [sentStatus, setSentStatus] = useState({});

  useEffect(() => {
    setLocalRequests(requests);
  }, [requests]);

  const handleSelect = async (eventKey, requestId) => {
    setSelectedOption((prev) => ({
      ...prev,
      [requestId]: eventKey,
    }));

    await updateRequest(requestId, { status: eventKey });
    updateLocalRequestStatus(requestId, eventKey);
  };

  const handleDelete = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      await deleteRequest(requestId);
      setLocalRequests((prev) =>
        prev.filter((request) => request.helpId !== requestId)
      );
    }
  };

  const handleEmail = async (request) => {
    console.log("Email would send here");

    await updateRequest(request.helpId, { status: "In Progress" });
    updateLocalRequestStatus(request.helpId, "In Progress");

    setSelectedOption((prev) => ({
      ...prev,
      [request.helpId]: "In Progress",
    }));

    setSentStatus((prev) => ({
      ...prev,
      [request.helpId]: true,
    }));
  };

  const updateLocalRequestStatus = (requestId, newStatus) => {
    setLocalRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.helpId === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const statusOrder = { New: 1, "In Progress": 2, Resolved: 3 };

  const sortedRequests = localRequests.sort((a, b) => {
    return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
  });

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        {localRequests.length > 0 ? (
          sortedRequests.map((request) => (
            <Card
              key={request.helpId}
              className="bg-dark text-light mb-3"
              style={{ position: "relative", overflow: "visible" }}
            >
              <button
                className="card-delete-btn"
                onClick={() => handleDelete(request.helpId)}
              >
                &times;
              </button>
              <Card.Header>
                <strong>Request:</strong> {request.description}
              </Card.Header>
              <Card.Body>
                <StatusDropdown
                  requestId={request.helpId}
                  status={request.status}
                  selectedOption={selectedOption}
                  handleSelect={handleSelect}
                />
                <Form>
                  <Form.Group className="mt-3" controlId="response">
                    <Form.Label>Response:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      style={{ resize: "vertical", minHeight: "100px" }}
                    />
                  </Form.Group>
                  <Button
                    className="card-email-btn mt-2"
                    onClick={() => handleEmail(request)}
                    disabled={sentStatus[request.helpId]}
                  >
                    {sentStatus[request.helpId] ? "Sent ✔️" : "Send"}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="bg-dark text-light">
                <div>
                  <strong>Submitted:</strong>{" "}
                  {new Date(request.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>Email:</strong> {request.email}
                </div>
                <div>
                  <strong>Name:</strong> {request.name}
                </div>
              </Card.Footer>
            </Card>
          ))
        ) : (
          <p>No requests available</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
