import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Profile = () => {
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(null);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [userDocument, setUserDocument] = useState(null);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;

  const [formData, setFormData] = useState({
    uid: user.uid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    province: "",
    city: "",
    postalCode: "",
    gender: "",
    occupation: "",
    matches: [],
    url: "",
    timeStamp: serverTimestamp(),
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
//    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFileChange = (e) => {
    console.log("File handle Change");
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDoc(doc(db, "users", user.uid), {
        ...formData,
        timeStamp: serverTimestamp(),
      });
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const handleImageUpload = () => {
      const name = new Date().getTime() + file.name;
      const imageRef = ref(store, name);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshort) => {
          const percentage =
            (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          console.log("Upload Error", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({
              ...prev,
              Avatar: downloadURL,
            }));
          });
        }
      );
    };
    file && handleImageUpload();
  }, [file]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 1200,
            height: 500,
          },
        }}
      >
        <Paper elevation={3} sx={{ backgroundColor: "#B8F1B0" }}>
          <br />
          <Typography  variant="h4" sx={{ fontFamily: "Montserrat", color: "green", justifyContent: "center", display: "flex" }}>
            UPDATE ACCOUNT
          </Typography>
          <br />
          <form
            style={{
              margin: "5px",
              paddingLeft: "70px",
              display: "flex",
              flexDirection: "row",
            }}
            onSubmit={handleSubmit}
          >
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
                padding: "10px",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="First Name"
                variant="outlined"
                type="text"
                name="firstName"
                sx={{ marginBottom: "10px" }}
                required={false}
                value={formData.firstName}
                onChange={handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                type="text"
                name="lastName"
                sx={{ marginBottom: "10px" }}
                required={false}
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Gender"
                variant="outlined"
                type="text"
                name="gender"
                sx={{ marginBottom: "10px" }}
                required={false}
                value={formData.gender}
                onChange={handleChange}
              />
            </section>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
                padding: "10px",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Occupation"
                variant="outlined"
                type="text"
                name="occupation"
                sx={{ marginBottom: "10px" }}
                required={false}
                value={formData.occupation}
                onChange={handleChange}
              />
              <TextField
                iid="outlined-basic"
                label="City"
                variant="outlined"
                type="text"
                name="city"
                sx={{ marginBottom: "10px" }}
                required={false}
                value={formData.city}
                onChange={handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Province"
                variant="outlined"
                type="text"
                name="province"
                sx={{ marginBottom: "10px" }}
                required={false}
                value={formData.province}
                onChange={handleChange}
              />
            </section>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
                padding: "10px",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Postal"
                variant="outlined"
                type="text"
                name="postalCode"
                // sx={{
                //   marginBottom: "10px",
                //   marginTop: "20px",
                //   marginLeft: "10px",
                //   width: { sm: 100 },
                // }}
                required={false}
                value={formData.postalCode}
                onChange={handleChange}
                inputProps={{ maxLength: 3 }}
                // class="resizedTextbox"
                // size="small"
              />
            </section>
            <section>
              <TextField
                id="outlined-basic"
                label="Code"
                variant="outlined"
                type="text"
                name="postalCode"
                sx={{
                  marginBottom: "10px",
                  marginTop: "20px",
                  marginLeft: "10px",
                  width: { sm: 100 },
                }}
                required={false}
                // value={formData.postalCode}
                // onChange={handleChange}
                inputProps={{ maxLength: 3 }}
                // class="resizedTextbox"

                // size="small"
              />
            </section>
            <section sx={{ marginLeft: "10px" }}>
              <br />
              <Avatar
                src={
                  file ? (
                    URL.createObjectURL(file)
                  ) : (
                    <Typography>Image failed to load</Typography>
                  )
                }
                sx={{
                  bgcolor: "green"[500],
                  width: 90,
                  height: 100,
                  marginTop: "80px",
                }}
                variant="rounded"
              />

              <input
                id="standard-basic"
                label="Profile Photo"
                variant="standard"
                type="file"
                name="url"
                sx={{ marginBottom: "10px", marginRight: "10px" }}
                required={true}
                value={formData.url}
                onChange={handleFileChange}
              />
              {progress ? <div>progress: {progress}%</div> : <div />}
            </section>
            {/* <section
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            ></section> */}
            <Button
              sx={{
                position: "absolute",
                top: "520px",
                marginLeft: "300px",
                backgroundColor: "#FAD9A1",
                width: "50px",
              }}
              disabled={progress !== null && progress < 100}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
