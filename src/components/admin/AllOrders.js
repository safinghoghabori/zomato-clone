import React, { useState } from "react";
import { Card, Button, Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function MyOrders() {
  const itemsData = JSON.parse(localStorage.getItem("confirmOrders"));

  // Set items to the state
  const [items, setItems] = useState(itemsData);
  const history = useHistory();

  //   const handleConfirmation = (id) => {
  //     history.push(`/myorders/additem/${id}`);
  //   };
  const handleDelivered = (id, cuisine) => {
    const afterDelItems = items.filter((item) => item.id !== id);

    // Update the localStorage
    localStorage.setItem("confirmOrders", JSON.stringify(afterDelItems));

    // Change the items state
    setItems(afterDelItems);

    // store the status of delivered items in localStorage
    localStorage.setItem("deliveredItem", cuisine);
  };
  return (
    <div>
      <br />
      <h1 className="text-center">All Orders:</h1>
      {items &&
        items.map((rest) => (
          <Card
            style={{
              background: "dark",
              borderBottom: "1px solid black",
            }}
          >
            <Card.Header as="h5">
              <Media as="li">
                <img
                  width="30%"
                  height={250}
                  className="mr-3"
                  src={rest.detailImg}
                  alt=""
                />
                <Media.Body>
                  <h4 style={{ color: "blue" }}>
                    <b>Customer Info:</b>
                  </h4>
                  <h6>Name: {rest.customer_name}</h6>
                  <h6>City: {rest.city}</h6>
                  <h6>Address: {rest.address}</h6>
                  <h6>Phone Number: {rest.phone}</h6>
                  <h4 style={{ color: "blue" }}>
                    <b>Order Info:</b>
                  </h4>
                  <h6>Shop: {rest.rest_name}</h6>
                  <h6>Cuisine: {rest.item_name}</h6>
                  <h6>Price: {rest.price}</h6>
                </Media.Body>
              </Media>
            </Card.Header>
            <Card.Body>
              &nbsp;&nbsp;
              <Button
                variant="danger"
                onClick={() => handleDelivered(rest.id, rest.item_name)}
              >
                Mark As Delivered
              </Button>
            </Card.Body>
          </Card>
        ))}
      {items === null && <h4 className="text-center">No orders...</h4>}
    </div>
  );
}

export default MyOrders;
