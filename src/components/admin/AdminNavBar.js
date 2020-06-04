import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown, Button, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function NavBar() {
  const [loginState, setLoginState] = useState();
  const history = useHistory();

  useEffect(() => {
    // Get the login data and set them to the state
    const loginData = localStorage.getItem("admin");
    setLoginState(loginData);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("admin", null);
    setLoginState(null);
    history.push("/");
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        className="justify-content-between"
        bg="info"
        variant="dark"
      >
        <Link to="/" className="linkBehave">
          <b>Online Food Delivery</b>
        </Link>
        <Nav>
          {/* {loginState === null && (
            <Nav.Item>
              <Link to="/login" className="linkBehave mr-3 mt-1">
                Login
              </Link>
            </Nav.Item>
          )}
          {loginState === null && (
            <Nav.Item>
              <Button variant="dark">
                <Link to="/signup" className="linkBehave">
                  Create New Account
                </Link>
              </Button>
            </Nav.Item>
          )} */}
          {loginState !== null && (
            <DropdownButton
              key="left"
              id="dropdown-button-drop-left"
              variant="dark"
              drop="left"
              title="Admin"
            >
              <Dropdown.Item>
                <Link to="/">Home</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin/allorders">All Orders</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin/addnewrest">Add New Restaurant</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin/deleterest">Delete Restaurant</Link>
              </Dropdown.Item>
              <hr />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
          )}
        </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    </div>
  );
}

export default NavBar;
