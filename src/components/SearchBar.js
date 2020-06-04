import React, { useState } from "react";
import { Navbar, Nav, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSearchResults } from "../redux/restaurant/resActions";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [location, setLocation] = useState({
    loading: true,
    lat: "",
    long: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchData = {
      location: location,
      cuisine: e.target[1].value,
    };
    dispatch(fetchSearchResults(searchData));
    console.log(searchData);
  };
  const handleLocation = (e) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setLocation({
        loading: false,
        lat: position.coords.latitude / 57.29577951,
        long: position.coords.longitude / 57.29577951,
      });
    });
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <Navbar bg="danger" variant="dark">
          <Nav className="mr-auto">
            <FormControl
              type="button"
              className="mr-sm-2 bg-info text-white"
              style={{ width: "400px" }}
              value="Select your location..."
              onClick={handleLocation}
              required
            />
            <FormControl
              type="text"
              placeholder="Search for Cuisines..."
              className="mr-sm-2"
              required
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Nav>
        </Navbar>
      </form>
    </div>
  );
}

export default NavBar;
