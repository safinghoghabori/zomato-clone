import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SignUp() {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = {
      uname: e.target[0].value,
      pass: e.target[3].value,
    };
    // Check if signup data in not available in localStorage
    const signup = JSON.parse(localStorage.getItem("signup"));
    if (signup === null) {
      let arr = [];
      arr.push(signupData);
      localStorage.setItem("signup", JSON.stringify(arr));
    } else {
      signup.push(signupData);
      localStorage.setItem("signup", JSON.stringify(signup));
    }
    // Redirect the user to login page
    history.push("/login");
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="John" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Doe" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          SignUp
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
