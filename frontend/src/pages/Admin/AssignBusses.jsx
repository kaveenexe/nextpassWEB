import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../components/Admin/Header";
import "./Styles.css";
import Alert from "react-bootstrap/Alert";

const AssignBusses = () =>
{
  const [ showSuccessAlert, setShowSuccessAlert ] = useState( false );
  const [errorMessage, setErrorMessage] = useState("");

  const [formInputs, setFormInputs] = useState({
    date: "",
    driver: "",
    busNumber: "",
    noOfSeats: "",
    startLocation: "",
    arrivalLocation: "",
    startTime: "",
    arrivalTime: "",
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
      const response = await fetch("http://localhost:5000/buses/add-bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorText =
          responseData.error || "An error occurred while adding the bus.";
        throw new Error(errorText);
      }
      setFormInputs({
        date: "",
        driver: "",
        busNumber: "",
        noOfSeats: "",
        startLocation: "",
        arrivalLocation: "",
        startTime: "",
        arrivalTime: "",
      });
      setShowSuccessAlert(true); 
    } catch (error) {
      console.error( "Error:", error );
      setErrorMessage(error.message);
      setShowSuccessAlert(false); 
    }
  };

  return (
    <div className="main-component">
      <Header
        title="Assign Bus"
        subtitle="Allocate specific departure and arrival times for buses effortlessly, ensuring timely service and streamlined operations directly from this form."
      />
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
          className="success-alert"
        >
          Bus Added Successfully!
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
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  value={formInputs.date}
                  onChange={handleInputChange}
                  placeholder="2023-10-16"
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
                <Form.Label>Driver</Form.Label>
                <Form.Control
                  type="text"
                  name="driver"
                  value={formInputs.driver}
                  onChange={handleInputChange}
                  placeholder="Ex: A.B.C.Perera"
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
                <Form.Label>Bus Number</Form.Label>
                <Form.Control
                  type="text"
                  name="busNumber"
                  value={formInputs.busNumber}
                  onChange={handleInputChange}
                  placeholder="Ex: ND-4750"
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
                <Form.Label>Number of Seats</Form.Label>
                <Form.Control
                  type="text"
                  name="noOfSeats"
                  value={formInputs.noOfSeats}
                  onChange={handleInputChange}
                  placeholder="Ex: 54"
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
                <Form.Label>Start Location</Form.Label>
                <Form.Control
                  type="text"
                  name="startLocation"
                  value={formInputs.startLocation}
                  onChange={handleInputChange}
                  placeholder="Ex: Colombo Fort"
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
                <Form.Label>Arrival Location</Form.Label>
                <Form.Control
                  type="text"
                  name="arrivalLocation"
                  value={formInputs.arrivalLocation}
                  onChange={handleInputChange}
                  placeholder="Ex: Kandy"
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
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="text"
                  name="startTime"
                  value={formInputs.startTime}
                  onChange={handleInputChange}
                  placeholder="10:00 am"
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
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  type="text"
                  name="arrivalTime"
                  value={formInputs.arrivalTime}
                  onChange={handleInputChange}
                  placeholder="13:30 pm"
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
          <a href="/">
            <button
              className="assignbtn"
              style={{ "--i": "#fff" }}
              onClick={handleSubmit}
            >
              Assign
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AssignBusses;
