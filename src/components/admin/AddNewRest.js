import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import uuid from "uuid/dist/v3";

function AddNewRest() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [img, setImg] = useState(null);
  const [detailImg, setDetailImg] = useState(null);
  const history = useHistory();
  const param = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    addToIndexDB();
    getDataFromDB();

    // const newRestData = {
    //   id: uuid(),
    //   res_name: e.target[0].value,
    //   address: e.target[1].value,
    //   city: e.target[2].value,
    //   phone: e.target[3].value,
    //   description: e.target[4].value,
    //   cuisine: e.target[5].value,
    //   price: e.target[6].value,
    //   hours: e.target[7].value,
    //   img: img1,
    //   detailImg: detailImg1,
    // };

    // Map the items array to fetch details of confirmed order
    // const items = JSON.parse(localStorage.getItem("items"));

    // Check if already some items are ordered by user
    // if (confirmationData === null) {
    //   let arr = [];
    //   arr.push(confirmOrderData);
    //   localStorage.setItem("confirmOrders", JSON.stringify(arr));
    // } else {
    //   confirmationData.push(confirmOrderData);
    //   localStorage.setItem("confirmOrders", JSON.stringify(confirmationData));
    // }
    // setSuccessMsg(true);

    // Redirect user to the home page after 1 second
    // setTimeout(() => {
    //   history.push("/");
    // }, 1000);
  };
  const handleImg = (e) => {
    // File handleing
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // The file's text will be printed here
      const fileLink = e.target.result;
      setImg(fileLink);
    };
    reader.readAsDataURL(file);
  };

  const handleDetailImg = (e) => {
    // File handleing
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // The file's text will be printed here
      var fileLink = e.target.result;
      setDetailImg(fileLink);
    };
    reader.readAsDataURL(file);
  };

  var db;
  const addToIndexDB = () => {
    console.log("Add to indexdb is called...");
    const imagePath = [
      { id: "1", img1: img },
      { id: "2", detailImg1: detailImg },
    ];
    var request = window.indexedDB.open("img", 1);

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      var objectStore = db.createObjectStore("images_data", {
        keyPath: "id",
      });
      objectStore.add(imagePath[0]);
      objectStore.add(imagePath[1]);
    };
  };

  const getDataFromDB = () => {
    const transaction = db.transaction("images_data");
    const objectStore = transaction.objectStore("images_data");
    const request1 = objectStore.get(1);
    const request2 = objectStore.get(2);

    request1.onsuccess = (event) => {
      console.log("ImgDB..." + request1.result.img1);
    };
    request2.onsuccess = (event) => {
      console.log("DetailImgDB..." + request2.result.detailImg1);
    };
  };
  return (
    <div>
      <h1 className="text-center">Add New Restaurant</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control type="text" placeholder="i.e. Xyz Shop" required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="i.e. Rupani circle" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="i.e. bhavnagar" required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Phone No</Form.Label>
          <Form.Control type="number" placeholder="i.e 1234567892" required />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Form.Group controlId="formGridState">
          <Form.Label>Category of Food</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option value="pizza">Pizza</option>
            <option value="chinese">Chinese</option>
            <option value="fastfood">Fast Food</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="i.e. 150" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Open Hours</Form.Label>
          <Form.Control type="text" placeholder="i.e. Xyz Shop" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Select Image of Restaurant</Form.Label>
          <Form.Control type="file" onChange={handleImg} required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Select Image of Food</Form.Label>
          <Form.Control type="file" onChange={handleDetailImg} required />
        </Form.Group>
        {successMsg && (
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "green" }}>
              New Restaurant added successfully!!!
            </Form.Label>
          </Form.Group>
        )}
        <Button variant="primary" type="submit" style={{ width: "100px" }}>
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddNewRest;
