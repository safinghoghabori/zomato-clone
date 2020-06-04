import React, { useEffect } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import SearchResults from "./SearchResults";
import { useSelector } from "react-redux";
import { restaurants } from "../restaurantsData";

function Home() {
  useEffect(() => {
    // const res = localStorage.getItem("restaurants");
    // if (res === null) {
    //   localStorage.setItem("restaurants", JSON.stringify(restaurants));
    // }
    var request = window.indexedDB.open("restaurants", 1);
    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("restaurantsData", {
        keyPath: "id",
      });
      for (let i = 0; i < restaurants.length; i++) {
        objectStore.add(restaurants[i]);
      }
    };
  }, []);
  const state = useSelector((state) => state);
  return (
    <>
      <NavBar />
      <Header />
      {state && state.searchData && <SearchResults />}
    </>
  );
}

export default Home;
