import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AdminLogin() {
  const [error, setError] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      uname: e.target[0].value,
      pass: e.target[1].value,
    };

    // Check if username and password are match or not
    if (loginData.uname === "admin" && loginData.pass === "admin") {
      // Set login to true
      localStorage.setItem("admin", true);
      history.push("/admin/allorders");
    } else {
      setError(true);
    }
  };
  //check if admin is already loggedin so redirect him onto allorders page
  if (localStorage.getItem("admin") === "true") {
    history.push("/admin/allorders");
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="john" required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        {error && (
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "red" }}>
              Error! Invalid username or password...
            </Form.Label>
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
