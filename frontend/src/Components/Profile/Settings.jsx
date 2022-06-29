import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { Container } from "@mui/system";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseContext } from "../../auth/FirebaseProvider";

const Settings = (props) => {

  const params = useParams();
  const show = props.SwipCards;
  const [data, setData ] = useState(show);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(null);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [ userDocument, setUserDocument ] = useState(null);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;

  const [formData, setFormData] = useState({
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
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
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log(name, value)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFileChange = (e) => {
    console.log("File handle Change")
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleChange(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await setDoc(doc(db, "users", user.uid), {
        ...formData,
        timeStamp: serverTimestamp(),
      })
      console.log(res);
    } catch(error){
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
              Avatar: downloadURL
            }));
          });
        }
      );
    };
    file && handleImageUpload();
  }, [file]);

  return (
    <>
      <Typography sx={{display: "flex", justifyContent: "center"}}>UPDATE ACCOUNT</Typography>
      <Container>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
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
              label="First Name"
              variant="standard"
              type="text"
              name="firstName"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
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
              name="postalCode"
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
            <Avatar 
             src={
              file ? URL.createObjectURL(file) : <Typography>Image failed to load</Typography>
             }
              sx={{ bgcolor: "green"[500], width: 100, height: 100, marginTop: "30px" }} 
              variant="rounded" />
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
          </section>
          <section style={{display: "flex"}}>
            <Button disabled={progress !== null && progress < 100} type="submit">Submit</Button>
            {progress ? <div>progress: {progress}%</div> : <div />}
          </section>
        </form>
      </Container>
    </>
  );
};

export default Settings;
