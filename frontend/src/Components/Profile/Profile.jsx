import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { Container } from "@mui/system";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseContext } from "../../auth/FirebaseProvider";

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
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log(name, value);
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
      <Paper elevation={10} sx={{ backgroundColor: "#B8F1B0" }}>
        <br />
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          UPDATE ACCOUNT
        </Typography>
        <br />
          <form style={{ display: "flex", justifyContent: "space-between", height: "500px", width: "100%",margin: "5px",
              paddingLeft: "70px",
            }}
            onSubmit={handleSubmit}
          >
              <section style={{ borderSpacing: "5px" }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  name="firstName"
                  required={true}
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  name="lastName"
                  required={true}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </section>
              <section>
                <TextField
                  id="outlined-basic"
                  label="Gender"
                  variant="outlined"
                  type="text"
                  name="gender"
                  required={true}
                  value={formData.gender}
                  onChange={handleChange}
                />

                <TextField
                  id="outlined-basic"
                  label="Occupation"
                  variant="outlined"
                  type="text"
                  name="occupation"
                  required={true}
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </section>
              <section>
                <TextField
                  iid="outlined-basic"
                  label="City"
                  variant="outlined"
                  type="text"
                  name="city"
                  required={true}
                  value={formData.city}
                  onChange={handleChange}
                />

                <TextField
                  id="outlined-basic"
                  label="Province"
                  variant="outlined"
                  type="text"
                  name="province"
                  required={true}
                  value={formData.province}
                  onChange={handleChange}
                />

                <TextField
                  id="outlined-basic"
                  label="Postal Code"
                  variant="outlined"
                  type="text"
                  name="postalCode"
                  required={true}
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </section>

              <section
                style={{
                  transform: "translate(-30%, -60%)",
                  position: "absolute",
                  top: "80%",
                  left: "45%",
                }}
              >
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
                    marginTop: "30px",
                  }}
                  variant="rounded"
                />
                <input
                  id="standard-basic"
                  label="Profile Photo"
                  variant="standard"
                  type="file"
                  name="url"
                  required={true}
                  value={formData.url}
                  onChange={handleFileChange}
                />
                <br />
                <br />
                <Button
                  style={{ display: "flex", color: "green" }}
                  disabled={progress !== null && progress < 100}
                  type="submit"
                >
                  Submit
                </Button>
                {progress ? <div>progress: {progress}%</div> : <div />}
              </section>
          </form>
      </Paper>
    </>
  );
};

export default Profile;
