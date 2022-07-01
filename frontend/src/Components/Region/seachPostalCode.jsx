import React, { useState } from "react";
import "../../App.css";
import postalData from "../Data/postalCode.json";

const Search = (props) => {
  const setSearchItems = props.setSearchItems;
  const [searchTerm, setSearchTerm] = useState("");
  const search = () => {
    let selectedItems = postalData.findIndex((items) => {
      return (
        items.postalCode.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        items.neighborhood.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSearchItems(selectedItems);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search Items..."
        onKeyUp={(evt) => {
          if (evt.key === "Enter") {
            search();
          }
        }}
        onChange={(evt) => {
          setSearchTerm(evt.target.value);
        }}
      />
    </div>
  );
};

export default Search;