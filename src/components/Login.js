import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
  const [error, setError] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      uname: e.target[0].value,
      pass: e.target[1].value,
    };

    // Check if username and password are match or not
    const signup = JSON.parse(localStorage.getItem("signup"));
    if (signup !== null) {
      signup.map((user) => {
        if (user.uname === loginData.uname && user.pass === loginData.pass) {
          // Set login to true
          loginData.login = true;
          localStorage.setItem("login", JSON.stringify(loginData));
          history.push("/");
        } else {
          setError(true);
        }
      });
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Login</h1>
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

export default Login;
