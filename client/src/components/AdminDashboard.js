import React, { useContext, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import RequestContext from "../contexts/RequestContext";

function AdminDashboard() {
  const { requests, updateRequest, deleteRequest } = useContext(RequestContext);
  const [selectedOption, setSelectedOption] = useState({});
  const [openedCard, setOpenedCard] = useState(null);

  const handleSelect = (eventKey, requestId) => {
    setSelectedOption((prev) => ({
      ...prev,
      [requestId]: eventKey,
    }));

    updateRequest(requestId, { status: eventKey });
  };

  const handleDelete = (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      deleteRequest(requestId);
    }
  };

  const handleEmail = (request) => {
    console.log(
      `Would normally send email here to client's email: ${request.email}`
    );
    alert(`Would normally send email here to client's email: ${request.email}`);
  };

  const handleOpenCard = (requestId) => {
    setOpenedCard(openedCard === requestId ? null : requestId);
  };

  const statusOrder = { New: 1, "In Progress": 2, Resolved: 3 };

  const sortedRequests = requests.sort((a, b) => {
    return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
  });

  const getDropdownItemClass = (status) => {
    switch (status) {
      case "New":
        return "dropdown-item-red";
      case "In Progress":
        return "dropdown-item-orange";
      case "Resolved":
        return "dropdown-item-green";
      default:
        return "";
    }
  };

  const getDropdownToggleClass = (status) => {
    switch (status) {
      case "New":
        return "dropdown-toggle-red";
      case "In Progress":
        return "dropdown-toggle-orange";
      case "Resolved":
        return "dropdown-toggle-green";
      default:
        return "";
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        {requests.length > 0 ? (
          sortedRequests.map((request) => (
            <Card
              key={request.helpId}
              className={`bg-dark text-light mb-3 ${
                openedCard === request.helpId ? "opened" : ""
              }`}
              style={{ position: "relative", overflow: "visible" }}
            >
              <button
                className="card-delete-btn"
                onClick={() => handleDelete(request.helpId)}
              >
                &times;
              </button>
              <Card.Header>{request.name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {openedCard === request.helpId
                    ? request.description
                    : `${request.description.substring(0, 100)}...`}
                </Card.Text>
                <Dropdown
                  onSelect={(eventKey) =>
                    handleSelect(eventKey, request.helpId)
                  }
                >
                  <Dropdown.Toggle
                    variant="light"
                    id={`dropdown-basic-${request.helpId}`}
                    className={getDropdownToggleClass(
                      selectedOption[request.helpId] || request.status
                    )}
                    style={{ zIndex: 1000 }}
                  >
                    {selectedOption[request.helpId] ||
                      request.status ||
                      "Status"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ zIndex: 1000 }}>
                    <Dropdown.Item
                      className={`${getDropdownItemClass("New")} ${
                        selectedOption[request.helpId] === "New"
                          ? "selected"
                          : ""
                      }`}
                      eventKey="New"
                    >
                      New
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={`${getDropdownItemClass("In Progress")} ${
                        selectedOption[request.helpId] === "In Progress"
                          ? "selected"
                          : ""
                      }`}
                      eventKey="In Progress"
                    >
                      In Progress
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={`${getDropdownItemClass("Resolved")} ${
                        selectedOption[request.helpId] === "Resolved"
                          ? "selected"
                          : ""
                      }`}
                      eventKey="Resolved"
                    >
                      Resolved
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
              <Card.Body
                className="bg-dark text-light"
                style={{ position: "relative" }}
              >
                <Button
                  className="card-open-btn"
                  onClick={() => handleOpenCard(request.helpId)}
                >
                  {openedCard === request.helpId ? "Close" : "Open"}
                </Button>
              </Card.Body>
              {openedCard === request.helpId && (
                <Card.Footer className="bg-dark text-light">
                  Submitted: {new Date(request.createdAt).toLocaleString()}
                  <Button
                    className="card-email-btn"
                    onClick={() => handleEmail(request)}
                  >
                    Email
                  </Button>
                </Card.Footer>
              )}
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
