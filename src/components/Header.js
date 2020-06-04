import React from "react";
import { Image } from "react-bootstrap";
import HeaderImg from "../images/header/headerImg.jpg";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

function Header() {
  const { searchData } = useSelector((state) => state);
  return (
    <>
      {searchData === null && (
        <Image
          src={HeaderImg}
          alt="Header image"
          style={{ height: "500px", width: "100%" }}
        />
      )}
      <br />
      <SearchBar />
    </>
  );
}

export default Header;
