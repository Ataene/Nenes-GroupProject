import React, { useContext, useState } from "react";
import { Avatar, Input, TextField, Typography } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { Box, Container } from "@mui/system";

const Settings = (props) => {
        
  const show = props.SwipCards;
  const [data, setData ] = useState(show)
  
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [formData, setFormData] = useState({
    uid: user.uid,
    firstName: "",
    lastName: "",
    email: user.email,
    name: user.displayName,
    matches: [],
    province: "",
    city: "",
    postalCode: "",
    want: "",
    have: "",
    url: "",
    timeStamp: serverTimestamp(),
  });

  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Typography sx={{display: "flex", justifyContent: "center"}}>CREATE ACCOUNT</Typography>
      <Container>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <section>
            <TextField
              id="First Name"
              label="First Name"
              variant="standard"
              type="text"
              name="firstName"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              id="Last Name"
              label="Last Name"
              variant="standard"
              type="text"
              name="lastName"
              required={true}
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="text"
              name="email"
              required={true}
              value={formData.email}
              onChange={handleChange}
            />
          </section>
          <section>
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              type="text"
              name="city"
              required={true}
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Province"
              variant="standard"
              type="text"
              name="province"
              required={true}
              value={formData.province}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Postal Code"
              variant="standard"
              type="text"
              name="postcalCode"
              required={true}
              value={formData.postalCode}
              onChange={handleChange}
            />
          </section>
          <section>
            <TextField
              id="standard-basic"
              label="Want"
              variant="standard"
              type="text"
              name="want"
              required={true}
              value={formData.want}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Have"
              variant="standard"
              type="text"
              name="have"
              required={true}
              value={formData.have}
              onChange={handleChange}
            />
          </section>
          <section>
            <Avatar sx={{ bgcolor: "green"[500], width: 100, height: 100, marginTop: "30px" }} variant="rounded"></Avatar>
            <input
              id="standard-basic"
              label="Profile Photo"
              variant="standard"
              type="file"
              name="url"
              required={true}
              value={formData.url}
              onChange={handleChange}
            />
          </section>
        </form>
      </Container>
    </>
  );
};

export default Settings;
