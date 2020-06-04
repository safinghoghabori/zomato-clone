import React, { useState } from "react";
import { Card, Button, Media, Alert, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MyOrders() {
  const itemsData = JSON.parse(localStorage.getItem("confirmOrders"));

  // Set items to the localStorage
  const [items, setItems] = useState(itemsData);
  const history = useHistory();

  // check if item is delivered then alert the user
  const deliveredItem = localStorage.getItem("deliveredItem");
  return (
    <div>
      <br />
      <h1 className="text-center">Status Of Orders:</h1>
      <p className="text-center">You will get the food very soon :)</p>
      {deliveredItem !== null && (
        <Container>
          <br />
          <br />
          <br />
          <Alert variant="info">
            Your order <b>{deliveredItem}</b> has been delivered..!!
          </Alert>
        </Container>
      )}
      {items &&
        items.map((restaurant) => (
          <Card
            style={{
              background: "dark",
              borderBottom: "1px solid black",
            }}
          >
            <Card.Header as="h5">
              <Media as="li">
                <img
                  width="20%"
                  height={150}
                  className="mr-3"
                  src={restaurant.detailImg}
                  alt=""
                />
                <Media.Body>
                  <h4>
                    <b>{restaurant.rest_name}</b>
                  </h4>
                  <h6>
                    <b>Cuisine:</b> {restaurant.item_name}
                  </h6>
                  <h6>
                    <b>Price:</b> {restaurant.price}
                  </h6>
                  <Button variant="warning" disabled>
                    Your order is in progress...
                  </Button>
                </Media.Body>
              </Media>
            </Card.Header>
          </Card>
        ))}
      {items === null && <h4 className="text-center">No orders...</h4>}
    </div>
  );
}

export default MyOrders;
