import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { AuthContext } from "../auth/AuthProvider";
import ConditionSelect from "./ConditionSelect";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CategoryOptions from "./CategoryOptions";
import { doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import images from "../../src/images/iPhone.png"

const DropSelections = ({ visible, onCancel }) => {
  const ModalStyle = {
    backgroundImage: `url(${images})`,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 700,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 30,
    borderRadius: "5px",
  };
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [want, setWant] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(null);
  const [url, setUrl] = useState("");

  const [userPicture, setUserPicture] = useState("");
  const [displayName, setDisplayName] = useState("");
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    const handleImageUpload = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const imageRef = ref(store, file.name);
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
            setUrl(downloadURL);
          });
        }
      );
    };

    file && handleImageUpload();
  }, [file]);
  //Handle User profile on product posted.
  useEffect(() => {
    if (db && user) {
      let docRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.data();
          setUserPicture(usersData.Avatar);
          setDisplayName(usersData.firstName);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  const postAds = async (e) => {
    e.preventDefault();
    try {
      let userdoc = doc(db,"users", user.uid)
      let docSnap = await getDoc(userdoc)
      let userPostalCode = docSnap.data().postalCode
      console.log(userPostalCode)
      let collectionRef = collection(db, "postedAds");
      await addDoc(collectionRef, {
        postalCode: userPostalCode,
        title,
        condition,
        description,
        category,
        quantity,
        want,
        url,
        rating:(null),
        like: [],
        owner: user.uid,
        userPicture,
        displayName,
        timeStamp: serverTimestamp(),
      });
      setTitle("");
      setCondition("");
      setDescription("");
      setCategory("");
      setFile("");
      setQuantity("");
      setWant("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        open={visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={ModalStyle}>
          <form onSubmit={postAds}>
            <FormControl sx={{ m: 10, width: 300 }}>
              <Typography
                variant="h5"
                sx={{ color: "green", marginLeft: "100px" }}
              >
                Post Your Ads
              </Typography>
              <CategoryOptions category={category} setCategory={setCategory} />
              <ConditionSelect
                condition={condition}
                setCondition={setCondition}
              />
              <TextField
                sx={{ width: "30rem", marginTop: "15px" }}
                placeholder="Enter the product title"
                label="Title"
                variant="outlined"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                sx={{ width: "30rem", marginTop: "15px" }}
                placeholder="Enter the description of the item"
                type="text"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                sx={{ width: "30rem", marginTop: "15px" }}
                placeholder="Enter the item quantity"
                type="number"
                label="Quantity"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                sx={{ width: "30rem", marginTop: "15px" }}
                placeholder="What you Want?"
                type="text"
                label="Want"
                variant="outlined"
                value={want}
                onChange={(e) => setWant(e.target.value)}
              />
              <input
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="file"
                onChange={(e) => {
                  let selectedFile = e.target.files[0];
                  setFile(selectedFile);
                }}
              />
              {progress ? <div>progress: {progress}%</div> : <div />}
              <Button
                disable={progress !== null && progress < 100}
                sx={{
                  width: "30rem",
                  margin: "2px",
                  backgroundColor: "#3EC70B",
                  color: "white",
                }}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default DropSelections;
