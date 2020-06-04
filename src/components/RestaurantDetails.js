import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function RestaurantDetails() {
  const param = useParams();
  const res = JSON.parse(localStorage.getItem("restaurants"));

  const history = useHistory();
  const [btnText, setBtnText] = useState("Add +");
  const [showAlert, setShowAlert] = useState(false);
  const [doLoginAlert, setDoLoginAlert] = useState(false);

  const handleAdd = (id, name, cuisine, min_price, detailImg) => {
    // Check use is logged in or not
    const isLogin = JSON.parse(localStorage.getItem("login"));
    if (isLogin !== null) {
      const item = {
        id: id,
        name: name,
        cuisine: cuisine,
        price: min_price,
        detailImg: detailImg,
      };

      // Check item is existing or not
      const itemsData = JSON.parse(localStorage.getItem("items"));
      if (itemsData === null) {
        let arr = [];
        arr.push(item);
        localStorage.setItem("items", JSON.stringify(arr));
      } else {
        itemsData.push(item);
        localStorage.setItem("items", JSON.stringify(itemsData));
      }
      // Change btn text
      setBtnText("Added Successfully...");
      setShowAlert(true);
    } else {
      setDoLoginAlert(true);
    }
  };
  return (
    <Container>
      <br />
      <br />
      <br />
      {res &&
        res.map(
          (restaurant) =>
            restaurant.id === parseInt(param.id) && (
              <Row>
                <Col>
                  <img src={restaurant.detailImg} width="100%" alt="image" />
                </Col>
                <Col>
                  <Card key={restaurant.id}>
                    <Card.Header>
                      <h2>{restaurant.name}</h2>
                    </Card.Header>
                    <Card.Body>
                      {/* <Card.Title>Special title treatment</Card.Title> */}
                      <Card.Text>
                        <h6>
                          <b>City:</b> {restaurant.city}
                        </h6>
                        <h6>
                          <b>Address:</b> {restaurant.address}
                        </h6>
                        <h6>
                          <b>Hours:</b> {restaurant.hours}
                        </h6>
                      </Card.Text>
                      <hr />
                      <Button variant="dark" disabled>
                        Price: ₹{restaurant.min_price}
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        variant="info"
                        onClick={() =>
                          handleAdd(
                            restaurant.id,
                            restaurant.name,
                            restaurant.cuisine,
                            restaurant.min_price,
                            restaurant.detailImg
                          )
                        }
                      >
                        {btnText}
                      </Button>
                      {doLoginAlert && (
                        <p style={{ color: "red" }}>
                          <b>Please login to book your order.</b>
                        </p>
                      )}
                      {showAlert && (
                        <p style={{ color: "red" }}>
                          <b>
                            Please go to the "my order" tab to confirm your
                            order.
                          </b>
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )
        )}
    </Container>
  );
}

export default RestaurantDetails;
