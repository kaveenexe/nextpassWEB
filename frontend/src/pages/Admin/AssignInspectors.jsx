import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../components/Admin/Header";
import "./Styles.css";

const AssignInspectors = () => {
  return (
    <div className="main-component">
      <Header
        title="Assign Inspector"
        subtitle="Assign routes and shifts to a new inspector for specific buses using this form."
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
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Ex: John Doe" />
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
                <Form.Control type="email" placeholder="Ex: john@gmail.com" />
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
                <Form.Control type="text" placeholder="Ex: 0777777770" />
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
                <Form.Control type="text" placeholder="Ex: ND-5441" />
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
                <Form.Control type="text" placeholder="Ex: Kaduwela-Kollupitiya" />
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
                <Form.Control type="text" placeholder="Ex: 3" />
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

export default AssignInspectors;
