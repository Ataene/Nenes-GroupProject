// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
const projectStorage = firebase.storage();
export const db = getFirestore(app);

const moviesRef = collection(db, "movies");

export const useMoviesLister = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    return onSnapshot(moviesRef, (snapshot) => {
      setMovies(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        })
      );
    });
  }, []);

  return movies;
};

import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, TextField, FormControl, Box,Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { AuthContext } from "../auth/AuthProvider";
import ConditionSelect from "./ConditionSelect";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CategoryOptions from "./CategoryOptions";
import {  doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";


const DropSelections = ({ visible, onCancel }) => {
    const ModalStyle = {
        backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
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
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [want, setWant] = useState('');
    const [file, setFile] = useState("");
    const [progress, setProgress] = useState(null);
    const [url, setUrl] = useState("");
  
    const [rating, setRating] = useState(null);
  
  
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
                    let usersData = querySnap.data()
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
            let collectionRef = collection(db, "postedAds");
            await addDoc(collectionRef, {
                title,
                condition,
                description,
                category,
                quantity,
                want,
                url,
                uid: user.uid,
                userPicture,
                displayName,
                rating: (null),
                timeStamp: serverTimestamp(),
            });
            setTitle("");
            setCondition("");
            setDescription("");
            setCategory("");
            setFile("");
            setQuantity("")
            setWant("")
        } catch (error) {
            console.log(error.message);
        }
    };
}