import React from "react";
import { Dropdown } from "react-bootstrap";

export const getDropdownItemClass = (status) => {
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

export const getDropdownToggleClass = (status) => {
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

export const StatusDropdown = ({ requestId, status, selectedOption, handleSelect }) => {
  const statuses = ["New", "In Progress", "Resolved"];

  return (
    <Dropdown onSelect={(eventKey) => handleSelect(eventKey, requestId)}>
      <Dropdown.Toggle
        variant="light"
        id={`dropdown-basic-${requestId}`}
        className={getDropdownToggleClass(selectedOption[requestId] || status)}
        style={{ zIndex: 1000 }}
      >
        {selectedOption[requestId] || status || "Status"}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ zIndex: 1000 }}>
        {statuses.map((status) => (
          <Dropdown.Item
            key={status}
            className={`${getDropdownItemClass(status)} ${
              selectedOption[requestId] === status ? "selected" : ""
            }`}
            eventKey={status}
          >
            {status}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
