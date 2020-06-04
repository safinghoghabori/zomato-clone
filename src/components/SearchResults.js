import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChinesRes from "./restaurants/ChinesRes";
import FastFoodRes from "./restaurants/FastFoodRes";
import PizzaRes from "./restaurants/PizzaRes";

function SearchResults() {
  const { searchData } = useSelector((state) => state);

  return (
    <Container>
      <br />
      <h3>Search Results: {searchData.cuisine}</h3>
      {(() => {
        if (searchData.cuisine === "chinese") {
          return <ChinesRes />;
        } else if (
          searchData.cuisine === "fast food" ||
          searchData.cuisine === "fastfood"
        ) {
          return <FastFoodRes />;
        } else if (searchData.cuisine === "pizza") {
          return <PizzaRes />;
        } else {
          return (
            <Alert variant="danger" dissmissable>
              No result found.
            </Alert>
          );
        }
      })()}
    </Container>
  );
}

export default SearchResults;
