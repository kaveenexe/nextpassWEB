import Card from "react-bootstrap/Card";
import {
  UilTruck,
  UilTransaction,
  UilShieldCheck,
  UilStore,
} from "@iconscout/react-unicons";
import "./wrapper.css";

function wrapper(){
    return(
        <div className="main_div">
             {/* Card 01 */}
             <Card
        style={{
          width: "18rem",
          height: "14rem",
          marginTop: "3rem",
          borderStyle: "none",
          backgroundColor: "#f2f5f9",
          boxShadow: "5px 5px 15px #E7E5E4",
        }}
      >
        <center>
          <Card.Body>
            <div className="icon_circle">
              <span>
                <UilTruck size="40" />
              </span>
            </div>
            <Card.Title
              style={{ fontSize: 18, fontWeight: "600", marginBottom: "2rem" }}
            >
              Safe Travel
            </Card.Title>

            {/* <Card.Text></Card.Text> */}
            <Card.Subtitle className="mb-2 text-muted">
              Safe and secure - Travel safe and enjoy your life with
              unforgetable memories!
            </Card.Subtitle>
            {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
          </Card.Body>
        </center>
      </Card>

      {/* Card 02 */}
      <Card
        style={{
          width: "18rem",
          height: "14rem",
          marginTop: "3rem",
          borderStyle: "none",
          backgroundColor: "#f2f5f9",
          boxShadow: "5px 5px 15px #E7E5E4",
        }}
      >
        <center>
          <Card.Body>
            <div className="icon_circle">
              <span>
                <UilTransaction size="40" />
              </span>
            </div>
            <Card.Title
              style={{ fontSize: 18, fontWeight: "600", marginBottom: "2rem" }}
            >
              Safe Payment
            </Card.Title>

            {/* <Card.Text></Card.Text> */}
            <Card.Subtitle className="mb-2 text-muted">
              Convenient payment options - choose from a variety of payment
              methods to suit your needs!
            </Card.Subtitle>
            {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
          </Card.Body>
        </center>
      </Card>

      {/* Card 04 */}
      <Card
        style={{
          width: "18rem",
          height: "14rem",
          marginTop: "3rem",
          borderStyle: "none",
          backgroundColor: "#f2f5f9",
          boxShadow: "5px 5px 15px #E7E5E4",
        }}
      >
        <center>
          <Card.Body>
            <div className="icon_circle">
              <span>
                <UilStore size="40" />
              </span>
            </div>
            <Card.Title
              style={{ fontSize: 18, fontWeight: "600", marginBottom: "2rem" }}
            >
              24/7 available
            </Card.Title>

            {/* <Card.Text></Card.Text> */}
            <Card.Subtitle className="mb-2 text-muted">
              Get your ticket anytime - our online customer service is always waiting for your need!
            </Card.Subtitle>
            {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
          </Card.Body>
        </center>
      </Card>


        </div>
    )
}
export default wrapper;