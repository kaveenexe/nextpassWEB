import React from 'react'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../components/Admin/Header";
import "./Styles.css"

const AssignBusses = () => {
  return (
    <div className="main-component">
      <Header
        title="Assign Bus"
        subtitle="Allocate specific departure and arrival times for buses effortlessly, ensuring timely service and streamlined operations directly from this form."
      />
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
                <Form.Control type="text" placeholder="2023-10-16" />
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
                <Form.Control type="text" placeholder="Ex: ND-4750" />
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
                <Form.Control type="text" placeholder="Ex: Colombo Fort" />
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
                <Form.Control type="text" placeholder="Ex: Kandy" />
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
                <Form.Control type="text" placeholder="10:00 am" />
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
                <Form.Control type="text" placeholder="13:30 pm" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className="button-group">
          <a href="/">
            <button className="cancelbtn" style={{ "--i": "#fff" }}>
              Cancel
            </button>
          </a>
          <a href="/">
            <button className="assignbtn" style={{ "--i": "#fff" }}>
              Assign
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AssignBusses