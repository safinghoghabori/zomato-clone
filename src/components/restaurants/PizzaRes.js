import React from "react";
import { Card, Button, Media, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function FastFoodRes() {
  // Get restaurants from the local storage
  const res = JSON.parse(localStorage.getItem("restaurants"));

  const history = useHistory();
  const handleOrder = (id) => {
    history.push(`/restaurantDetails/${id}`);
  };

  if (res.length == 0) return <h1>Loading....</h1>;
  return (
    <div>
      {res &&
        res.map(
          (restaurant) =>
            restaurant.cuisine === "pizza" && (
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
                      width="30%"
                      height={200}
                      className="mr-3"
                      src={restaurant.img}
                      alt=""
                    />
                    <Media.Body>
                      <h1 style={{ color: "dodgerblue" }}>
                        <b>{restaurant.name}</b>
                      </h1>
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
                    variant="primary"
                    onClick={() => handleOrder(restaurant.id)}
                  >
                    Order Now!
                  </Button>
                </Card.Body>
              </Card>
            )
        )}
    </div>
  );
}

export default FastFoodRes;
