import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../components/Admin/Header";
import Alert from "react-bootstrap/Alert";
import "./Styles.css";

const AssignInspectors = () => {

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    busNumber: "",
    assignedRoute: "",
    noOfShifts: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/inspectors/add-inspector",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error ||
            "An error occurred while assigning the inspector."
        );
      }

      setShowSuccessAlert(true);
      setFormInputs({
        name: "",
        email: "",
        phone: "",
        busNumber: "",
        assignedRoute: "",
        noOfShifts: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.message || "An error occurred while assigning the inspector."
      );
      setShowSuccessAlert(false);
    }
  };

  return (
    <div className="main-component">
      <Header
        title="Assign Inspector"
        subtitle="Assign routes and shifts to a new inspector for specific buses using this form."
      />
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
          className="success-alert"
        >
          Inspector Assigned Successfully!
        </Alert>
      )}
      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          dismissible
          className="error-alert"
        >
          {errorMessage}
        </Alert>
      )}
      <br />
      <div className="form-container">
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formInputs.name}
                  onChange={handleInputChange}
                  placeholder="Ex: John Doe"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formInputs.email}
                  onChange={handleInputChange}
                  placeholder="Ex: john@gmail.com"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formInputs.phone}
                  onChange={handleInputChange}
                  placeholder="Ex: 123456789"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Bus Number</Form.Label>
                <Form.Control
                  type="text"
                  name="busNumber"
                  value={formInputs.busNumber}
                  onChange={handleInputChange}
                  placeholder="Ex: ND-5441"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Assigned Route</Form.Label>
                <Form.Control
                  type="text"
                  name="assignedRoute"
                  value={formInputs.assignedRoute}
                  onChange={handleInputChange}
                  placeholder="Ex: Kaduwela-Kollupitiya"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Number of Shifts</Form.Label>
                <Form.Control
                  type="text"
                  name="noOfShifts"
                  value={formInputs.noOfShifts}
                  onChange={handleInputChange}
                  placeholder="Ex: 3"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className="button-group">
          <a href="/dashboard">
            <button className="cancelbtn" style={{ "--i": "#fff" }}>
              Cancel
            </button>
          </a>
          <button
            className="assignbtn"
            style={{ "--i": "#fff" }}
            onClick={handleSubmit}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignInspectors;
