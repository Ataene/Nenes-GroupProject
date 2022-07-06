import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import { FirebaseContext } from "../../auth/FirebaseProvider";

import postalData from "../Data/postalCode.json";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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

//  const SearchAds = (props) => {
  
//     const setSearchAds = props.setSearchAds;
//     const [searchPost, setSearchPost] = useState("");
//     const searching= () => {
//     let selectedAd = postedAd.findIndex((items) => {
    
//       return (
//           items.postalCode.toLocaleLowerCase().includes(searchPost.toLowerCase()) ||
//           items.description.toLocaleLowerCase().includes(searchPost.toLowerCase()) ||
//           items.condition.toLocaleLowerCase().includes(searchPost.toLowerCase()) ||
//           items.neighborhood.toLocaleLowerCase().includes(searchPost.toLowerCase()) 
//         );
//    });
//       setSearchAds(selectedAd);
//     }};

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search Ads..."
        onKeyUp={(evt) => {
          if (evt.key === "Enter") {
            search();
            // SearchAds();
          }
        }}
        onChange={(evt) => {
          setSearchTerm(evt.target.value);
          // setSearchPost(evt.target.value);

        }}
      />
    </div>
  );
};
export default Search; 
// SearchAds;