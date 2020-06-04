import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

function AddItemForm() {
  const [successMsg, setSuccessMsg] = useState(false);
  const history = useHistory();
  const param = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmOrderData = {
      id: parseInt(param.id),
      customer_name: e.target[0].value,
      address: e.target[1].value,
      city: e.target[2].value,
      phone: e.target[3].value,
    };

    // Map the items array to fetch details of confirmed order
    const items = JSON.parse(localStorage.getItem("items"));
    const itemDetails = items.filter((item) => item.id === parseInt(param.id));

    confirmOrderData.item_name = itemDetails[0].cuisine;
    confirmOrderData.rest_name = itemDetails[0].name;
    confirmOrderData.price = itemDetails[0].price;
    confirmOrderData.detailImg = itemDetails[0].detailImg;

    const confirmationData = JSON.parse(localStorage.getItem("confirmOrders"));
    // Check if already some items are ordered by user
    if (confirmationData === null) {
      let arr = [];
      arr.push(confirmOrderData);
      localStorage.setItem("confirmOrders", JSON.stringify(arr));
    } else {
      confirmationData.push(confirmOrderData);
      localStorage.setItem("confirmOrders", JSON.stringify(confirmationData));
    }
    setSuccessMsg(true);

    // Now remove item from the items localStorage bcuz now it is confirmed
    const itemsData = JSON.parse(localStorage.getItem("items"));
    const afterDelItems = itemsData.filter(
      (item) => item.id !== parseInt(param.id)
    );
    localStorage.setItem("items", JSON.stringify(afterDelItems));

    // Redirect user to the home page after 1 second
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };
  return (
    <div>
      <h1 className="text-center">Add Item</h1>
      <p className="text-center">Fill up the form to complete your order</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="i.e. John Doe" required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="i.e. sisuvihar circle, bhvanagar"
            required
          />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="i.e. bhavnagar" required />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Phone No</Form.Label>
          <Form.Control type="number" placeholder="i.e 1234567892" required />
        </Form.Group>
        {successMsg && (
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "green" }}>
              Your order submitted successfully!!!
            </Form.Label>
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddItemForm;
