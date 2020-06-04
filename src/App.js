import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import store from "./redux/store";
import { Provider } from "react-redux";
import Home from "./components/Home";
import RestaurantDetails from "./components/RestaurantDetails";
import AddItemForm from "./components/AddItemForm";
import MyOrders from "./components/MyOrders";
import NavBar from "./components/NavBar";
import AdminLogin from "./components/admin/AdminLogin";
import AdminNavBar from "./components/admin/AdminNavBar";
import AllOrders from "./components/admin/AllOrders";
import InProcessOrders from "./components/InProcessOrders";
import AddNewRest from "./components/admin/AddNewRest";
import DeleteRest from "./components/admin/DeleteRest";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <NavBar />
              <Login />
            </Route>
            <Route path="/signup">
              <NavBar />
              <SignUp />
            </Route>
            <Route path="/restaurantDetails/:id">
              <NavBar />
              <RestaurantDetails />
            </Route>
            <Route exact path="/myorders">
              <NavBar />
              <MyOrders />
            </Route>
            <Route path="/inprocessorders">
              <NavBar />
              <InProcessOrders />
            </Route>
            <Route path="/myorders/additem/:id">
              <NavBar />
              <AddItemForm />
            </Route>
            <Route exact path="/admin">
              <AdminNavBar />
              <AdminLogin />
            </Route>
            <Route path="/admin/allorders">
              <AdminNavBar />
              <AllOrders />
            </Route>
            <Route path="/admin/addnewrest">
              <AdminNavBar />
              <AddNewRest />
            </Route>
            <Route path="/admin/deleterest">
              <AdminNavBar />
              <DeleteRest />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
