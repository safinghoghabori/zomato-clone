import React, { useState } from "react";
import { Card, Button, Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { findDistanceBetween } from "geographic-item-search";

function FastFoodRes() {
  // Get restaurants from the local storage
  const res = JSON.parse(localStorage.getItem("restaurants"));

  const history = useHistory();
  const { searchData } = useSelector((state) => state);

  const handleOrder = (id) => {
    history.push(`/restaurantDetails/${id}`);
  };

  // Find of radians
  const findResRadians = () => {
    res &&
      res.map((restaurant) => {
        restaurant.lat = restaurant.lat / 57.29577951;
        restaurant.long = restaurant.long / 57.29577951;
      });
  };
  findResRadians();

  // Find distance
  const findDistance = () => {
    const dArray =
      res &&
      res.map((restaurant) => {
        // const dlat = searchData.location.lat - restaurant.lat;
        // const dlong = searchData.location.long - restaurant.long;
        // console.log("long...", searchData.location.long, restaurant.long);
        // let ans =
        //   Math.sin(dlat / 2) ^
        //   (2 +
        //     Math.cos(searchData.location.lat) *
        //       Math.cos(restaurant.lat) *
        //       Math.sin(dlong / 2)) ^
        //   2;
        // const c = 2 * Math.atan2(Math.sqrt(ans), Math.sqrt(Math.max(0, 1 - ans)));
        // const R = 6371;
        // ans = R * c;
        var radlat1 = (Math.PI * searchData.location.lat) / 180;
        var radlat2 = (Math.PI * restaurant.lat) / 180;
        var theta = searchData.location.long - restaurant.long;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;

        dist = dist * 1.609344;

        console.log("dist....", dist);
        // const ans = findDistanceBetween(
        //   searchData.location.lat,
        //   searchData.location.long,
        //   restaurant.lat,
        //   restaurant.long
        // );
        // dArray.push(ans);
        return dist;
      });
    console.log("dArray...", dArray);
  };
  findDistance();

  return (
    <div>
      {res &&
        res.map(
          (restaurant) =>
            restaurant.cuisine === "chinese" && (
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
                      <h1>
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
