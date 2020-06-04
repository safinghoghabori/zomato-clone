import React, { useState } from "react";
import { Card, Button, Media } from "react-bootstrap";

function DeleteRest() {
  // Get restaurants from the local storage
  const res = JSON.parse(localStorage.getItem("restaurants"));

  // To rerender the component manually [The most IMP trick :) ]
  const [, rerender] = useState({});

  // Delete the restaurant
  const handleDelete = (id) => {
    const afterDelRest = res.filter((restaurant) => restaurant.id !== id);
    localStorage.setItem("restaurants", JSON.stringify(afterDelRest));

    // Render the component, so changes can be done
    rerender({});
  };
  return (
    <div>
      <h1 className="text-center">All Restaurants</h1>
      {res &&
        res.map((restaurant) => (
          <Card
            style={{
              background: "dark",
              borderBottom: "1px solid black",
            }}
            key={restaurant.id}
          >
            <Card.Header as="h5">
              <Media as="li">
                <img
                  width="25%"
                  height={150}
                  className="mr-3"
                  src={restaurant.img}
                  alt=""
                />
                <Media.Body>
                  <h3>
                    <b>{restaurant.name}</b>
                  </h3>
                  <h6>
                    <b>City:</b> {restaurant.city}
                  </h6>
                  <h6>
                    <b>Address:</b> {restaurant.address}
                  </h6>
                  <h6>
                    <b>Cuisine:</b> {restaurant.cuisine}
                  </h6>
                  <h6>
                    <b>Min Price:</b> {restaurant.min_price}
                  </h6>
                  <h6>
                    <b>Hours:</b> {restaurant.hours}
                  </h6>
                </Media.Body>
              </Media>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <i>{restaurant.description}</i>
              </Card.Text>
              <Button
                variant="danger"
                onClick={() => handleDelete(restaurant.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default DeleteRest;
