import React, { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { Button, Modal, TextField, Chip,Select, FormControl, MenuItem, InputLabel, OutlinedInput, Box  } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Conditions = [
    "Excellent",
    "Good",
    "Fair",
  ];
  
  function getStyles(Conditions, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(Conditions) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const ConditionSelect = ({ visible, onCancel }) => {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
}
const [condition, setCondition] = useState("");
const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  //   const store = fb.fbContext.store;

  const postAds = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "postedAds");
      const response = await addDoc(collectionRef, {
        title,
        condition,
        description,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };