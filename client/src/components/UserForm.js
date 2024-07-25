import { useContext, useState } from "react";
import RequestContext from "../contexts/RequestContext";

import { Button, Form } from "react-bootstrap";

function UserForm() {
  const [request, setRequest] = useState({
    name: "",
    email: "",
    description: "",
  });

  const { addRequest } = useContext(RequestContext);

  function handleChange(event) {
    const { id, value } = event.target;
    setRequest((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addRequest(request)
      .then(() => {
        alert("Request sent. Someone will be getting back to you shortly.");
        setRequest({ name: "", email: "", description: "" });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div>
      <h1>Help Desk</h1>
      <div className="userForm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              id="name"
              value={request.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@example.com"
              id="email"
              value={request.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Describe your issue or request here.</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              style={{ resize: "vertical", minHeight: "100px" }}
              id="description"
              value={request.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserForm;
