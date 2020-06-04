import React, { useState } from "react";
import { Card, Button, Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MyOrders() {
  const itemsData = JSON.parse(localStorage.getItem("items"));

  // Set items to the localStorage
  const [items, setItems] = useState(itemsData);
  const history = useHistory();

  const handleConfirmation = (id) => {
    history.push(`/myorders/additem/${id}`);
  };
  const handleCancle = (id) => {
    const afterDelItems = items.filter((item) => item.id !== id);

    // Update the localStorage
    localStorage.setItem("items", JSON.stringify(afterDelItems));

    // Change the items state
    setItems(afterDelItems);
  };
  return (
    <div>
      <br />
      <h1 className="text-center">My Orders:</h1>
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
                    <b>{restaurant.name}</b>
                  </h4>
                  <h6>
                    <b>Cuisine:</b> {restaurant.cuisine}
                  </h6>
                  <h6>
                    <b>Price:</b> {restaurant.price}
                  </h6>
                </Media.Body>
              </Media>
            </Card.Header>
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => handleConfirmation(restaurant.id)}
              >
                Confirm Order
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="outline-danger"
                onClick={() => handleCancle(restaurant.id)}
              >
                Cancle
              </Button>
            </Card.Body>
          </Card>
        ))}
      {items === null && <h4 className="text-center">No orders...</h4>}
    </div>
  );
}

export default MyOrders;
