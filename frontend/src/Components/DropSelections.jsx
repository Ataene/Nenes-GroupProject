import React, { useState, useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Modal,
  TextField,
  Chip,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  Typography,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import ConditionSelect from "./ConditionSelect";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CategoryOptions from "./CategoryOptions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(Category, CategoryName, theme) {
  return {
    fontWeight:
      CategoryName.indexOf(Category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const dropSelections = ({ visible, onCancel }) => {
  // const theme = useTheme();
  const handleChange = (event) => {const handleChange = (event) => {
    setCategory(event.target.value)};
  };

  const ModalStyle = {
    backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 30,
    borderRadius: "5px",
  };

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [CategoryName, setCategoryName] = useState([]);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(null);
  const [url, setUrl] = useState("");

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

  const postAds = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "postedAds");
      await addDoc(collectionRef, {
        CategoryName,
        title,
        condition,
        description,
        url,
        uid: user.uid,
        timeStamp: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setCondition("");
      setCategoryName("");
      setFile("");
    } catch (error) {
      console.log(error.message);
    }
  };
  const startChange = (event) => {
    setCategory(event.target.value);
    const [category, setCategory] = React.useState('')
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
           <FormControl>
              <Typography>
              variant="h3"
              sx={{ color: "green", marginLeft: "100px", marginTop: "30px" }}
              Post Your Ads
            </Typography>
            <CategoryOptions
             category={category}
             setCategory={setCategory}
            />
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
              />
              <input
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
                  backgroundColor: "#005555",
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
              }

export default dropSelections;
